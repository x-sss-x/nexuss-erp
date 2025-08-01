import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/organization/access";

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  ...defaultStatements,
  branch: ["create", "update", "delete"],
} as const;

const ac = createAccessControl(statement);

const owner = ac.newRole({
  branch: ["create", "update", "delete"],
  organization: ["update", "delete"],
  invitation: ["create", "cancel"],
  team: ["create", "delete", "update"],
});

const staff = ac.newRole({ branch: [] });

export { ac, owner, staff };
