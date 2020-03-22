// 处理 post 请求参数
const bodyParser = require('body-parser')

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
    // 如果请求的接口在另一台服务器上，开发时则需要设置代理避免跨域问题
    proxy: {
      // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
      // 请求的还是 http://localhost:7070/..，之后的代理转发浏览器不可知
      // 代理转发发生在 before 之后，所以会被 before 拦截，所以这俩互斥 
      // 当使用绝对路径时，代理不生效
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:3000/`,
        changeOrigin: true,  
        pathRewrite: { // dev-api/user/login => /user/login
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
        
      }
    },

    // // 配置 mock 接口
    // // app 是 express 的实例
    // before: (app) => {
    //   // 注册中间件，处理 post 参数
    //   app.use(bodyParser.json())

    //   app.post('/dev-api/user/login', (req, res) => {
    //     const { username } = req.body

    //     if (username === 'admin' || username === 'jerry') {
    //       res.json({
    //         code: 1,
    //         data: username,
    //       })
    //     } else {
    //       res.json({
    //         code: 10204,
    //         message: '用户名或密码错误',
    //       })
    //     }
    //   })

    //   // get 之前需要一个中间件来判断 token 合法性，这里没写
    //   app.get('/dev-api/user/info', (req, res) => {
    //     const auth = req.headers['authorization']
    //     const roles = auth.split(' ')[1] === 'admin' ? ['admin'] : ['editor']
    //     res.json({
    //       code: 1,
    //       data: roles,
    //     })
    //   })
    // },
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
