const {exec} = require('./utils');

(async() => {
  console.log('\033[42;30m INFO \033[40;32m 初始化DLL\033[0m');
  try {
    await exec('rm manifist.json');  
  } catch(e) {} finally {
    await exec('webpack --config build/dll.config.js');  
    console.log('\033[42;30m INFO \033[40;32m 完成\033[0m');
  }
})()