import request from '@/utils/request'

export function fetchArticle(query) {
  return request({
    url: '/detail?id=' + query,
    method: 'get',
    params: query
  })
}

export function fetchComment(query) {
  return request({
    url: '/detail/comment?id=' + query,
    method: 'get',
    params: query
  })
}

export function createComment(data) {
  return request({
    url: '/detail/comment/add',
    method: 'post',
    data
  })
}
