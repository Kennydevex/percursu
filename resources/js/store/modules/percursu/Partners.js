export default ({
  strict: true,
  state: {
    partners: [],
  },

  getters: {
    partners(state) {
      return state.partners
    },
  },

  mutations: {
    updatePartners(state, payload) {
      state.partners = payload
    },
  },

  actions: {
    getPartners(context) {
      axios.get('/api/v1/percursu/partners').then(function(response) {
        context.commit('updatePartners', response.data.data)
      })
    },
  }
})
