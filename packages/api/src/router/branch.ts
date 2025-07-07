import { z } from "zod/v4";

import { and, eq } from "@nxss/db";
import { branch, CreateBranchSchema } from "@nxss/db/schema";

import { organizationProcedure } from "../trpc";

export const branchRouter = {
  create: organizationProcedure
    .input(CreateBranchSchema)
    .mutation(({ ctx, input }) =>
      ctx.db.insert(branch).values({
        userId: ctx.user.id,
        organizationId: ctx.activeOrganizationId,
        ...input,
      }),
    ),

  getAll: organizationProcedure.query(({ ctx }) =>
    ctx.db.query.branch.findMany({
      where: and(eq(branch.organizationId, ctx.activeOrganizationId)),
    }),
  ),
};
