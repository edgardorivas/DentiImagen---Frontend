import axios from 'axios'
import config from './../config.js'

export default {
  state: {
    materialesProveedor: null,
  },
  mutations: {
    setMaterialesProveedor: (state, value) => {
      state.materialesProveedor = value
    },
  },
  getters: {
    getMaterialesProveedor: (state) => {
      return state.materialesProveedor
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
   
  }
}
