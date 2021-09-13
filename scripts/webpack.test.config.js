const { resolve } = require('path');
const webpack = require('webpack');
const webpackConfigBase = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const distPath = resolve(__dirname, '../dist');

const webpackConfigDev = {
  mode: 'development',
  entry: resolve(__dirname, '../test/index.js'),
  output: {
    path: distPath,
    filename: 'index.js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: distPath,
    hot: true,
    open: true,
    host: 'localhost',
    port: 8888,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    // 注意生产环境下禁止写这个!!! 通用设置也不要写
    new webpack.DefinePlugin({
      "buildEnv": JSON.stringify(process.env.BUILD_ENV || 'pre-release'),
      "appName": JSON.stringify(process.env.APP_NAME || 'SAAS')
    }),
    // new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
