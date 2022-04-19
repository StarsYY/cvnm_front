import request from '@/utils/request'

export function fetchBusinessArea() {
  return request({
    url: '/course',
    method: 'get'
  })
}

export function getModularAndCourse(query) {
  return request({
    url: '/course/modularAndCourse',
    method: 'get',
    params: query
  })
}

export function fetchCreate(query) {
  return request({
    url: '/create/course',
    method: 'get',
    params: query
  })
}

export function fetchCourseDraft(query) {
  return request({
    url: '/create/course/draft',
    method: 'get',
    params: query
  })
}

export function fetchCourse(query) {
  return request({
    url: '/create/course/details?id=' + query,
    method: 'get',
    params: query
  })
}

export function createCourse(data) {
  return request({
    url: '/create/course/add',
    method: 'post',
    data
  })
}

export function updateCourse(data) {
  return request({
    url: '/create/course/update',
    method: 'post',
    data
  })
}
