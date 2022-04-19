import request from '@/utils/request'

export function fetchCreate(query) {
  return request({
    url: '/create',
    method: 'get',
    params: query
  })
}

export function fetchArticleDraft(query) {
  return request({
    url: '/create/draft',
    method: 'get',
    params: query
  })
}

export function fetchArticle(query) {
  return request({
    url: '/create/details?id=' + query,
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

export function updateArticle(data) {
  return request({
    url: '/create/update',
    method: 'post',
    data
  })
}
