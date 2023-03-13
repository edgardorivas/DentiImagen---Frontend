import axios from 'axios'
import config from '../config.js'
import { Notification } from 'element-ui'

export default {
  state: {
    pacientes: [],
    paciente: {},
  },
  mutations: {
    setPacientes: (state, value) => {
      state.pacientes = value
    },
    setPaciente: (state, value) => {
      state.paciente = value
    }
  },
  getters: {
    getPacientes: (state) => {
      return state.pacientes
    },
    getPaciente: (state) => {
      return state.paciente
    }
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
    async obtenerPacienteId ({dispatch, commit}, payload = { id: String }) {
      const token = localStorage.getItem('token_acess')
      dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'POST',
          baseURL: config.backend.baseURL,
          url: '/paciente/filtro',
          headers: {
            ['auth-token']: token,
          },
          data: payload,
        });
        if (resultado.data.data.length) {
          commit('setPaciente', resultado.data.data[0])
        } else {
          commit('setPaciente', null)
        }
      } catch (error) {
        if (error.response) {
          Notification({
            title: config.frontend.title,
            message: error,
            type: 'error'
          })
        } else {
          Notification({
            title: config.frontend.title,
            message: 'Error al acceder a internet',
            type: 'error'
          })
        }
        commit('setPaciente', null)
      }
      dispatch('getLoadingApp', false);
    }
  }
}
