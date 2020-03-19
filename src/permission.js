// 生成全局路由
import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // 从 cookie 中获取 token

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      // 已登录，获取用户角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        // 这样会阻塞配置里的重定向
        // 先请求用户信息
        const { roles } = await store.dispatch('user/getInfo')
        // 根据角色生成动态路由
        const accessedRoutes = await store.dispatch('permission/generateRoutes', roles)
        // 添加至 router
        router.addRoutes(accessedRoutes)
        // 重定向
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
