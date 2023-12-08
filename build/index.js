import { vconsole } from './utils.js'
import devServer from './webpack.dev.js'
import build from './webpack.prod.js'

const { NODE_ENV = 'development' } = process.env;

vconsole.log('当前环境：' + NODE_ENV)

NODE_ENV === 'development' ? devServer() : build()
