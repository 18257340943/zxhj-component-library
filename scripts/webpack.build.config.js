const { resolve } = require('path');
const webpackConfigBase = require('./webpack.base.config');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const isEnvProduction = process.env.NODE_ENV === 'production';

const webpackConfigProd = {
  mode: isEnvProduction?'production':'development',
  entry: {
    index: resolve(__dirname, "../src/components/index.js"),
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "../dist"),
    library: "@zxhj/component-library",
    libraryTarget: "umd",
  },
  externals: [
    "react", 
    "react-dom", 
    "antd", 
    "@ant-design/icons",
    "prop-types",
    "moment",
    "@material-ui/styles"
  ],
  devtool: isEnvProduction? 'source-map':'cheap-module-eval-source-map' ,  
  optimization: {
    minimizer: [
      new TerserJSPlugin(),
      new OptimizeCSSAssetsPlugin()
    ],
  },
  plugins: [
    new CleanWebpackPlugin()    
  ]
}
module.exports = merge(webpackConfigBase, webpackConfigProd)
