import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Phase 1: avoid blocking errors from legacy code while keeping the app stable
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
      // Keep hooks rule as warn to avoid behavior changes during cleanup
      "react-hooks/exhaustive-deps": "warn",
    },
  }
  ,
  // File-specific: allow CommonJS require in tool/config files
  {
    files: [
      "**/*.config.{ts,js}",
      "tailwind.config.ts",
      "vite.config.ts",
      "postcss.config.js",
      "eslint.config.js",
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  }
);
