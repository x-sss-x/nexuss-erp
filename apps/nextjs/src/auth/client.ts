import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { ac, owner, staff } from "@nxss/auth/permissions";

export const authClient = createAuthClient({
  plugins: [
    organizationClient({
      ac,
      teams: {
        enabled: true,
      },
      roles: {
        owner,
        staff,
      },
    }),
  ],
});
