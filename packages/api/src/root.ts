import { authRouter } from "./router/auth";
import { branchRouter } from "./router/branch";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  branch: branchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
