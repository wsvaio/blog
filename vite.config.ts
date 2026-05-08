import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    arrowParens: "avoid",
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "ignore",
    insertPragma: false,
    jsxSingleQuote: false,
    printWidth: 120,
    proseWrap: "never",
    quoteProps: "consistent",
    semi: true,
    singleAttributePerLine: false,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "es5",
    useTabs: false,
    sortPackageJson: false,
    ignorePatterns: ["public"],
  },
  lint: {
    plugins: ["import", "unicorn", "typescript", "vue"],
    settings: {},
    rules: {},
    globals: {
      db: "readonly",
    },
    ignorePatterns: ["public"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
