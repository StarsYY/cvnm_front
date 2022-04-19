import request from '@/utils/request'

export function fetchCourse(query) {
  return request({
    url: '/course/video',
    method: 'get',
    params: query
  })
}

export function fetchUser(query) {
  return request({
    url: '/course/user?uid=' + query,
    method: 'get',
    params: query
  })
}

export function boolDiscuss(query) {
  return request({
    url: '/course/bool',
    method: 'get',
    params: query
  })
}

export function createDiscuss(data) {
  return request({
    url: '/course/discuss/add',
    method: 'post',
    data
  })
}

export function fetchDiscuss(query) {
  return request({
    url: '/course/discuss',
    method: 'get',
    params: query
  })
}

export function createFollow(data) {
  return request({
    url: '/course/discuss/follow',
    method: 'post',
    data
  })
}

export function deleteMyDiscuss(data) {
  return request({
    url: '/course/discuss/delete',
    method: 'post',
    data
  })
}

export function createLearning(data) {
  return request({
    url: '/course/learning',
    method: 'post',
    data
  })
}

export function fetchRecommend(query) {
  return request({
    url: '/course/recommend?id=' + query,
    method: 'get',
    params: query
  })
}
