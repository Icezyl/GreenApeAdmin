module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8081,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/api/', // 后台接口地址
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
