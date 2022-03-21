import request from '@/utils/request'

export function fetchOrder(data) {
  return request({
    url: '/school/confirm?id=' + data,
    method: 'get',
    params: data
  })
}

export function payment(data) {
  return request({
    url: '/school/confirm/pay',
    method: 'post',
    data
  })
}
