import request from '@/utils/request'

export function login(query) {
  return request({
    url: '/login',
    method: 'post',
    params: query
  })
}

export function getInfo(nickname) {
  return request({
    url: '/info',
    method: 'post',
    params: { nickname }
  })
}

export function register(query) {
  return request({
    url: '/register',
    method: 'post',
    params: query
  })
}

export function fetchNavigation(query) {
  return request({
    url: '/navigation',
    method: 'get',
    params: query
  })
}
