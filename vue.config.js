const port = 7070
const title = 'Vue Learning Record'

const path = require('path')
// 将传入的相对路径转换为绝对路径，跨平台
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/practice',
  devServer: {
    port,
  },
  configureWebpack: {
    // 不够灵活
    name: title,
  },
  chainWebpack(config) {
    // 修改已有配置，忽略 src/icons
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))

    // 新建配置，使用 svg-sprite-loader 加载 src/icons
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')) // add 会改变上下文进入数组
        .end() // 结束数组操作，上下文回退
      .use('svg-sprite-loader') // 添加 loader
      .loader('svg-sprite-loader') // 切换上下文到 loader
        .options({ symbolId: 'icon-[name]' }) // 指定选项
        .end()
  }
}
