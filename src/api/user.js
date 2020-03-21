import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    methods: 'post',
    data,
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    methods: 'get',
  })
}
