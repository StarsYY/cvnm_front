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

export function fetchUserIntegral(data) {
  return request({
    url: '/school/confirm/userIntegral',
    method: 'post',
    data
  })
}

export function IntegralPayCourse(data) {
  return request({
    url: '/school/confirm/pay/integral',
    method: 'post',
    data
  })
}

export function fetchPay(data) {
  return request({
    url: '/school/order/pay',
    method: 'post',
    data
  })
}
