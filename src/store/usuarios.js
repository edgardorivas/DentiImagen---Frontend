import axios from 'axios'
import config from './../config.js'

export default {
  state: {
    usuarios: [],
  },
  mutations: {
    setusuarios: (state, value) => {
      state.usuarios = value
    }
  },
  getters: {
    getusuarios: (state) => {
      return state.usuarios
    }
  },
  actions: {
    async obtenerListaDeUsuarios (context) {
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/usuario',
        });
        console.log(resultado)
        context.commit('setusuarios', resultado.data)
      } catch (error) {
        console.log(error)
        if (error.response) {
          this.$message({
            message: error.response.data.mensaje || 'Sin mensaje del servidor',
            type: 'error',
          });
        } else {
          this.$message({
            message: 'No estas conectado a internet.',
            type: 'error'
          });
        }
        context.commit('setusuarios', [])
      }
      context.dispatch('getLoadingApp', false);
    }
  }
}
