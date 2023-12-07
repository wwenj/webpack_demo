const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    vendors: [
      '@babel/polyfill',
      'intersection-observer',
      'chimee',
      'react-lottie',
      'react',
      'react-dom',
    ],
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../public/static/'),
    filename: 'js/mini-video/[name].dll.js',
    library: '[name]_[hash]',
  },
  mode: 'production',
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_[hash]',
      path: path.join(__dirname, 'manifest.json'),
    }),
  ],
};
