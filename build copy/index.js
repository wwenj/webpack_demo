/**
 * @description 编译入口
 * @param env 编译环境 development | production    default = development
 * @param statistic 是否编译后生成依赖图谱            default = false
 */

const webpack = require('webpack');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const { parseArgv, packWebpackConfigByENV } = require('./utils');

(async () => {
  const args = parseArgv(process.argv);
  const { env } = args;
  const compileFn = require(`./env/${env}`);
  const { entryName, webpackConfig } = packWebpackConfigByENV(
    args,
    env === 'production' ? prodConfig : devConfig
  );
  const compiler = webpack(webpackConfig);
  compileFn(args, entryName, compiler);
})();
