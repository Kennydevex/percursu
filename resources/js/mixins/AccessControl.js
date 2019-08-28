
// jshint esversion:6

export const Permissions = {
  data: () => ({
    permissions: [],
  }),

  computed: {
    authUser: function () {
      return this.store.getters.authUser;
    },
  },

  created: function () {
    this.setUserPermissions();
  },

  methods: {

    setUserPermissions() {
      let mthis = this;
      if (!this.authUser) {
        return;
      }
      this.authUser.permissions.forEach(function (permissions) {
        mthis.permissions.push(permissions.name);
      });
    },

    $can(permissionName) {
      return this.permissions.indexOf(permissionName) !== -1;
    },
  },
};
