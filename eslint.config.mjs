import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/dist",
    "**/node_modules",
    "**/coverage",
    "**/storybook",
    "**/build",
    "**/.next",
    "**/scripts",
  ]),
  {
    settings: {
      rules: {
        "@next/next/no-page-custom-font": "off",
        "import/no-anonymous-default-export": "off",
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: [
              "**/types/*.d.ts",
              "**/__fixtures__/**",
              "**/__mocks__/**",
              "**/__tests__/**",
              "**/*.spec.{js,ts,tsx}",
            ],

            optionalDependencies: false,
          },
        ],
        "no-unused-expressions": "off",
        "react/no-unescaped-entities": "",
        "react/require-default-props": "off",
        "react-refresh/only-export-components": [
          "warn",
          {
            allowConstantExport: true,
          },
        ],

        "react/prop-types": "off",
        "@typescript-eslint/no-unsafe-assign": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-unused-expressions": "off",
      },
    },
  },
]);
export default eslintConfig;
