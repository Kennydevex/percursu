// jshint esversion:6
export default ({
  strict: true,
  state: {
    roles: [],
  },

  getters: {
    roles(state) {
      return state.roles;
    },
  },

  mutations: {
    updateRoles(state, payload) {
      state.roles = payload;
    },
  },

  actions: {
    getRoles(context) {
      axios.get('/api/v1/system/roles').then(function (response) {
        context.commit('updateRoles', response.data.data);
      });
    },
  }
});
