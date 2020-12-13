const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options:{
              postcssOptions: {
                plugins: [
                  autoprefixer,
                  cssnano({
                    preset: [
                      'default', {
                        discardComments: {
                          removeAll: true,
                        },
                      },
                    ],
                  })
                ],
                sourceMap: true,
              }
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ]
  }
});
