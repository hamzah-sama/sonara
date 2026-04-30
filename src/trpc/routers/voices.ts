import z from "zod";
import { createTRPCRouter, orgProcedure } from "../init";
import { prisma } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";
import { TRPCError } from "@trpc/server";
import { deleteAudio, r2 } from "@/lib/r2";

const voiceSelect = {
  id: true,
  name: true,
  description: true,
  category: true,
  language: true,
  variant: true,
} satisfies Prisma.VoiceSelect;

export const voicesRouter = createTRPCRouter({
  getAll: orgProcedure
    .input(z.object({ query: z.string().trim().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const searchFilter: Prisma.VoiceWhereInput = input?.query
        ? {
            OR: [
              { name: { contains: input.query, mode: "insensitive" } },
              {
                description: {
                  contains: input.query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {};
      const [customVoices, systemVoices] = await Promise.all([
        prisma.voice.findMany({
          where: {
            orgId: ctx.orgId,
            variant: "CUSTOM",
            ...searchFilter,
          },
          orderBy: { createdAt: "asc" },
          select: voiceSelect,
        }),

        prisma.voice.findMany({
          where: {
            variant: "SYSTEM",
            ...searchFilter,
          },
          orderBy: { createdAt: "asc" },
          select: voiceSelect,
        }),
      ]);

      return { customVoices, systemVoices };
    }),

  delete: orgProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { orgId } = ctx;
      const voice = await prisma.voice.findUnique({
        where: {
          id: input.id,
          variant: "CUSTOM",
          orgId: ctx.orgId,
        },
        select: {
          id: true,
          r2ObjectKey: true,
        },
      });

      if (!voice) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Voice not found" });
      }
      const { id, r2ObjectKey } = voice;

      const { count } = await prisma.voice.deleteMany({
        where: {
          id,
          orgId,
          variant: "CUSTOM",
        },
      });

      if (count === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Voice not found" });
      }

      if (r2ObjectKey) {
        await deleteAudio(r2ObjectKey).catch((error) => {
          console.error("R2 deleted failed", {
            id,
            r2ObjectKey,
            error,
          });
        });
      }

      return { success: true };
    }),
});
