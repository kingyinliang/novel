export default{
  state: {
    commentid: 0,
    comment: {}
  },
  mutations: {
    saveCommentid (state, msg) {
      state.commentid = msg.review_code
      state.comment = msg
    }
  },
  actions: {
    setCommentid ({commit}, msg) {
      commit('saveCommentid', msg)
    }
  }
}
