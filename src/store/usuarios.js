import axios from 'axios'
import config from './../config.js'

export default {
  state: {
    usuarios: [],
    detalleUsuarioId: null,
    nivelesUsuarios: null,
  },
  mutations: {
    setusuarios: (state, value) => {
      state.usuarios = value
    },
    setdetalleUsuarioId: (state, value) => {
      state.detalleUsuarioId = value
    },
    setnivelesUsuarios: (state, value) => {
      state.nivelesUsuarios = value
    },
  },
  getters: {
    getusuarios: (state) => {
      return state.usuarios
    },
    getdetalleUsuarioId: (state) => {
      return state.detalleUsuarioId
    },
    getnivelesUsuarios: (state) => {
      return state.nivelesUsuarios
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
        context.commit('setusuarios', [])
      }
      context.dispatch('getLoadingApp', false);
    },
    async obtenerDetalleUsuario (context, payload = { id: String }) {
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
          data: payload,
        });
        context.commit('setdetalleUsuarioId', resultado.data)
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
        context.commit('setdetalleUsuarioId', [])
      }
      context.dispatch('getLoadingApp', false);
    },
    async obtenerRoles (context) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/nivel-usuario',
          headers: {
            ['auth-token']: token,
          },
        });
        context.commit('setnivelesUsuarios', resultado.data)
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
        context.commit('setnivelesUsuarios', [])
      }
      context.dispatch('getLoadingApp', false);
    },
  }
}
