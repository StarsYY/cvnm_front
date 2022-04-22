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
    url: '/school/my/favorites',
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

export function delMyOrder(data) {
  return request({
    url: '/school/my/order/delete',
    method: 'post',
    data
  })
}

export function payMyOrder(data) {
  return request({
    url: '/school/my/order/pay',
    method: 'post',
    data
  })
}

export function fetchClass(data) {
  return request({
    url: '/school/my/class',
    method: 'get',
    params: data
  })
}

export function delLearn(data) {
  return request({
    url: '/school/my/class/delete',
    method: 'post',
    data
  })
}

export function fetchCourse(data) {
  return request({
    url: '/school/my/course',
    method: 'get',
    params: data
  })
}

export function delMyCourse(data) {
  return request({
    url: '/school/my/course/delete',
    method: 'post',
    data
  })
}
