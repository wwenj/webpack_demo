import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { vconsole } from './utils.js'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
const { NODE_ENV = 'development' } = process.env;
import webpack from 'webpack'

let progressStartTime = 0

export default {
  context: path.resolve(__dirname, './'),
  entry: {
    main: path.resolve(__dirname, '../src/main/index.jsx'),
    page2: path.resolve(__dirname, '../src/page2/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'js/[name]/[name].[contenthash].js',
    publicPath: '/',
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/main/index.html'),
      filename: 'main.html',
      chunks: ['main'],
      publicPath: '/'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/page2/index.html'),
      filename: 'page2.html',
      chunks: ['page2'],
      publicPath: '/'
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
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

