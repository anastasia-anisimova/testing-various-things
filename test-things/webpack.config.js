const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:  'development',
  entry: {
    main: './src/test-webpack/index.js',
    analytics: './src/test-webpack/analytics.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'custom_dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/test-webpack/index.html"
    })
  ]
}
