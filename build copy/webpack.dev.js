import { merge } from 'webpack-merge';
import common from './webpack.config';

export default merge(common, {
  mode: 'development',
});
