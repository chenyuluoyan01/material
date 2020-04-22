module.exports = {
    // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    productionSourceMap: false,
    devServer: {
      open: true,
      port: 80,
      host: '192.168.10.168',
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: 'http://192.168.10.207',
        //   secure: false,
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        },
      },
      overlay: {
        errors: true,
        warnings: true
      },
    }
}