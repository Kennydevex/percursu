// jshint esversion:6
export default ({
  strict: true,
  state: {
    companies: [],
  },

  getters: {
    companies(state) {
      return state.companies;
    },
  },

  mutations: {
    updateCompanies(state, payload) {
      state.companies = payload;
    },
  },

  actions: {
    getCompanies(context) {
      axios.get('/api/v1/percursu/companies').then(function (response) {
        context.commit('updateCompanies', response.data.data);
      });
    },
  }
});
