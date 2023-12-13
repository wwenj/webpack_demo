import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { merge } from 'webpack-merge'
import common from './webpack.config.js'
import { vconsole } from './utils.js'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

const webpackConfig = merge(common, {
  mode: 'development',
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 600,
  //   ignored: /node_modules/,
  // },
  devServer: {
    open: ['/main.html'],
    static: {
      directory: path.resolve(__dirname, '../assets'),
      // publicPath: '/dist/',
    },
    compress: true,
    port: 'auto',
    host: '0.0.0.0',
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      _WEBPACK_MODE_: JSON.stringify('development'),
    })
  ]
});

export default function () {
  // let startTime = Date.now();
  // 创建webpack对象
  const compiler = webpack(webpackConfig)
  // 创建devServer对象
  const devServer = new WebpackDevServer({ ...webpackConfig.devServer }, compiler);

  const runServer = async () => {
    vconsole.log('Starting server...');
    await devServer.start();
  };
  runServer()
}
