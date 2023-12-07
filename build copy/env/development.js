const { showProgress, wconsole } = require('../utils');
const WebpackDevServer = require('webpack-dev-server');
const webpackMkcert = require('webpack-mkcert');

const statsConfig = {
  colors: true,
  errorDetails: true,
  assets: true,
  excludeAssets: [/img[\/|\\]mini-video[\/|\\].*/],
  builtAt: false,
  hash: false,
  version: false,
  timings: false,
  modules: false,
  entrypoints: false,
};

module.exports = async ({ wds }, entryName, compiler) => {
  const https = await webpackMkcert.default({
    source: 'coding',
    hosts: ['dev.360kuai.com', '127.0.0.1'],
  });


  showProgress(compiler, (cost) => {
    wconsole.log(`代码编译完成，用时 ${(cost / 1000).toFixed(2)} 秒`);
  });

  // 本地编译，不使用webpack dev server
  if (!wds) {
    compiler.watch(
      {
        ignored: /node_modules/,
        progress: true,
      },
      (err, stats) => {
        console.log(stats.toString(statsConfig));
      }
    );
  } else {
    const host = 'dev.360kuai.com';
    const server = new WebpackDevServer(compiler, {
      publicPath: '/static/',
      contentBase: false,
      compress: true,
      open: true,
      openPage: 'pc/mvideo',
      host,
      https: {
        ...https,
        hosts: host,
      },
      stats: statsConfig,
      proxy: {
        '**': {
          target: `http://${host}:8083`,
        },
      },
      writeToDisk(curPath) {
        return /.static.img.mini-video/.test(curPath);
      },
    });
    server.listen(8080, host);
  }
  wconsole.log(`正在进行 ${entryName} 入口开发环境编译`);
};
