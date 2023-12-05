import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { vconsole } from './utils.js'
import HtmlWebpackPlugin from 'html-webpack-plugin';
// const { NODE_ENV = 'development' } = process.env;

// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取 css 文件
import webpack from 'webpack'


let buildStartTime = 0;
export default {
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 600,
  //   ignored: /node_modules/,
  // },
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
      publicPath: '/dist/',
    },
    compress: true,
    port: 'auto',
    host: '0.0.0.0',
  },
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, '../src/page1/index.jsx'),
  },
  output: {
    // 开发环境为了代码分片的路径会设置 publicPath: '/static/'
    path: path.resolve(__dirname, '../dist/'),
    filename: 'js/[name].js',
    publicPath: '/dist/'
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
          'style-loader',
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
        if (percentage === 0) {
          buildStartTime = Date.now();
        }
        vconsole.log(`${(percentage * 100).toFixed(0) + '% '}${message} ${args.join(' ')}`);
        // if (process.stdout.isTTY && percentage < 1) {
        //   process.stdout.cursorTo(0);
        //   process.stdout.write(`进度：${(percentage * 100).toFixed(0) + '% '}`);
        //   process.stdout.clearLine(1);
        // }
        if (percentage === 1) {
          const cost = Date.now() - buildStartTime;
          process.stdout.write('\n');
          vconsole.log(`编译完成，耗时：${cost}ms`);
        }
      },
    }),
    new webpack.DefinePlugin({
      _WEBPACK_MODE_: JSON.stringify('production'),
    })

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

