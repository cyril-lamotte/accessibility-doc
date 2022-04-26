const path = require('path');
const pkg  = require('./package.json');
const outputDir = path.resolve(__dirname, pkg.buildPaths.scripts.o);
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  output: {
    filename: '[name]-bundle.js',
    path: outputDir,
  },
  mode: 'production', // 'development'|'production'.
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
  },
  plugins: [new ESLintPlugin({
    extensions: ['js'],
    exclude: [
      '/node_modules/',
      path.resolve(__dirname,
        'sources/js/contrib/*.js',
      ),
    ],
  })],
};
