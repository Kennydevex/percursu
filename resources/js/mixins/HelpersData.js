// jshint esversion:6
export const getChargesDatas = {
    methods: {
        getCharges: function () {
            if (this.charges.length) { return; }
            this.getUpdatedCharges();
        },
        getUpdatedCharges: function () { this.$store.dispatch('getCharges'); },
    },
    computed: {
        charges: function () { return this.$store.getters.charges; }
    },
};

export const getPartnersDatas = {
    computed: {
        partners: function () { return this.$store.getters.partners; },
        activedPartners: function () { return this.$store.getters.activedPartners; }
    },
    methods: {
        getPartners: function () {
            if (this.partners.length) { return; }
            this.getUpdatedPartners();
        },
        getUpdatedPartners: function () { this.$store.dispatch('getPartners'); },

        getActivedPartners: function () {
            if (this.activedPartners.length) { return; }
            this.getUpdatedActivedPartners();
        },
        getUpdatedActivedPartners: function () { this.$store.dispatch('getActivedPartners'); },
    },
};

export const getUsersDatas = {
    methods: {
        getUsers: function () { if (this.users.length) { return; } this.getUpdatedUsers(); },
        getUpdatedUsers: function () { this.$store.dispatch('getUsers'); },
    },
    computed: {
        users: function () { return this.$store.getters.users; }
    },
};

export const getRolesDatas = {
    methods: {
        getRoles: function () {
            if (this.roles.length) { return; }
            this.getUpdatedRoles();
        },
        getUpdatedRoles: function () { this.$store.dispatch('getRoles'); },
    },
    computed: {
        roles: function () { return this.$store.getters.roles; }
    },
};

export const getPermissionsDatas = {
    methods: {
        getPermissions: function () {
            if (this.permissions.length) { return; }
            this.getUpdatedPermissions();
        },
        getUpdatedPermissions: function () { this.$store.dispatch('getPermissions'); },
    },
    computed: {
        permissions: function () { return this.$store.getters.permissions; }
    },
};

//=============================================================
export const getPostsDatas = {
    methods: {
        getPosts: function () {
            if (this.posts.length) { return; }
            this.getUpdatedPosts();
        },
        getUpdatedPosts: function () { this.$store.dispatch('getPosts'); },
    },
    computed: {
        posts: function () { return this.$store.getters.posts; }
    },
};

export const getTagsDatas = {
    methods: {
        getTags: function () {
            if (this.tags.length) { return; }
            this.getUpdatedTags();
        },
        getUpdatedTags: function () { this.$store.dispatch('getTags'); },
    },
    computed: {
        tags: function () { return this.$store.getters.tags; }
    },
};

export const getCategoriesDatas = {
    methods: {
        getCategories: function () {
            if (this.categories.length) { return; }
            this.getUpdatedCategories();
        },
        getUpdatedCategories: function () { this.$store.dispatch('getCategories'); },
    },
    computed: {
        categories: function () { return this.$store.getters.categories; }
    },
};

export const getCompaniesDatas = {
    methods: {
        getCompanies: function () {
            if (this.companies.length) { return; }
            this.getUpdatedCompanies();
        },
        getUpdatedCompanies: function () { this.$store.dispatch('getCompanies'); },
    },
    computed: {
        companies: function () { return this.$store.getters.companies; }
    },
};



