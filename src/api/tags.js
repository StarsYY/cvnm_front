import request from '@/utils/request'

export function fetchTags(data) {
  return request({
    url: '/tags',
    method: 'get',
    params: data
  })
}

export function fetchLabel(query) {
  console.log(query)
  return request({
    url: '/tags/label?id=' + query,
    method: 'get',
    params: query
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
