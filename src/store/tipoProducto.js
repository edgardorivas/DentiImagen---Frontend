import axios from 'axios'
import config from '../config.js'
import { Notification } from 'element-ui'

export default {
  state: {
    tipoProducto: [],
    detalleTipoProductoId: null,
  },
  mutations: {
    setTipoProducto: (state, value) => {
      state.tipoProducto = value
    },
    setDetalleTipoProductoId: (state, value) => {
      state.detalleTipoProductoId = value
    },
  },
  getters: {
    getTipoProducto: (state) => {
      return state.tipoProducto
    },
    getDetalleTipoProductoId: (state) => {
      return state.detalleTipoProductoId
    }
  },
  actions: {
    async obtenerListaDeTipoProducto (context) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/tipo-recurso',
          headers: {
            ['auth-token']: token,
          }
        });

        context.commit('setTipoProducto', resultado.data)
      } catch (error) {
        if (error.response) {
          return error.response.data
          /*Notification({
            title: config.frontend.title,
            message: error,
            type: 'error'
          })*/
        } else {
          Notification({
            title: config.frontend.title,
            message: 'Error al acceder a internet',
            type: 'error'
          })
        }
        context.commit('setTipoProducto', [])
      }
      context.dispatch('getLoadingApp', false);
    },
    async obtenerDetalleTipoProducto (context, payload = { id: String }) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'POST',
          baseURL: config.backend.baseURL,
          url: '/tipo-recurso/filtro',
          headers: {
            ['auth-token']: token,
          },
          data: payload,
        });

        context.commit('setDetalleTipoProductoId', resultado.data)
      } catch (error) {
        if (error.response) {
          return error.response.data
          /*Notification({
            title: config.frontend.title,
            message: error,
            type: 'error'
          })*/
        } else {
          Notification({
            title: config.frontend.title,
            message: 'Error al acceder a internet',
            type: 'error'
          })
        }
        context.commit('setDetalleTipoProductoId', [])
      }
      context.dispatch('getLoadingApp', false);
    }
  }
}
