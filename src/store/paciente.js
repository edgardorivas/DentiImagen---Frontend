import axios from 'axios'
import config from '../config.js'

export default {
  state: {
    pacientes: [],
  },
  mutations: {
    setPacientes: (state, value) => {
      state.pacientes = value
    },
    
  },
  getters: {
    getPacientes: (state) => {
      return state.pacientes
    },
  },
  actions: {
    async obtenerListaDePacientes (context) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/paciente',
          headers: {
            ['auth-token']: token,
          }
        });
        
        context.commit('setPacientes', resultado.data)
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
        context.commit('setPacientes', [])
      }
      context.dispatch('getLoadingApp', false);
    },
    
  }
}
