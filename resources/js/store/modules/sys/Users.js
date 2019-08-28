// jshint esversion:6
export default ({
  strict: true,
  state: {
    users: [],
  },

  getters: {
    users(state) {
      return state.users;
    },
  },

  mutations: {
    updateUsers(state, payload) {
      state.users = payload;
    },
  },

  actions: {
    getUsers(context) {
      axios.get('/api/v1/system/users').then(function(response) {
        context.commit('updateUsers', response.data.data);
      });
    },
  }
});
