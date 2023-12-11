import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { merge } from 'webpack-merge'
import common from './webpack.config.js'
import { vconsole } from './utils.js'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const webpackConfig = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      _WEBPACK_MODE_: JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]/[name].css',
      chunkFilename: 'css/[name]/[id].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000, //生成 chunk 的最小体积
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
});

export default function () {
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      vconsole.error('编译出错')
      vconsole.error(err)
      vconsole.error(stats)
    } else {
      vconsole.log('webpack 编译成功')
    }
  });
}