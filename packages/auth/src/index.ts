import type { BetterAuthOptions } from "better-auth";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oAuthProxy, organization } from "better-auth/plugins";

import { eq } from "@nxss/db";
import { db } from "@nxss/db/client";
import { user } from "@nxss/db/schema";

export function initAuth(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;

  googleClientId: string;
  googleClientSecret: string;
}) {
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
