import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs"; // cjs => esm
import pkg from "./package.json";
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import nodePolyfills from 'rollup-plugin-polyfill-node'; // 使用内置node模块querystring等~
// // import htmlTemplate from 'rollup-plugin-generate-html-template';
// import serve  from  'rollup-plugin-serve' ;
// import livereload  from  'rollup-plugin-livereload';
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
      sourcemap: true
    },
    {
      file: pkg.main,
      format: "commonjs",
      name: "@zxhj/component-library",
      sourcemap: true
    },
  ],
  plugins: [
    // htmlTemplate({
    //   template: resolve(__dirname,'./src/index.html'),
    //   target: 'index.html',
    // }),
    // serve( {
    //   contentBase: resolve(__dirname,  '../build'),
    //   port: 'auto',
    //   open: true
    // }),
    // livereload(),
    alias({
      entries: [{ find: "@", replacement: srcDir }],
      customResolver: {
        extensions,
      },
    }),
    nodePolyfills(),
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
      babelHelpers: "runtime",
    }),
    postcss(),
    clear({
      targets: ["./lib",'./es'],
      watch: true, 
    }), 
  ],
  external: [
    "react", 
    "react-dom", 
    "antd", 
    "@ant-design/icons",
    "prop-types",
    "moment",
    "@material-ui/styles",
    /@babel\/runtime/
  ],
};
