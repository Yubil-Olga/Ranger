const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

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
          template: './index.html'
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
            "window.jQuery": "jquery"
          })
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
          }
        ],
      }
}