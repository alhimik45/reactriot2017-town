const path = require('path')
const webpack = require('webpack')

const config = {
  devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map ' : 'cheap-module-eval-source-map ',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  }
}

if (process.env.NODE_ENV !== 'production') {
  config.entry.push('webpack-dev-server/client?http://localhost:3000')
}
module.exports = config

