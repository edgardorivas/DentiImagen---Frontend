import axios from 'axios'
import config from './../config.js'

export default {
  state: {
    proveedores: [],
    detalleProveedoresId: null,
  },
  mutations: {
    setProveedores: (state, value) => {
      state.proveedores = value
    },
    setDetalleProveedoresId: (state, value) => {
      state.detalleProveedoresId = value
    },
  },
  getters: {
    getProveedores: (state) => {
      return state.proveedores
    },
    getDetalleProveedoresId: (state) => {
      return state.detalleProveedoresId
    }
  },
  actions: {
    async obtenerListaDeProveedores (context) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/provedor',
          headers: {
            ['auth-token']: token,
          }
        });
        context.commit('setProveedores', resultado.data)
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
        context.commit('setProveedores', [])
      }
      context.dispatch('getLoadingApp', false);
    },
    async obtenerDetalleProveedor (context, payload = { id: String }) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'POST',
          baseURL: config.backend.baseURL,
          url: '/provedor/filtro',
          headers: {
            ['auth-token']: token,
          },
          data: payload,
        });
        context.commit('setDetalleProveedoresId', resultado.data)
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
        context.commit('setDetalleProveedoresId', [])
      }
      context.dispatch('getLoadingApp', false);
    },
  }
}
