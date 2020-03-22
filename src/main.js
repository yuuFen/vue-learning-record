import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './icons'
import './permission'

// 注册指令
import permission from '@/directive/permission'

import ElementUI from 'element-ui'
import './styles.scss'

Vue.use(ElementUI)
Vue.directive('permission', permission)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
