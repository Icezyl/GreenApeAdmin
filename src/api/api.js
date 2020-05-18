import { get, post } from './http'
export default {
  // 登录
  postLogin (data) {
    return post('admin/login', data)
  },
  // token验证
  postName (data) {
    return post('sss', data)
  },
  // 用户登录日志
  postUserLog (data) {
    return post('admin/login/log', data)
  },
  // 查询分类
  getCategory () {
    return get('category')
  },
  // 分页
  postTags (data) {
    return post('admin/book/tags', data)
  },
  // 书籍管理
  postBook (data) {
    return post('book', data)
  },
  // 用户
  posrUser (data) {
    return post('admin/info/selectAll', data)
  },
  // 修改权限
  posrJur (data) {
    return post('admin/update/power', data)
  },
  // 垃圾场
  postLj (data) {
    return post('admin/info/selectState', data)
  }
}
