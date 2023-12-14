import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { merge } from 'webpack-merge'
import common from './webpack.common.js'
import { vconsole } from './utils.js'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

const webpackConfig = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: ['/main.html'],
    port: 'auto',
    host: '0.0.0.0',
    hot: true,
    proxy: {
      '/api': 'http://api.test.com',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      _WEBPACK_MODE_: JSON.stringify('development'),
    }),
  ],
});

export default function () {
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
