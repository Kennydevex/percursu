// jshint esversion:6
require('./bootstrap');
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify';
import pt from 'vee-validate/dist/locale/pt_PT'
import VeeValidate, { Validator } from 'vee-validate';
import App from '@compts/App.vue';
import 'vuetify/dist/vuetify.min.css';
import router from './router';
import store from './store';
import 'babel-polyfill';
import colors from 'vuetify/es5/util/colors';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueSweetalert2 from 'vue-sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { init } from '@helpers/init';
AOS.init();

// if (process.env.MIX_APP_ENV === 'production') {
//     Vue.config.devtools = false;
//     Vue.config.debug = false;
//     Vue.config.silent = true;
// }



Vue.use(VueAwesomeSwiper);
import 'swiper/dist/css/swiper.css';

Validator.localize('pt', pt);

Vue.use(Vuetify);
const opts ={
    iconfont: 'fas',
    theme: {
        primary: colors.cyan.darken4,
        secondary: colors.cyan.lighten1,
        success: colors.green.darken3,
        accent: colors.indigo.base
    }
};


Vue.use(VueSweetalert2, { confirmButtonColor: '#004D40', cancelButtonColor: '##C62828' });

Vue.use(VeeValidate);

// General mixins
Vue.mixin({
    computed: {
        authUser: function () { return this.$store.getters.authUser; }
    },
});

init(store, router);
const app = new Vue({
    vuetify: new Vuetify(opts),
    router,
    store,
    render: h => h(App)
}).$mount('#_app');

