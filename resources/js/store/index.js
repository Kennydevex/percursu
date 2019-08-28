// jshint esversion:6
import Vue from 'vue';
import Vuex from 'vuex';
// =======================Modules=============================
//Sys
import users from './modules/sys/Users';
import permissions from './modules/sys/Permissions';
import roles from './modules/sys/Roles';

//Auth
import authentication from './modules/auth/Authentication';

//Percursu
import charges from './modules/percursu/Charges';
import partners from './modules/percursu/Partners';
import companies from './modules/percursu/Companies';

// CMS
import posts from './modules/cms/Posts';
import tags from './modules/cms/Tags';

// Helpers
import folks from './modules/helpers/Folks';
import entities from './modules/helpers/Entities';
import categories from './modules/helpers/Categories';

Vue.use(Vuex);
export default new Vuex.Store({
    strict: true,
    modules: {
        authentication,
        roles,
        permissions,
        users,
        charges,
        partners,
        companies,
        posts,
        tags,
        folks,
        entities,
        categories,
    },
});
