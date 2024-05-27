import axios from 'axios'
import config from '../config.js'
import { Notification } from 'element-ui'

export default {
  state: {
    auditoria: [],
  },
  mutations: {
    setAuditoria: (state, value) => {
      state.auditoria = value
    },
  },
  getters: {
    getAuditoria: (state) => {
      return state.auditoria
    },
  },
  actions: {
    async obteneHistorial (context,lote=0) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: `/auditoria?lote=${lote}`,
          headers: {
            ['auth-token']: token,
          }
        });

        context.commit('setAuditoria', resultado.data)
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
        context.commit('setAuditoria', [])
      }
      context.dispatch('getLoadingApp', false);
    },
  }
}
