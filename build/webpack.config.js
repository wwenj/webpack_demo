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
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, '../src/page1/index.jsx'),
  },
  output: {
    // 开发环境为了代码分片的路径会设置 publicPath: '/static/'
    path: path.resolve(__dirname, '../dist/'),
    filename: 'js/[name].js',
    publicPath: '/dist/',
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
        test: /\.m?js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.(png|jpg|gif|cur|svg|txt)$/,
        type: 'asset', //resource 和 inline选择
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        }
      },
      {
        test: /\.css|less/,
        use: [
          NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/page1/index.html'),
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

