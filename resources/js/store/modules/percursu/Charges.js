export default ({
  strict: true,
  state: {
    charges: [],
  },

  getters: {
    charges(state) {
      return state.charges
    },
  },

  mutations: {
    updateCharges(state, payload) {
      state.charges = payload
    },
  },

  actions: {
    getCharges(context) {
      axios.get('/api/v1/percursu/charges').then(function(response) {
        context.commit('updateCharges', response.data.data)
      })
    },
  }
})
