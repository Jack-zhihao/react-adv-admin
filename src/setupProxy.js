const {createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
  // 将原来的proxy改为createProxyMiddleware 
    createProxyMiddleware(
      '/api',
      {
        target: 'http://192.168.1.10:9527',
        changeOrigin: true
      }
    )
  )
}
