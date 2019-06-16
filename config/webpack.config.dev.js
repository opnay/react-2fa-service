module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    openPage: '',
    hot: true,
    quiet: true,
    stats: 'errors-only'
  }
};
