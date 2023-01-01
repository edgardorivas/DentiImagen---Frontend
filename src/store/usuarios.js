import axios from 'axios'
import config from './../config.js'

export default {
  state: {
    usuarios: [],
    detalleUsuarioId: null,
  },
  mutations: {
    setusuarios: (state, value) => {
      state.usuarios = value
    },
    setdetalleUsuarioId: (state, value) => {
      state.detalleUsuarioId = value
    },
  },
  getters: {
    getusuarios: (state) => {
      return state.usuarios
    },
    getdetalleUsuarioId: (state) => {
      return state.detalleUsuarioId
    },
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
    },
    async obtenerDetalleUsuario (context, userId) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'POST',
          baseURL: config.backend.baseURL,
          url: '/usuario/buscar',
          headers: {
            ['auth-token']: token,
          },
          data: {
            id: userId
          }
        });
        context.commit('setdetalleUsuarioId', resultado.data)
      } catch (error) {
        if (error.response) {
          alert(error);
        }
        context.commit('setdetalleUsuarioId', [])
      }
      context.dispatch('getLoadingApp', false);
    },
  }
}
