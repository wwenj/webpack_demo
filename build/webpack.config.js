import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { vconsole } from './utils.js'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
const { NODE_ENV = 'development' } = process.env;
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取 css 文件
import webpack from 'webpack'
let progressStartTime = 0
export default {
  devtool: NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
  context: path.resolve(__dirname, './'),
  entry: {
    page1: path.resolve(__dirname, '../src/page1/index.jsx'),
    page2: path.resolve(__dirname, '../src/page2/index.jsx'),
  },
  output: {
    // 开发环境为了代码分片的路径会设置 publicPath: '/static/'
    path: path.resolve(__dirname, '../dist/'),
    filename: 'js/[name]/[name].js',
    publicPath: '/',
    // assetModuleFilename: 'images/[hash][ext][query]',
    clean: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.m?js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.css|less/,
        use: [
          NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'images/[hash][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/page1/index.html'),
      filename: 'page1.html',
      chunks: ['page1'],
      publicPath: './'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/page2/index.html'),
      filename: 'page2.html',
      chunks: ['page2'],
      publicPath: './'
    }),
    new webpack.ProgressPlugin({
      handler(percentage, message, ...args) {
        // dev-server每次进度从0.03开始，不知道为啥
        if (percentage <= 0.03) {
          progressStartTime = Date.now();
        }
        if (process.stdout.isTTY && percentage < 1) {
          process.stdout.cursorTo(0);
          process.stdout.write(`进度：${(percentage * 100).toFixed(0) + '% '}：${message}：${args.join(' ')}`);
          process.stdout.clearLine(1);
        }
        if (percentage === 1) {
          const cost = Date.now() - progressStartTime;
          process.stdout.write('\n');
          vconsole.log(`编译完成，耗时：${cost}ms`);
        }
      },
    }),
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   // eslint-disable-next-line global-require
    //   manifest: require('./manifest.json'),
    // }),
    // new MiniCssExtractPlugin({
    //   filename: 'css/mini-video/[name].css',
    //   chunkFilename: 'css/mini-video/[id].css',
    // }),
  ],
  optimization: {
    runtimeChunk: 'single',
  },
};

