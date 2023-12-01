import path from 'path'
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取 css 文件
// import webpack from 'webpack'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
  },
  output: {
    // 开发环境为了代码分片的路径会设置 publicPath: '/static/'
    path: path.resolve(__dirname, '../public/static/'),
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
      // {
      //   test: /\.css|less/,
      //   use: [
      //     // {
      //     //   loader: MiniCssExtractPlugin.loader,
      //     //   options: {
      //     //     publicPath: 'css/',
      //     //   },
      //     // },
      //     'css-loader',
      //     'less-loader',
      //   ],
      // },
    ],
  },
  plugins: [
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
};

