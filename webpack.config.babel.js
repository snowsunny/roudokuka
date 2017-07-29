import HtmlWebpackPlugin from 'html-webpack-plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

import path from 'path'
import webpack from 'webpack'

module.exports = {
  entry: {
    'roudokuka': './src/js/index.js',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src/js'),
      'node_modules'
    ]
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'docs'),
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pug/index.pug',
      inject: 'head'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      server: { baseDir: ['docs'] }
    })
  ],
  watch: true
}
