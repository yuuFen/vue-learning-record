import Vue from 'vue'
import Vuex from 'vuex'

import permission from './permission'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    permission, // 权限
    user, // 用户信息
  },
  getters: {
    roles: (state) => state.user.roles,
    token: (state) => state.user.token,
    permission_routes: (state) => state.permission.routes,
  },
})
