import Vue from 'vue'
import Vuex from 'vuex'

import loading from './loading';
import usuarios from './usuarios';
import productos from './productos';
import tipoProducto from './tipoProducto';
import proveedores from './proveedores';
import materialesProveedor from './compra';
import inventario from './inventario';
import pacientes from './paciente';
import venta from './venta';





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
    materialesProveedor,
    inventario,
    pacientes,
    venta
  }
})
