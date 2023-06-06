import axios from 'axios'
import config from '../config.js'
import { Notification } from 'element-ui'

export default {
  state: {
    precioDolarFecha: [],
  },
  mutations: {
    setPrecioDolarFecha: (state, value) => {
      state.precioDolarFecha = value
    },
  },
  getters: {
    getPrecioDolarFecha: (state) => {
      return state.precioDolarFecha
    },
  },
  actions: {
    async obtenerPrecioDolarBaseDatos (context) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/configuraciones/date',
          headers: {
            ['auth-token']: token,
          }
        });

        context.commit('setPrecioDolarFecha', resultado.data)
      } catch (error) {
        if (error.response) {
          context.dispatch('setPrecioDolarFecha', false);

          return false
          /*Notification({
            title: config.frontend.title,
            message: error.response.data.mensaje,
            type: 'warning'
          })*/
        } else {
          Notification({
            title: config.frontend.title,
            message: 'Error al acceder a internet',
            type: 'error'
          })
        }
        context.commit('setInventario', [])
      }
      context.dispatch('getLoadingApp', false);
    },
  }
}
