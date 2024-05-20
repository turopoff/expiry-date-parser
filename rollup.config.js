import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";

export default {
  input: "lib/index.js",
  output: [
    {
      file: "dist/expiry-date-parser.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/expiry-date-parser.esm.js",
      format: "esm",
    },
    {
      file: "dist/expiry-date-parser.umd.js",
      format: "umd",
      name: "expiryDateParser",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
    }),
    terser(),
  ],
};
