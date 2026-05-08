import z from "zod";
import { createTRPCRouter, orgProcedure } from "../init";
import { prisma } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import { MAX_TEXT_INPUT_LENGTH } from "@/constants";
import { chatterBox } from "@/lib/chatterbox-client";
import { deleteAudio, uploadAudio } from "@/lib/r2";
import { polar } from "@/lib/polar";

export const generationRouter = createTRPCRouter({
  getById: orgProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const generation = await prisma.generation.findUnique({
        where: {
          id: input.id,
          orgId: ctx.orgId,
        },
        omit: {
          orgId: true,
          r2ObjectKey: true,
        },
      });

      if (!generation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Generation not found",
        });
      }

      return {
        ...generation,
        audioUrl: `/api/audio/${generation.id}`,
      };
    }),

  getAll: orgProcedure.query(async ({ ctx }) => {
    const generations = await prisma.generation.findMany({
      where: {
        orgId: ctx.orgId,
      },
      omit: {
        orgId: true,
        r2ObjectKey: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return generations;
  }),

  create: orgProcedure
    .input(
      z.object({
        text: z.string().min(1).max(MAX_TEXT_INPUT_LENGTH),
        voiceId: z.string().min(1),
        topP: z.number().min(0).max(1).default(0.95),
        topK: z.number().min(1).max(10000).default(40),
        temperature: z.number().min(0).max(2).default(0.8),
        repetitionPenalty: z.number().min(0).max(2).default(1.2),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const customerState = await polar.customers.getStateExternal({
          externalId: ctx.orgId,
        });

        const hasActiveSubscription =
          (customerState?.activeSubscriptions ?? []).length > 0;

        if (!hasActiveSubscription) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "SUBSCRIPTION_REQUIRED",
          });
        }
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: "FORBIDDEN",
          message: "subscription check unavailable, please try again",
        });
      }
      const { voiceId, text, topK, topP, temperature, repetitionPenalty } =
        input;

      const voice = await prisma.voice.findUnique({
        where: {
          id: voiceId,
          OR: [
            {
              variant: "SYSTEM",
            },
            {
              variant: "CUSTOM",
              orgId: ctx.orgId,
            },
          ],
        },
        select: {
          id: true,
          name: true,
          r2ObjectKey: true,
        },
      });

      if (!voice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Voice not found",
        });
      }

      if (!voice.r2ObjectKey) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Voice audio not available",
        });
      }

      const { data, error } = await chatterBox.POST("/generate", {
        body: {
          prompt: text,
          voice_key: voice.r2ObjectKey,
          top_k: topK,
          top_p: topP,
          temperature,
          repetition_penalty: repetitionPenalty,
          norm_loudness: true,
        },
        parseAs: "arrayBuffer",
      });

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate audio",
        });
      }

      if (!(data instanceof ArrayBuffer)) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Invalid audio response",
        });
      }

      const buffer = Buffer.from(data);
      let generationId: string | null = null;
      let r2ObjectKey: string | null = null;

      try {
        const generation = await prisma.generation.create({
          data: {
            orgId: ctx.orgId,
            voiceName: voice.name,
            voiceId: voiceId,
            text: text,
            topK: topK,
            topP: topP,
            temperature: temperature,
            repetitionPenalty: repetitionPenalty,
          },
          select: {
            id: true,
          },
        });

        generationId = generation.id;
        r2ObjectKey = `generations/orgs/${ctx.orgId}/${generationId}`;

        await uploadAudio({ buffer, key: r2ObjectKey });

        await prisma.generation.update({
          where: {
            id: generationId,
          },
          data: {
            r2ObjectKey,
          },
        });
      } catch {
        if (r2ObjectKey) {
          await deleteAudio(r2ObjectKey).catch(() => {});
        }
        if (generationId) {
          await prisma.generation
            .delete({
              where: {
                id: generationId,
              },
            })
            .catch(() => {});
        }

        if (!generationId || !r2ObjectKey) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "failed to store generate audio",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong, failed to store generate audio",
        });
      }

      polar.events
        .ingest({
          events: [
            {
              name: "tts-generation",
              externalCustomerId: ctx.orgId,
              metadata: { characters: input.text.length },
            },
          ],
        })
        .catch(() => {});
      return { id: generationId };
    }),

  delete: orgProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const generation = await prisma.generation.findUnique({
        where: {
          id: input.id,
          orgId: ctx.orgId,
        },
        select: {
          id: true,
          r2ObjectKey: true,
        },
      });

      if (!generation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Voice-generation not found",
        });
      }
      const { id, r2ObjectKey } = generation;
      const { count } = await prisma.generation.deleteMany({
        where: { id, orgId: ctx.orgId },
      });
      if (count === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Voice-generation not found",
        });
      }

      if (r2ObjectKey) {
        await deleteAudio(r2ObjectKey).catch((error) => {
          console.error("voice-generation deleted failed", {
            id,
            r2ObjectKey,
            error,
          });
        });
      }

      return { success: true };
    }),
});
