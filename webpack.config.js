var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname + "/source",
  entry: {
    site: './javascripts/site.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: ["babel-loader"],
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: "stylesheets",
        })
      },
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin({
      filename: "stylesheets/[name].css",
      disable: false,
      allChunks: true,
    }),
  ],
  output: {
    filename: 'javascripts/[name].js',
    path: path.resolve('build'),
    publicPath: "/javascripts/"
  }
};
