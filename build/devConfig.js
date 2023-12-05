import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default {
    // static: path.resolve(__dirname, '../dist/'),
    open: true,
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false,
    compress: true,
    overlay: false,
    publicPath: '/static/',
    // proxy: {
    //     '*': {
    //         target: targetUrl,
    //         bypass: (req, res) => {
    //             if (req.url === '/') return '/static/zm.html'
    //         },
    //         changeOrigin: true
    //     }
    // },
    quiet: true,
    disableHostCheck: true,
    index: ''
}