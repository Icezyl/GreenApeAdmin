const getters = {
  getToken (state) {
    if (!state.token) {
      state.token = localStorage.getItem('token')
    }
    return state.token
  },
  getId (state) {
    if (!state.id) {
      state.id = localStorage.getItem('id')
    }
    if (!state.userName) {
      state.userName = localStorage.getItem('name')
      console.log(state.userName)
    }
  },
  getTagsList (state) {
    if (state.tagsList) {
      state.tagsList = [...JSON.parse(localStorage.getItem('tagsList'))]
    }
    return state.tagsList
  },
  getTagsState (state) {
    if (state.tagsState) {
      state.tagsList = localStorage.getItem('tagsState')
    }
    return state.tagsList
  }
}
export default getters
