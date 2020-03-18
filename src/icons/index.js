import Vue from 'vue'
import Icon from '@/components/Icon.vue'
// 图标自动导入
// 利用 webpack 的 require.context

// 返回的 req 是一个函数，只能加载 svg 目录中符合 /\.svg$/ 的文件
// 它的 keys() 会返回所有符合规定的文件的相对路径
const req = require.context('./svg', false, /\.svg$/) // (不递归，只加载 .svg )

console.log(req.keys())

req.keys().map(req)

Vue.component('Icon', Icon)
