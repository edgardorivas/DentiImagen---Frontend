import axios from 'axios'
import config from './../config.js'
import { Notification } from 'element-ui'

export default {
  state: {
    producto: [],
    servicios: [],
    detalleProductoId: null,
    tipoMaterial: [],
  },
  mutations: {
    setProducto: (state, value) => {
      state.producto = value
    },
    setDetalleProductoId: (state, value) => {
      state.detalleProductoId = value
    },
    setTipoMaterial: (state, value) => {
      state.tipoMaterial = value
    },
    setServicios: (state, value) => {
      state.servicios = value
    },
  },
  getters: {
    getproducto: (state) => {
      return state.producto
    },
    getDetalleProductoId: (state) => {
      return state.detalleProductoId
    },
    getTipoMaterial: (state) => {
      return state.tipoMaterial
    },
    getServicios: (state) => {
      return state.servicios
    },
  },
  actions: {
    async obtenerListaDeproducto (context) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/recurso',
          headers: {
            ['auth-token']: token,
          }
        });
        context.commit('setProducto', resultado.data)
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
        context.commit('setProducto', [])
      }
      context.dispatch('getLoadingApp', false);
    },
    async obtenerListaDeServicios (context) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/recurso/servicios',
          headers: {
            ['auth-token']: token,
          }
        });
        context.commit('setServicios', resultado.data)
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
        context.commit('setServicios', [])
      }
      context.dispatch('getLoadingApp', false);
    },
    async obtenerDetalleProducto (context, payload = { id: String }) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'POST',
          baseURL: config.backend.baseURL,
          url: '/recurso/filtro',
          headers: {
            ['auth-token']: token,
          },
          data: payload,
        });
        context.commit('setDetalleProductoId', resultado.data)
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
        context.commit('setdetalleProductoId', [])
      }
      context.dispatch('getLoadingApp', false);
    },
    async obtenerTipoProducto (context) {
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
        context.commit('setTipoMaterial', resultado.data)
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
        context.commit('setTipoMaterial', [])
      }
      context.dispatch('getLoadingApp', false);
    },
  }
}
