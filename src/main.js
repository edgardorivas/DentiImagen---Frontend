import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import meta from 'vue-meta'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es';

/* Importaciones de archivos o librerias css */
// import 'bootstrap/dist/css/bootstrap.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/dist/js/bootstrap'
import './assets/css/style.css'
import './assets/scss/index.scss'

Vue.config.productionTip = false

Vue.use(meta)
Vue.use(ElementUI, {
  locale
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
