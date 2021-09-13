const path = require('path');
const webpack = require('webpack');
const srcDir = path.resolve(__dirname, '../src');

const webpackConfigBase = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory',
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        sideEffects: true
      },
    ]
  },
  resolve: {
    alias: {
      '@': srcDir,
      'react': 'react',
      // 'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
}

module.exports = webpackConfigBase
