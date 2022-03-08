import request from '@/utils/request'

export function fetchModular(data) {
  return request({
    url: '/school',
    method: 'get',
    params: data
  })
}

export function fetchHotCourse(query) {
  return request({
    url: '/school/hot?id=' + query,
    method: 'get',
    params: query
  })
}

export function fetchNewCourse(query) {
  return request({
    url: '/school/new?id=' + query,
    method: 'get',
    params: query
  })
}

export function fetchDeveloperStory(query) {
  return request({
    url: '/school/dev',
    method: 'get',
    params: query
  })
}
