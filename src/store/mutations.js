import router from '@/router'
const mutations = {
  // 存储Token
  setToken (state, token) {
    state.token = token
    localStorage.token = token
  },
  removeToken (state) {
    state.token = ''
    localStorage.removeItem('token')
  },
  // 存储Id
  setId (state, data) {
    state.id = data.id
    localStorage.id = data.id
    state.userName = data.name
    localStorage.name = data.name
  },
  removeId (state) {
    state.userName = ''
    state.id = ''
    localStorage.removeItem('id')
    localStorage.removeItem('name')
  },
  // 导航状态切换
  setTeleState (state) {
    state.teleState = !state.teleState
  },
  // 添加导航标签
  setTagsList (state, data) {
    if (!state.tagsList.some(({ name }) => name === data.name)) {
      if (state.tagsList) {
        state.tagsList = [...state.tagsList, { name: data.name, father: data.father, router: data.router }]
      } else {
        state.tagsList = [{ name: data.name, father: data.father, router: data.router }]
      }
      localStorage.setItem('tagsList', JSON.stringify(state.tagsList))
    }
  },
  // 修改标签状态
  setTagsState (state, n) {
    state.tagsState = n
  },
  // 删除单个导航标签
  removeTagsList (state, n) {
    state.tagsList.splice(n, 1)
    localStorage.setItem('tagsList', JSON.stringify(state.tagsList))
  },
  // 删除全部导航标签
  removeAllTagsList (state) {
    state.tagsList = []
    localStorage.setItem('tagsList', JSON.stringify(state.tagsList))
    router.push('/home')
  },
  // 删除其他仅留一个导航标签
  removeOnlyTagsList (state, route) {
    state.tagsList.some(({ router }, index) => {
      if (router === route) {
        state.tagsList = [JSON.parse(JSON.stringify(state.tagsList[index]))]
        localStorage.setItem('tagsList', JSON.stringify(state.tagsList))
      }
    })
  }
}
export default mutations
