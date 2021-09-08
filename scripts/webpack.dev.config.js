const { resolve } = require('path');
const webpack = require('webpack');
const webpackConfigBase = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const webpackConfigDev = {
  mode: 'development',
  entry: resolve(__dirname, '../src/test/index.js'),
  output: {
    path: resolve(__dirname, '../build'),
    filename: 'index.js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: resolve('../build'),
    hot: true,
    // open: true,
    host: 'localhost',
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html', }),
    // new webpack.NamedModulesPlugin(),
    // 注意生产环境下禁止写这个!!! 通用设置也不要写
    new webpack.DefinePlugin({
      "buildEnv": JSON.stringify(process.env.BUILD_ENV || 'pre-release'),
      "appName": JSON.stringify(process.env.APP_NAME || 'SAAS')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
