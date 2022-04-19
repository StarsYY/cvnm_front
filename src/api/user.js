import request from '@/utils/request'

export function fetchUser(data) {
  return request({
    url: '/account',
    method: 'post',
    data
  })
}

export function fetchAccountInfo(data) {
  return request({
    url: '/account/info',
    method: 'post',
    data
  })
}

export function fetchUserInfo(data) {
  return request({
    url: '/account/user',
    method: 'post',
    data
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/account/user/update',
    method: 'post',
    data
  })
}

export function updateAccountInfo(data) {
  return request({
    url: '/account/user/update',
    method: 'post',
    data
  })
}

export function cancellationUser(data) {
  return request({
    url: '/account/user/cancellation',
    method: 'post',
    data
  })
}
