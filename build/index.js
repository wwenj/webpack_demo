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

webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
        vconsole.error('编译出错')
        vconsole.error(err)
        vconsole.error(stats)
    }else{
        // vconsole.log('webpack 编译成功')
    }
});
