import webpack from 'webpack';
import webpackConfig from './webpack.config.js'
import { vconsole } from './utils.js'
import WebpackDevServer from "webpack-dev-server"

const { NODE_ENV = 'development' } = process.env;

vconsole.log('当前环境：' + NODE_ENV)

const compiler = webpack(webpackConfig)
const devServerOptions = { ...webpackConfig.devServer, open: true };
const devServer = new WebpackDevServer(devServerOptions, compiler);


devServer.startCallback(() => {
    console.log('Successfully started server on http://localhost:8080');
});

const runServer = async () => {
    console.log('Starting server...');
    await devServer.start();
};
runServer()
// webpack(config, (err, stats) => {
//     if (err || stats.hasErrors()) {
//         vconsole.error('编译出错')
//         vconsole.error(err)
//         vconsole.error(stats)
//     } else {
//         // vconsole.log('webpack 编译成功')
//     }
// });
