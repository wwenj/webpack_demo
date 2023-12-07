const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取 css 文件
const webpack = require('webpack');

/** @type {import("webpack").Configuration}  */
const config = {
  entry: {
  },
  output: {
  },
  // 兼容IE8不能使用 eval类型的sourcemap
  devtool: 'source-map',
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.es', '.jsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /(\.[je]s|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.(png|jpg|gif|cur|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              // name: 'img/car/[name].[hash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css|less/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'css/',
            },
          },
          'css-loader',
          // 'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // eslint-disable-next-line global-require
      manifest: require('./manifest.json'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/mini-video/[name].css',
      chunkFilename: 'css/mini-video/[id].css',
    }),
  ],
};

module.exports = config;
