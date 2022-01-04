import request from '@/utils/request'

export function uploadArticleImage(data) {
  return request({
    url: '/adm/article/upload',
    method: 'post',
    data
  })
}

export function uploadCommentImage(data) {
  return request({
    url: '/detail/upload',
    method: 'post',
    data
  })
}
