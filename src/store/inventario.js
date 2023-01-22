import axios from 'axios'
import config from '../config.js'

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
        context.commit('setInventario', [])
      }
      context.dispatch('getLoadingApp', false);
    },
    
  }
}
