import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './icons'
import './permission'

// 注册指令
import permission from '@/directive/permission'
Vue.directive('permission', permission)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
