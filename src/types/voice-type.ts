import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type VoiceType =
  inferRouterOutputs<AppRouter>["voices"]["getAll"]["systemVoices"][number];
