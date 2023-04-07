import axios from 'axios'
import config from '../config.js'
import { Notification } from 'element-ui'

export default {
  state: {
    inventario: [],
  },
  mutations: {
    setInventario: (state, value) => {
      state.inventario = value
    },
  },
  getters: {
    getInventario: (state) => {
      return state.inventario
    },
  },
  actions: {
    async obtenerInventario (context) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/inventario',
          headers: {
            ['auth-token']: token,
          }
        });

        context.commit('setInventario', resultado.data)
      } catch (error) {
        if (error.response) {
          Notification({
            title: config.frontend.title,
            message: error.response.data.mensaje,
            type: 'warning'
          })
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
