import axios from 'axios'
import config from './../config.js'
import { Notification } from 'element-ui'

export default {
  state: {
    listaVentas:[],
  },
  mutations: {
    setListaVentas: (state, value) => {
      state.listaVentas = value
    },

  },
  getters: {
    getListaVentas: (state) => {
      return state.listaVentas
    },

  },
  actions: {
    async obtenerListaVentas(context, payload = { id: String }) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/venta',
          headers: {
            ['auth-token']: token,
          },
          data: payload,
        });
        context.commit('setListaVentas', resultado.data)
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
        context.commit('setListaVentas', [])
      }
      context.dispatch('getLoadingApp', false);
    },

  }
}
