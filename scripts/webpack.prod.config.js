const { resolve } = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackConfigBase = require('./webpack.base.config');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const webpackConfigProd = {
  mode: 'production',
  entry: {
    "index": resolve(__dirname, '../src/components/index.js')
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '../lib'),
    library: '@zxhj/component-library',
    libraryTarget: 'umd'
  },
  externals: [
    "react",
    'react-dom',
    'antd',
    '@ant-design/icons'
  ],
  devtool: 'source-map',  //或使用'cheap-module-source-map'、'none'
  optimization: {
    minimizer: [
      // 压缩js代码
      new TerserJSPlugin(),
      //压缩css代码
      new OptimizeCSSAssetsPlugin()
    ],
    // 组件库不能随意分割代码
    //   splitChunks: { 
    //     chunks: 'all',
    //     cacheGroups: {
    //       antd: {
    //         test: /[\\/]node_modules[\\/]antd[\\/]/,
    //         priority: 15,
    //         enforce: true,
    //         name: "antd"
    //       }
    //     }
    //  }
  },
  // 通过nodeExternals()将打包组件内的react等依赖给去除了
  // externals: [
  //   nodeExternals()
  // ], 
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin()     //每次执行都将清空一下./dist目录
  ]
}
module.exports = merge(webpackConfigBase, webpackConfigProd)
