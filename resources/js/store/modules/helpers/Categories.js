// jshint esversion:6

export default ({
  strict: true,
  state: {
    categories: [],
  },

  getters: {
    categories(state) {
      return state.categories;
    },
  },

  mutations: {
    updateCategories(state, payload) {
      state.categories = payload;
    },
  },

  actions: {
    getCategories(context) {
      axios.get('/api/v1/helpers/categories').then(function(response) {
        context.commit('updateCategories', response.data.data);
      });
    },
  }
});
