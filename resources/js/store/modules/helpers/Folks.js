// jshint esversion:6

export default ({
  strict: true,
  state: {
    folks: [],
  },

  getters: {
    folks(state) {
      return state.folks;
    },
  },

  mutations: {
    updateFolks(state, payload) {
      state.folks = payload;
    },
  },

  actions: {
    getFolks(context) {
      axios.get('/api/v1/helpers/folks').then(function(response) {
        context.commit('updateFolks', response.data.data);
      });
    },
  }
});
