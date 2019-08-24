const config = require('./webpack.config');

module.exports = config({
  mode: 'production',
  output: {
    filename: 'index.[hash].js'
  }
});
