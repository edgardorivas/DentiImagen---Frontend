import axios from 'axios'
import config from '../config.js'
import { Notification } from 'element-ui'

export default {
  state: {
    notificacionesD: [],
  },
  mutations: {
    setNotificacionesD: (state, value) => {
      state.notificacionesD = value
    },
  },
  getters: {
    getNotificacionesD: (state) => {
      return state.notificacionesD
    },
  },
  actions: {
    async obtenerNotificacionesDetallada (context,lote=0) {
      console.log({lote})
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: `provedor-recurso/notificaciones/falta?lote=${lote}`,
          headers: {
            ['auth-token']: token,
          }
        });
        console.log({resultado})
        context.commit('setNotificacionesD', resultado.data)
      } catch (error) {
        if (error.response) {
          context.dispatch('getLoadingApp', false);

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
        context.commit('setNotificacionesD', [])
      }
      context.dispatch('getLoadingApp', false);
    },
  }
}
