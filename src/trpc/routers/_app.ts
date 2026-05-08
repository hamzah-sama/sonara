import { createTRPCRouter } from "../init";
import { biilingRouter } from "./billing";
import { generationRouter } from "./generations";
import { voicesRouter } from "./voices";

export const appRouter = createTRPCRouter({
  voices: voicesRouter,
  generations: generationRouter,
  billing: biilingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
