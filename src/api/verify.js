import request from '@/utils/request'

export function fetchVerify(query) {
  return request({
    url: '/verify?uid=' + query,
    method: 'get',
    params: query
  })
}

export function createVerify(data) {
  return request({
    url: '/verify/add',
    method: 'post',
    data
  })
}
