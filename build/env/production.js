const { wconsole, showProgress } = require('../utils');
const uploadToCDN = require('../upload_to_cdn');

module.exports = async (args, entryName, compiler) => {
  wconsole.log(`正在进行 ${entryName}编译`);
  const compileErrorList = [];
  const compileInfoList = [];
  uploadToCDN(compiler).catch((e) => compileErrorList.push(e));

  showProgress(compiler, () => {
    if (compileErrorList.length) {
      wconsole.error('编译错误');
      return console.warn(compileErrorList.join());
    }
    wconsole.log('生产环境编译成功');
    console.log(compileInfoList.join());
  });

  compiler.run((err, stats) => {
    const hasErr = err || stats.hasErrors();
    const errors = hasErr ? err || stats.toJson().errors : null;

    if (hasErr) {
      return compileErrorList.push(errors);
    }
    compileInfoList.push(
      stats.toString({
        all: false,
        modules: true,
        maxModules: 10,
        errors: true,
        warnings: true,
        colors: true,
        moduleTrace: true,
        errorDetails: true,
      })
    );
  });
};
