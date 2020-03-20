import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)

// 静态部分 通用部分
export const constRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '主页',
    },
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
        name: 'Home',
        meta: {
          title: 'Home', // 导航菜单项标题
          icon: 'msg', // 导航菜单项图标
        },
      },
    ],
  },
]

export const asyncRoutes = [
  {
    path: '/about',
    component: Layout,
    redirect: '/about/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "home" */ '@/views/About.vue'),
        name: 'about',
        meta: {
          title: 'About',
          icon: 'img',
          // 角色
          role: ['admin', 'editor'],
        },
      },
    ],
  },
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes,
})
