import baseConfig, { restrictEnvAccess } from "@nxss/eslint-config/base";
import nextjsConfig from "@nxss/eslint-config/nextjs";
import reactConfig from "@nxss/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
