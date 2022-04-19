import request from '@/utils/request'

export function fetchPlate(query) {
  return request({
    url: '/tags/plate',
    method: 'get',
    params: query
  })
}

export function fetchSearch(data) {
  return request({
    url: '/search',
    method: 'post',
    data
  })
}
