import axios from 'axios'
import config from './../config.js'

export default {
  state: {
    producto: [],
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
          this.$message({
            message: error,
            type: 'error'
          });
        } else {
          this.$message({
            message: 'Error al acceder a internet',
            type: 'error'
          });
        }
        context.commit('setProducto', [])
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
          this.$message({
            message: error,
            type: 'error'
          });
        } else {
          this.$message({
            message: 'Error al acceder a internet',
            type: 'error'
          });
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
          this.$message({
            message: error,
            type: 'error'
          });
        } else {
          this.$message({
            message: 'Error al acceder a internet',
            type: 'error'
          });
        }
        context.commit('setTipoMaterial', [])
      }
      context.dispatch('getLoadingApp', false);
    },
  }
}
