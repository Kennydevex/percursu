require('./bootstrap')
import '@mdi/font/css/materialdesignicons.css' 
import Vue from 'vue'
import vuetify from 'vuetify'
import App from '@compts/App.vue'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import store from './store'
import 'babel-polyfill'
import colors from 'vuetify/es5/util/colors'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

Vue.use(VueAwesomeSwiper)
import 'swiper/dist/css/swiper.css'

Vue.use(vuetify, {
    iconfont: 'mdi',
    theme: {
        primary: colors.cyan.darken4,
        secondary: colors.cyan.lighten1,
        success: colors.green.darken3,
        // warning: colors.deep-orange.lighten4,
        accent: colors.indigo.base
  }
})

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#_app')

