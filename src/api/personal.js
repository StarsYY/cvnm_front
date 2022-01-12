import request from '@/utils/request'

export function fetchUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function fetchOverview(data) {
  return request({
    url: '/user/overview',
    method: 'post',
    data
  })
}

export function fetchCollect(data) {
  return request({
    url: '/user/collect',
    method: 'post',
    data
  })
}

export function fetchArticle(data) {
  return request({
    url: '/user/article',
    method: 'post',
    data
  })
}

export function fetchFans(data) {
  return request({
    url: '/user/fans',
    method: 'post',
    data
  })
}

export function fetchFollow(data) {
  return request({
    url: '/user/follow',
    method: 'post',
    data
  })
}

export function followUser(data) {
  return request({
    url: '/user/follow/user',
    method: 'post',
    data
  })
}
