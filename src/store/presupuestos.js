import axios from 'axios'
import config from './../config.js'
import { Notification } from 'element-ui'

export default {
  state: {
    listaPresupuestos: [],
  },
  mutations: {
    setListaPresupuestos: (state, value) => {
      state.listaPresupuestos = value
    },
  },
  getters: {
    getListaPresupuestos: (state) => {
      return state.listaPresupuestos
    },
  },
  actions: {
    async listaPresupuestos(context, payload = { id: String }) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/presupuesto',
          headers: {
            ['auth-token']: token,
          },
          data: payload,
        });
        context.commit('setListaPresupuestos', resultado.data)
      } catch (error) {
        if (error.response) {
          Notification({
            title: config.frontend.title,
            message: error,
            type: 'error'
          })
        } else {
          Notification({
            title: config.frontend.title,
            message: 'Error al acceder a internet',
            type: 'error'
          })
        }
        context.commit('setListaPresupuestos', [])
      }
      context.dispatch('getLoadingApp', false);
    },

  }
}
