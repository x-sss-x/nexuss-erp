import type { Team } from "better-auth/plugins";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { eq } from "@nxss/db";
import { CreateTeamInfoSchema, teamInfo } from "@nxss/db/schema";

import { organizationProcedure } from "../trpc";

export const organizationRouter = {
  /** Use this to create team instead from better-auth
   * This will provide input to insert extra info
   */
  createTeam: organizationProcedure
    .input(
      CreateTeamInfoSchema.and(
        z.object({ name: z.string(), organizationId: z.string().optional() }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        name,
        organizationId,
        currentSemesterType,
        numberOfsemesters,
        icon,
      } = input;

      const newTeam = await ctx.authApi.createTeam({
        headers: ctx.headers,
        body: { name, organizationId },
        asResponse: true,
      });

      if (!newTeam.ok) {
        const errorBody = (await newTeam.json()) as { message?: string };
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorBody.message ?? "Failed to create team",
        });
      }

      const team = (await newTeam.json()) as Team;

      await ctx.db.insert(teamInfo).values({
        teamId: team.id,
        currentSemesterType,
        numberOfsemesters,
        icon,
      });

      return {
        id: team.id,
        name: team.name,
        currentSemesterType,
        numberOfsemesters,
      };
    }),

  /** List the organizationTeams */
  listOrganizationTeams: organizationProcedure.query(async ({ ctx }) => {
    const teams = (await ctx.authApi.listOrganizationTeams({
      headers: ctx.headers,
    })) as Team[];

    const teamsWithInfo = await Promise.all(
      teams.map(async (t) => {
        const ti = await ctx.db.query.teamInfo.findFirst({
          where: eq(teamInfo.teamId, t.id),
        });
        return {
          ...t,
          icon: ti?.icon,
          currentSemesterType: ti?.currentSemesterType,
          numberOfsemesters: ti?.numberOfsemesters,
        };
      }),
    );

    return teamsWithInfo;
  }),
};
