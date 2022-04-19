import request from '@/utils/request'

export function fetchTags(data) {
  return request({
    url: '/tags',
    method: 'get',
    params: data
  })
}

export function fetchLabel(query) {
  return request({
    url: '/tags/label',
    method: 'get',
    params: query
  })
}

export function followLabelById(data) {
  return request({
    url: '/tags/label/follow',
    method: 'post',
    data
  })
}

export function fetchPlate() {
  return request({
    url: '/tags/plate',
    method: 'get'
  })
}

export function fetchTagDetail(query) {
  return request({
    url: '/tags/article',
    method: 'get',
    params: query
  })
}

export function fetchTagRight(query) {
  return request({
    url: '/tags/right',
    method: 'get',
    params: query
  })
}
