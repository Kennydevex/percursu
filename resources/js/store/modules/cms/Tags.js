// jshint esversion:6

export default ({
  strict: true,
  state: {
    tags: [],
  },

  getters: {
    tags(state) {
      return state.tags;
    },
  },

  mutations: {
    updateTags(state, payload) {
      state.tags = payload;
    },
  },

  actions: {
    getTags(context) {
      axios.get('/api/v1/cms/tags').then(function (response) {
        context.commit('updateTags', response.data.data);
      });
    },
  }
});
