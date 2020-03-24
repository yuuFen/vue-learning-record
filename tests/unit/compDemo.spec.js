import Vue from 'vue'
import TestDemo from '@/components/TestDemo.vue'

import { mount } from '@vue/test-utils'

describe('TestDemo', () => {
  // 原始写法：

  // 检查原始组件选项
  it('存在 created 生命周期', () => {
    expect(typeof TestDemo.created).toBe('function')
  })

  // 评估原始组件选项中的函数的结果
  it('初始 data 是 vue-text', () => {
    // 检查 data 函数存在性
    expect(typeof TestDemo.data).toBe('function')
    // 检查 data 返回的默认值
    const defaultData = TestDemo.data()
    expect(defaultData.message).toBe('Hello!')
  })

  it('mount 之后 data.message 是 Demo', () => {
    const vm = new Vue(TestDemo).$mount()
    expect(vm.message).toBe('Demo')
  })

  // 使用 vue test utils：
  it('按钮点击后', () => {
    // 挂载组件
    const wrapper = mount(TestDemo)
    // 查找元素，触发事件
    wrapper.find('button').trigger('click')
    // 测试数据变化
    expect(wrapper.vm.message).toBe('按钮点击')
    // 测试 html 渲染结果
    expect(wrapper.find('span').html()).toBe('<span>按钮点击</span>')
    // 等效的方式
    expect(wrapper.find('span').text()).toBe('按钮点击')
  })
})
