import request from '@/utils/request'

export function fetchMySchool(data) {
  return request({
    url: '/school/my',
    method: 'post',
    data
  })
}

export function fetchFavorites(data) {
  return request({
    url: '/school/my/favorites?uid=' + data,
    method: 'get',
    params: data
  })
}

export function fetchOrder(data) {
  return request({
    url: '/school/my/order',
    method: 'post',
    data
  })
}
