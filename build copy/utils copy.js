const { exec: exe } = require('child_process');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const exec = (exports.exec = (cmd) => {
  return new Promise((resolve, reject) => {
    exe(cmd, (err, stdout) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
});

exports.parseArgv = (argvs = []) => {
  const args = {};
  const ret = argvs
    .slice(1)
    .map((text) => text.split('='))
    .filter(([a, b]) => a && b);
  for (let index = 0; index < ret.length; index++) {
    const [k, v] = ret[index];
    if (k === 'entry') {
      args[k] = v.split(',');
    } else {
      args[k] = v;
    }
  }
  args.env = args.env === 'production' ? args.env : 'development';
  return args;
};

const wconsole = (exports.wconsole = {
  log(msg) {
    console.log('\033[42;30m INFO \033[40;32m ' + msg + '\033[0m');
  },
  warn(msg) {
    console.warn('\033[43;30m WARN \033[40;33m ' + msg + '\033[0m');
  },
  error(msg) {
    console.error('\033[41;30m ERROR \033[40;31m ' + msg + ' \033[0m');
  },
});

// 根据环境改变webpack配置
exports.packWebpackConfigByENV = ({ entry, env, wds }, webpackConfig) => {
  switch (env) {
    case 'production':
      return { entryName: '生产环境', webpackConfig };
    default:
      const { entry: defaultEntry } = webpackConfig;
      let entryName = '';
      if (!entry || !entry.length) {
        entry = Object.keys(defaultEntry);
      }
      const targetEntry = {};
      entry.forEach((key) => {
        const curEntry = defaultEntry[key];
        if (!curEntry) {
          return wconsole.log(`不存在的入口 ${entry}`);
        }
        entryName += key + ' ';
        targetEntry[key] = curEntry;
      });
      webpackConfig.entry = targetEntry;
      wds &&
        (webpackConfig.entry.webpackDevInline =
          'webpack-dev-server/client?http://localhost:8080/');
      webpackConfig.output.publicPath = '/static/';
      return {
        entryName,
        webpackConfig,
      };
  }
};

// 增加进度显示
exports.showProgress = (compiler, cb) => {
  let progressStartTime;
  new ProgressPlugin((percentage, msg) => {
    if (percentage === 0) {
      progressStartTime = Date.now();
    }
    if (process.stdout.isTTY && percentage < 1) {
      process.stdout.cursorTo(0);
      process.stdout.write(`进度：${(percentage * 100).toFixed(0) + '% '}`);
      process.stdout.clearLine(1);
    }
    if (percentage === 1) {
      const cost = Date.now() - progressStartTime;
      process.stdout.write('\n');
      setTimeout(() => {
        cb && cb(cost);
      });
    }
  }).apply(compiler);
};

/**
 * @description 清除编译后文件
 */
exports.removeCompiledFileAfterProcessTerminate = () => {
  process
    .on('SIGINT', () => {
      exec('cd ../..; npm run clean;').catch((e) => {});
    })
    .on('SIGTERM', () => {
      exec('cd ../..; npm run clean;').catch((e) => {});
    });
};
