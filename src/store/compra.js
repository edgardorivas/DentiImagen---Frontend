import axios from 'axios'
import config from './../config.js'

export default {
  state: {
    materialesProveedor: null,
    listaCompra:[],
  },
  mutations: {
    setMaterialesProveedor: (state, value) => {
      state.materialesProveedor = value
    },
    setListaCompra: (state, value) => {
      state.listaCompra = value
    },
  },
  getters: {
    getMaterialesProveedor: (state) => {
      return state.materialesProveedor
    },
    getListaCompra: (state) => {
      return state.listaCompra
    },
  },
  actions: {
    async obtenerMaterialesProveedor(context, payload = { id: String }) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'POST',
          baseURL: config.backend.baseURL,
          url: '/recurso/proveedor',
          headers: {
            ['auth-token']: token,
          },
          data: payload,
        });
        context.commit('setMaterialesProveedor', resultado.data)
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
        context.commit('setMaterialesProveedor', [])
      }
      context.dispatch('getLoadingApp', false);
    },



    async obtenerListaCompra(context, payload = { id: String }) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/compra',
          headers: {
            ['auth-token']: token,
          },
          data: payload,
        });
        context.commit('setListaCompra', resultado.data)
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
        context.commit('setListaCompra', [])
      }
      context.dispatch('getLoadingApp', false);
    },





   
  }
}
