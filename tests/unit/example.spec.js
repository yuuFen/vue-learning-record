import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

// 测试套件
describe('HelloWorld.vue', () => {
  // 测试用例
  it('renders props.msg when passed', () => {
    // 挂载 HelloWorld 组件，传入 msg，测试它的 text 是否为 msg
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    })
    // 断言
    expect(wrapper.find('h1').text()).toMatch(msg)
  })
})
