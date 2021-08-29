const path = require('path');
const webpack = require('webpack');
const srcDir = path.join(__dirname, '../src');

const webpackConfigBase = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-react', "@babel/preset-env"],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: (loader) => [
          //       require('autoprefixer')()
          //     ],
          //   }
          // }
        ],
        sideEffects: true
      },
    ]
  },
  resolve: {
    alias: {
      '@': srcDir,
      'react': 'react',
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      "buildEnv": JSON.stringify(process.env.BUILD_ENV || 'pre-release'),
      "appName": JSON.stringify(process.env.APP_NAME || 'SAAS')
    }),
  ]
}
module.exports = webpackConfigBase
