import baseConfig from "@nxss/eslint-config/base";
import reactConfig from "@nxss/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
