import request from '@/utils/request'

export function fetchArticle(data) {
  return request({
    url: '/detail',
    method: 'get',
    params: data
  })
}

export function fetchComment(data) {
  return request({
    url: '/detail/comment',
    method: 'get',
    params: data
  })
}

export function createComment(data) {
  return request({
    url: '/detail/comment/add',
    method: 'post',
    data
  })
}

export function upArticle(data) {
  return request({
    url: '/detail/upOrDown',
    method: 'post',
    data
  })
}

export function downArticle(data) {
  return request({
    url: '/detail/upOrDown',
    method: 'post',
    data
  })
}

export function starArticle(data) {
  return request({
    url: '/detail/star',
    method: 'post',
    data
  })
}

export function upComment(data) {
  return request({
    url: '/detail/upComment',
    method: 'post',
    data
  })
}

export function followAuthor(data) {
  return request({
    url: '/detail/followAuthor',
    method: 'post',
    data
  })
}
