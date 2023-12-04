export const vconsole = {
  log(msg) {
    console.log('\x1b[42m\x1b[37m 信息 INFO \x1b[0m\x1b[32m ' + msg + '\x1b[0m');
  },
  warn(msg) {
    console.log('\x1b[43m\x1b[37m 警告 WARN \x1b[0m\x1b[33m ' + msg + '\x1b[0m');
  },
  error(msg) {
    console.log('\x1b[41m\x1b[37m 错误 ERROR \x1b[0m\x1b[31m ' + msg + '\x1b[0m');
  }
}