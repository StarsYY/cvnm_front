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

export function fetchVerify(data) {
  return request({
    url: '/user/verify',
    method: 'post',
    data
  })
}

export function fetchIntegral(data) {
  return request({
    url: '/user/integral',
    method: 'post',
    data
  })
}

export function fetchDraft(data) {
  return request({
    url: '/user/draft',
    method: 'post',
    data
  })
}

export function fetchReply(data) {
  return request({
    url: '/user/reply',
    method: 'post',
    data
  })
}
