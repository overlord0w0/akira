import globals from "globals";
import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: parser, // TypeScript parser
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      ...tseslint.configs["recommended"].rules, // ✅ Вставляємо всі правила вручну
    },
  },
];
