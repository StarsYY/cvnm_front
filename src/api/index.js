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

export function fetchPlate(query) {
  return request({
    url: '/index/plate',
    method: 'get',
    params: query
  })
}

export function followPlateById(data) {
  return request({
    url: '/index/plate/follow',
    method: 'post',
    data
  })
}

export function fetchIndexRight(query) {
  return request({
    url: '/index/right',
    method: 'get',
    params: query
  })
}

export function userSignIn(data) {
  return request({
    url: '/index/user/signIn',
    method: 'post',
    data
  })
}

export function fetchSignIn(data) {
  return request({
    url: '/index/user/signIn/status',
    method: 'post',
    data
  })
}
