// vue项目的配置文件 覆盖
module.exports = {
  lintOnSave: false, // 暂时关闭代码检测

  // 配置反向代理，
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }

  // configureWebpack: {
  //   resolve:{
  //     alias:{
  //       'assets':'@/assets',
  //       'components':'@/components',
  //       'views':'@/views'
  //     }
  //   }
  // }

}
