import axios from 'axios'
import config from '../config.js'
import { Notification } from 'element-ui'
//trabajadorOdontologo
export default {
  state: {
    pacientes: [],
    paciente: {},
    usuariosOdontologicos:[]
  },
  mutations: {
    setPacientes: (state, value) => {
      state.pacientes = value
    },
    setPaciente: (state, value) => {
      state.paciente = value
    },
    setUsuariosOdontologicos: (state, value) => {
      state.usuariosOdontologicos = value
    }
  },
  getters: {
    getPacientes: (state) => {
      return state.pacientes
    },
    getPaciente: (state) => {
      return state.paciente
    },
    getUsuariosOdontologicos: (state) => {
      return state.usuariosOdontologicos
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
          Notification({
            title: config.frontend.title,
            message: error.response.data.mensaje,
            type: 'warning'
          })
        } else {
          Notification({
            title: config.frontend.title,
            message: 'Error al acceder a internet',
            type: 'error'
          })
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
    },
    async obtenerListaDeTrabajadoresRol (context) {
      const token = localStorage.getItem('token_acess')
      context.dispatch('getLoadingApp', true);
      try {
        const resultado = await axios({
          method: 'GET',
          baseURL: config.backend.baseURL,
          url: '/trabajadorRol',
          headers: {
            ['auth-token']: token,
          }
        });

        context.commit('setUsuariosOdontologicos', resultado.data)
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
        context.commit('setUsuariosOdontologicos', [])
      }
      context.dispatch('getLoadingApp', false);
    },
  }
}
