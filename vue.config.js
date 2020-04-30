/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  publicPath: './',
  // 修改 src 为 examples
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改他的选项
        return options
      })
  },
  configureWebpack: () => {
    const config = {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'examples'),
          packages: path.resolve(__dirname, 'packages')
        }
      }
    }
    return config
  }
}
