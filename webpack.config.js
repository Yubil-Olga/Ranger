const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    index: './index.ts',
    favouriteslider: './app/app.ts'
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4200,
    hot: isDev,
    stats: 'errors-only'
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: './demo/demo.pug'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/demo/favicons'),
          to: path.resolve(__dirname, 'dist/favicons'),
        },
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
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