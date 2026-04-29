import z from "zod";
import { createTRPCRouter, orgProcedure } from "../init";
import { prisma } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";
import { TRPCError } from "@trpc/server";
import { deleteAudio } from "@/lib/r2";

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
      const voice = await prisma.voice.findUnique({
        where: {
          id: input.id,
          variant: "CUSTOM",
          orgId: ctx.orgId,
        },
      });

      if (!voice) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Voice not found" });
      }

      await prisma.voice.delete({
        where: {
          id: voice.id,
        },
      });

      if (voice.r2ObjectKey) {
        await deleteAudio(voice.r2ObjectKey).catch(() => {});
      }

      return { success: true };
    }),
});
