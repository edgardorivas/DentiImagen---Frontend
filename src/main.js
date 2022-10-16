import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* Importaciones de archivos o librerias css */
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/dist/js/bootstrap'
import './assets/css/style.css'
import './assets/scss/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
