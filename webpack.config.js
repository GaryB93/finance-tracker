const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,

  entry: './client/index.js',

  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js'
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: 'Development',
      template: './client/index.html'
    })
  ],

  devServer: {
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, 'build'),
    },
    proxy: {
      '/api': 'http://localhost:3000',
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  }
}