module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  }, // frontend & backend 모두에서 eslint 동작하도록
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
  },
};
