import request from '@/utils/request'

export function fetchIndex(query) {
  return request({
    url: '/index',
    method: 'get',
    params: query
  })
}

export function fetchContentTags(query) {
  return request({
    url: '/contentTags',
    method: 'get',
    params: query
  })
}

export function fetchArticle(query) {
  return request({
    url: '/article',
    method: 'get',
    params: query
  })
}

export function getArticle(query) {
  return request({
    url: '/article',
    method: 'get',
    params: query
  })
}
