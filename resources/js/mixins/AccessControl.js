// jshint esversion:6
import store from '../store';
export const acl = {
  data: () => ({
    userPermissions: [],
    userRoles: [],
  }),

  computed: {
    authUser: function () {
      return store.state.authentication.authUser;
    },
  },

  created: function () {
    this.setUserPermissions();
    this.setUserRoles();
  },

  methods: {
    setUserPermissions() {
      let mthis = this;
      if (!this.authUser) { return; }
      this.authUser.permissions.forEach(function (permission) {
        mthis.userPermissions.push(permission.name);
      });
    },

    setUserRoles() {
      let mthis = this;
      if (!this.authUser) { return; }
      this.authUser.roles.forEach(function (role) {
        mthis.userRoles.push(role.name);
      });
    },

    _can(permission) {
      return this.userPermissions.indexOf(permission) !== -1;
    },

    _is(role) {
      return this.userRoles.indexOf(role) !== -1;
    },
  },
};
