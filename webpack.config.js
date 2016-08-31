const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let loaders = require('./webpack.loaders.js');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8080";

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
};

// global css
loaders.push({
  test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
  loaders: [
    'style?sourceMap',
    'css'
  ]
});
// local scss modules
loaders.push({
  test: /[\/\\]src[\/\\].*\.scss/,
  loaders: [
    'style?sourceMap',
    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
    'sass'
  ]
});

// local css modules
loaders.push({
  test: /[\/\\]src[\/\\].*\.css/,
  loaders: [
    'style?sourceMap',
    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
  ]
});

module.exports = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: [
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    './src/index.jsx'
  ],
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: loaders
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
