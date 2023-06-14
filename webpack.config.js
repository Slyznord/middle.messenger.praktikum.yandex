const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: "development",
  entry: './src/index.ts',
  devServer: {
    historyApiFallback: true,
    static: './dist',
    port: '3000'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'handlebars' : 'handlebars/dist/handlebars.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.hbs',
      filename: 'index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
}
