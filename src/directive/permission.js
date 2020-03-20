// v-permission="[]"
// 完成一个指令，通过传递进来的权限数组和当前用户的角色数组进行过滤
// 如果用户拥有要求的角色，则可以看到

import store from '@/store'

// 否则删除指令挂钩 DOM 元素
export default {
  // el 挂载的dom
  // binding 绑定的数组
  inserted(el, binding) {
    // 获取值
    const { value: permissionRoles } = binding
    console.log(binding)
    // 获取用户角色
    const roles = store.getters.roles
    // 合法性判断
    if (permissionRoles && permissionRoles instanceof Array && permissionRoles.length > 0) {
      // 判断用户角色中是否有符合要求的
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role)
      })
      // 如果没有权限，则删除当前 DOM
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('v-permission 接收数组类型 value')
    }
  },
}
