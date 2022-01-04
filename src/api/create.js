import request from '@/utils/request'

export function fetchCreate(query) {
  return request({
    url: '/create',
    method: 'get',
    params: query
  })
}

export function createArticle(data) {
  return request({
    url: '/create/add',
    method: 'post',
    data
  })
}
