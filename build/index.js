// const webpack = require('webpack');
// const devConfig = require('./webpack.dev');
// const prodConfig = require('./webpack.prod');
// const { parseArgv, packWebpackConfigByENV } = require('./utils');

// const {wconsole} = require('./utils')
import webpack from 'webpack';
import config from './webpack.config.js'
import { vconsole } from './utils.js'
const { NODE_ENV = 'development' } = process.env;
vconsole.log('当前环境：' + NODE_ENV)
// const args = parseArgv(process.argv);
// const { env } = args;
// const compileFn = require(`./env/${env}`);
// const { entryName, webpackConfig } = packWebpackConfigByENV(
//     args,
//     config
// );
webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
        vconsole.error('编译出错', err, stats, '---')
        vconsole.error(err)
        vconsole.error(stats)
    }
    vconsole.log('webpack 编译成功')
});
// compileFn(args, entryName, compiler);
