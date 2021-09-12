import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs"; // cjs => esm
import pkg from "./package.json";
import css from "rollup-plugin-css-only";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import clear from "rollup-plugin-clear";
import path from "path";

const srcDir = path.resolve(__dirname, "./src");
const extensions = [".js", ".jsx"];

export default {
  input: ["./src/components/index.js"],
  output: [
    {
      file: pkg.module,
      format: "esm",
    },
    {
      file: pkg.main,
      format: "commonjs",
      name: "@zxhj/component-library",
    },
  ],
  plugins: [
    alias({
      entries: [{ find: "@", replacement: srcDir }],
      customResolver: {
        extensions,
      },
    }),
    nodeResolve({
      extensions,
      modulesOnly: true,
      preferBuiltins: false,
    }),
    commonjs({
      include: "node_modules/**",
    }),
    babel({
      exclude: "node_modules/**",
      // extensions,
      babelHelpers: "runtime",
    }),
    css({ output: "styles.css" }),
    clear({
      targets: ["./lib"],
      watch: true, // default: false
    }),
  ],
  externals: ["react", "react-dom", "antd", "@ant-design/icons"],
};
