// jshint esversion:6

export default ({
  strict: true,
  state: {
    entities: [],
  },

  getters: {
    entities(state) {
      return state.entities;
    },
  },

  mutations: {
    updateEntities(state, payload) {
      state.entities = payload;
    },
  },

  actions: {
    getEntities(context) {
      axios.get('/api/v1/helpers/entities').then(function (response) {
        context.commit('updateEntities', response.data.data);
      });
    },
  }
});
