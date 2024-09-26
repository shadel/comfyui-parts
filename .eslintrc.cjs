/** @type {import("eslint").Linter.Config} */

const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "off",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": [
      "off",
      {
        checksVoidReturn: { attributes: false },
      },
    ],
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/prefer-promise-reject-errors": "off",
    "@typescript-eslint/no-redundant-type-constituents": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
  },
};

module.exports = config;
