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
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/usuario',
          headers: {
            ['auth-token']: token,
          }
        });
        context.commit('setusuarios', resultado.data)
      } catch (error) {
        if (error.response) {
          alert(error);
        }
        context.commit('setusuarios', [])
      }
      context.dispatch('getLoadingApp', false);
    }
  }
}
