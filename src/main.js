import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import meta from 'vue-meta'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es';
import HighchartsVue from 'highcharts-vue'

/* Importaciones de archivos o librerias css */
import 'element-ui/lib/theme-chalk/index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/css/style.css'
import './assets/scss/index.scss'

Vue.config.productionTip = false

Vue.use(meta)
Vue.use(HighchartsVue)
Vue.use(ElementUI, {
  locale
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
