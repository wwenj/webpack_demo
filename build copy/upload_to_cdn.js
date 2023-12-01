const WebpackUploadPlugin = require('@q/webpack-upload-plugin');
const qcdn = require('@q/qcdn');

module.exports = (compiler) =>
  new Promise((resolve, reject) => {
    new WebpackUploadPlugin(qcdn, {
      passToCdn: {
        https: true,
        static: {
          domains: ['s4.ssl.res.360kuai.com', 's5.ssl.res.360kuai.com'],
        },
        image: {
          domains: [
            'p0.ssl.img.360kuai.com',
            'p1.ssl.img.360kuai.com',
            'p2.ssl.img.360kuai.com',
            'p3.ssl.img.360kuai.com',
            'p4.ssl.img.360kuai.com',
            'p5.ssl.img.360kuai.com',
          ],
        },
      },
      enableCache: true,
      onError(e) {
        reject(e);
      },
      onFinish() {
        resolve();
      },
    }).apply(compiler);
  });
