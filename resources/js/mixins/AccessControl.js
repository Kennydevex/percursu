
// jshint esversion:6
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const Permissions = {
  data: () => ({
    permissions: [],
  }),

  computed: {
    authUser: function () {
      return this.$store.getters.authUser;
    },
  },

  created: function () {
    this.setUserPermissions();
  },

  methods: {

    setUserPermissions() {
      if (!this.authUser) {
        return;
      }
      this.authUser.permissions.forEach(function (permissions) {
        console.log('testeteet');
        
        this.permissions.push(permissions.name);
      });
    },

    $can(permissionName) {
      return this.permissions.indexOf(permissionName) !== -1;
    },
  },
};
