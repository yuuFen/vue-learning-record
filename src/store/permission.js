// 路由配置信息、路由生成逻辑
import { constRoutes, asyncRoutes } from '@/router'

/**
 * 根据路由 meta.role 确定当前用户是否具有访问权限
 * @roles 用户的拥有角色
 * @route 待判断路由
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // 如果当前路由有 roles 字段，则需要判断用户权限
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤 AsyncRoutes 路由表
 * @roles 用户拥有的角色
 * @routes 待过滤路由表， 首次传入的就是 AsyncRoutes
 */
export function filterAsyncRoutes(roles, routes) {
  const res = []
  routes.forEach((route) => {
    // 复制一份
    const tmp = { ...route }
    // 如果用户有访问权限则加入结果路由表
    if (hasPermission(roles, tmp)) {
      // 如果存在子路由则递归过滤
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(roles, tmp.children)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  // 完整路由
  routes: [],
  // 能够访问的动态路由
  addRoutes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constRoutes.concat(routes)
  },
}

const actions = {
  // 生成路由，在得到用户角色后会第一时间调用
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      let accessedRoutes
      if (roles.includes('admin')) {
        // 如果是管理员，有全部权限
        accessedRoutes = asyncRoutes || []
      } else {
        // 否则过滤
        accessedRoutes = filterAsyncRoutes(roles, asyncRoutes)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
