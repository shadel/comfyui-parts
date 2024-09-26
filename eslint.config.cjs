const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

const compat = new FlatCompat({
    baseDirectory: __dirname,                  // optional; default: process.cwd()
    resolvePluginsRelativeTo: __dirname,       // optional
    recommendedConfig: js.configs.recommended, // optional unless using "eslint:recommended"
    allConfig: js.configs.all,                 // optional unless using "eslint:all"
});

module.exports = [

    // mimic ESLintRC-style extends
    ...compat.extends(".eslintrc.cjs"),

];