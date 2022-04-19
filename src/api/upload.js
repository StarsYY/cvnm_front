import request from '@/utils/request'

export function uploadArticleImage(data) {
  return request({
    url: '/create/upload',
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

export function uploadVerifyPhoto(data) {
  return request({
    url: '/verify/upload',
    method: 'post',
    data
  })
}

export function uploadUserPortrait(data) {
  return request({
    url: '/account/user/upload',
    method: 'post',
    data
  })
}

export function uploadCourseImage(data) {
  return request({
    url: '/create/course/upload',
    method: 'post',
    data
  })
}

export function uploadCourseVideo(data) {
  return request({
    url: '/adm/course/upload/video/merge',
    method: 'post',
    data
  })
}
