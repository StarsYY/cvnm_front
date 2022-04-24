import request from '@/utils/request'

export function fetchUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function editUserSummary(data) {
  return request({
    url: '/user/editSummary',
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

export function fetchreRecommendArticle(data) {
  return request({
    url: '/user/recommendArticle',
    method: 'post',
    data
  })
}

export function fetchExpert(data) {
  return request({
    url: '/user/expert',
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

export function fetchSystemMessage(data) {
  return request({
    url: '/user/message/system',
    method: 'post',
    data
  })
}

export function fetchAdministratorMessage(data) {
  return request({
    url: '/user/message/administrator',
    method: 'post',
    data
  })
}

export function setMessageRead(data) {
  return request({
    url: '/user/message/read',
    method: 'post',
    data
  })
}

export function setClearRead(data) {
  return request({
    url: '/user/message/readAll',
    method: 'post',
    data
  })
}

export function deleteSelectMessage(data) {
  return request({
    url: '/user/message/deleteAll',
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

export function deleteMyArticle(data) {
  return request({
    url: '/user/article/delete',
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

export function fetchFollowPlate(data) {
  return request({
    url: '/user/follow/plate',
    method: 'post',
    data
  })
}

export function fetchFollowLabel(data) {
  return request({
    url: '/user/follow/label',
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

export function deleteMyDraft(data) {
  return request({
    url: '/user/draft/delete',
    method: 'post',
    data
  })
}

export function fetchAudit(data) {
  return request({
    url: '/user/audit',
    method: 'post',
    data
  })
}

export function deleteMyAudit(data) {
  return request({
    url: '/user/audit/delete',
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

export function deleteMyReply(data) {
  return request({
    url: '/user/reply/delete',
    method: 'post',
    data
  })
}
