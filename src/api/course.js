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
