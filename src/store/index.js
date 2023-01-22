import Vue from 'vue'
import Vuex from 'vuex'

import loading from './loading';
import usuarios from './usuarios';
import productos from './productos';
import tipoProducto from './tipoProducto';
import proveedores from './proveedores';
import materialesProveedor from './compra';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loading,
    usuarios,
    productos,
    tipoProducto,
    proveedores,
    materialesProveedor
  }
})
