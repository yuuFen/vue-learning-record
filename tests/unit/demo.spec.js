function add(num1, num2) {
  return num1 + num2
}

// 测试套件 test suite
describe('demo', () => {
  // 测试用例 test case
  it('测试 add 函数', () => {
    // 断言 assert
    expect(add(1,3)).toBe(3)
    expect(add('str',4)).toBe(5)
    expect(add(1,3)).toBe(4)
  })
}) 