import axios from 'axios'
import config from './../config.js'

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
        context.commit('setListaVentas', [])
      }
      context.dispatch('getLoadingApp', false);
    },
   
  }
}
