import type { BetterAuthOptions } from "better-auth";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oAuthProxy, organization } from "better-auth/plugins";
import { Resend } from "resend";

import { eq } from "@nxss/db";
import { db } from "@nxss/db/client";
import { user } from "@nxss/db/schema";
import { OrganizationInvite } from "@nxss/transactional/organization-invite";

import { ac, owner, staff } from "./permissions";

export function initAuth(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;

  googleClientId: string;
  googleClientSecret: string;
  resendApiKey: string;
}) {
  const resend = new Resend(options.resendApiKey);

  const config = {
    database: drizzleAdapter(db, { provider: "pg" }),
    baseURL: options.baseUrl,
    secret: options.secret,
    emailAndPassword: {
      enabled: true,
      async sendResetPassword(data, request) {
        // email logic
      },
    },
    user: {
      additionalFields: {
        /** User's onboarding completion */
        onboardingComplete: {
          type: "boolean",
          required: false,
          defaultValue: false,
        },
      },
    },

    plugins: [
      organization({
        organizationCreation: {
          async afterCreate(data) {
            await db
              .update(user)
              .set({ onboardingComplete: true })
              .where(eq(user.id, data.user.id));
          },
        },
        ac,
        roles: {
          owner,
          staff,
        },
        async sendInvitationEmail(data) {
          const singleUser = await db.query.user.findFirst({
            where: eq(user.id, data.id),
          });
          /** Send email to user using email provider */
          await resend.emails.send({
            from: "NexussERP <resend@nexusserp.com>",
            to: data.email,
            subject: `You've been invited to join ${data.organization.name} 🎉`,
            react: (
              <OrganizationInvite
                inviteLink={data.invitation.inviterId}
                inviteeName={singleUser?.name}
                organizationName={data.organization.name}
                inviterName={data.inviter.user.name}
              />
            ),
          });
        },
      }),
      oAuthProxy({
        currentURL: options.baseUrl,
        productionURL: options.productionUrl,
      }),
      expo(),
    ],
    socialProviders: {
      google: {
        clientId: options.googleClientId,
        clientSecret: options.googleClientSecret,
        redirectURI: `${options.baseUrl}/api/auth/callback/google`,
      },
    },
    trustedOrigins: ["expo://"],
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
