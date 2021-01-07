const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    index: './index.ts',
    perfectSlider: ['./app/app.ts', './app/View/Slider/slider.scss']
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HTMLWebpackPlugin({
      currentEnv: process.env.MODE_ENV,
      filename: 'index.html',
      chunks: ['index'],
      template: './demo/demo.pug'
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/demo/favicons'),
          to: path.resolve(__dirname, '../dist/favicons'),
        },
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /(?!.test)\.ts(x?)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
    ],
  }
};