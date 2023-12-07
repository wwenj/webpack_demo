const { execSync } = require('child_process');
const chalk = require('chalk');
const registry = '';

module.exports = function (modName) {
  console.log(chalk.green(`开始检查当前环境 ${modName} 版本`));
  const latest = JSON.parse(execSync(`npm view ${modName} version ${registry} --json`, { encoding: 'utf-8' }));
  const {
    dependencies: {
      [modName]: {
        version: current
      }
    }
  } = JSON.parse(execSync(`npm list ${modName} ${registry} --json`, {
    encoding: 'utf-8'
  }));

  console.log(chalk.cyan(`${modName} 本地版本：${current}，线上最新版本：${latest}`));
  if (latest === current) {
    return console.log(chalk.green(`恭喜你，${modName} 已是最新`));
  }

  console.log(chalk.bgRed(`当前环境的 ${modName} 模块不是最新版本，马上进入更新环节`));
  try {
    execSync(`npm install ${modName}@${latest} ${registry}`);
    console.log(chalk.green(`${modName} 安装成功`));
  } catch (e) {
    console.log(e);
    console.log(chalk.bgRed(`${modName}@${latest} 安装失败，请重新尝试`));
  }
};