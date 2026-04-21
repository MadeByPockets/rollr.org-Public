import nextConfig from "eslint-config-next";

export default [
    {
      ignores: ["dist/"],
    },
  ...nextConfig,
  {
    rules: {
      "import/no-anonymous-default-export": "off",
      "eqeqeq": "error",
    },
  },
];
