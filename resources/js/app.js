// jshint esversion:6
require('./bootstrap');
import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuetify from 'vuetify';

import pt from 'vee-validate/dist/locale/pt_PT';
import VeeValidate, { Validator } from 'vee-validate';
import App from '@compts/App.vue';
import 'vuetify/dist/vuetify.min.css';
import router from './router';
import store from './store';
import 'babel-polyfill';
// import colors from 'vuetify/es5/util/colors';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueSweetalert2 from 'vue-sweetalert2';
import AOS from 'aos';
import 'animate.css'
import 'aos/dist/aos.css';
import { init } from '@helpers/init';
AOS.init();


import { acl } from '@mixins/AccessControl';


// if (process.env.MIX_APP_ENV === 'production') {
//     Vue.config.devtools = false;
//     Vue.config.debug = false;
//     Vue.config.silent = true;
// }



Vue.use(VueAwesomeSwiper);
import 'swiper/dist/css/swiper.css';

Validator.localize('pt', pt);

// Helpers
import colors from 'vuetify/es5/util/colors'
// import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
    theme: {
        primary1: colors.red.base,
        secondary: colors.red.base,
        accent: colors.red.base,
        error: colors.red.base
    }
});

Vue.use(VueSweetalert2, { confirmButtonColor: '#004D40', cancelButtonColor: '##C62828' });

Vue.use(VeeValidate);

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCQ9szMDr4OGjND9wjr3stqZpvcBWdJIlc',
        libraries: 'places',
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
    },
    installComponents: true
});

// General mixins
Vue.mixin({
    computed: {
        authUser: function () { return this.$store.getters.authUser; }
    },
});


Vue.mixin(acl);

init(store, router);
const app = new Vue({
    vuetify: new Vuetify(),
    router,
    store,
    render: h => h(App)
}).$mount('#_app');

