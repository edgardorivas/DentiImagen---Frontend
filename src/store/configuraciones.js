import axios from 'axios'
import config from '../config.js'
import { Notification } from 'element-ui'

export default {
  state: {
    precioDolarFecha: [],
    notificaciones: null,
  },
  mutations: {
    setPrecioDolarFecha: (state, value) => {
      state.precioDolarFecha = value
    },
    setNotificaciones: (state, value) => {
      state.notificaciones = value
    },
  },
  getters: {
    getPrecioDolarFecha: (state) => {
      return state.precioDolarFecha
    },
    getNotificaciones: (state) => {
      return state.notificaciones
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
    async obtenerNotificaciones (context) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/notificaciones',
          headers: {
            ['auth-token']: token,
          }
        });

        context.commit('setNotificaciones', resultado.data)
      } catch (error) {
        if (error.response) {
          context.dispatch('setNotificaciones', null);

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
