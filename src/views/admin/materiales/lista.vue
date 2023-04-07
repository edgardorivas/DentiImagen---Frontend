<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 xl:mb-0 px-4">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-blueGray-700">
                  Lista de Materia
                </h3>
              </div>
              <div
                class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
              >
                <router-link to="/admin/materiales/agregar" class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ">
                  Agregar nuevo
                </router-link>
              </div>
            </div>
          </div>
          <div class="px-5 mt-3 flex justify-start">
            <button @click="modal = true" class="bg-verdiAnderson text-white py-2 px-3 rounded-md uppercase">
              Busqueda Avanzada
            </button>
          </div>
          <div class="mt-5">
            
            <div v-if="producto && producto.data">
              <el-table :data="producto.data"  class="w-full">
                
                <el-table-column fixed prop="nombre" label="Nombre" width="190">
                  <template slot-scope="scope">
                    <router-link :to="`/admin/materiales/${scope.row.id_recurso}`" class="uppercase text-verdiAnderson">
                      @{{scope.row.nombre}}
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="descripcion" label="Descripcion"></el-table-column>
                
                <el-table-column
                  fixed="right"
                  label="Operaciones"
                  width="170">
                  <template slot-scope="scope">
                    <p class="text-center">
                      <router-link :to="`/admin/materiales/${scope.row.id_recurso}`" class="text-verdiAnderson text-xs w-full">
                        Editar
                      </router-link>
                    </p>
                  </template>
                </el-table-column>
              </el-table>

              <!-- Modales de busqueda -->
              <el-drawer title="Busqueda Avanzada" :visible.sync="modal" direction="rtl" :before-close="handleClose">
                <form class="h-full" @submit.prevent="aplicarFiltro">
                  <div class="flex flex-col content-between justify-between h-full">
                    <div class="flex flex-col">
                      <!-- Contenido -->
                      <div class="w-full px-2 mb-3 py-1">
                        <label>
                          <p class="ml-1 mb-1">Nombre</p>
                          <el-input placeholder="Nombre del Trabajador" v-model="search.nombre"></el-input>
                        </label>
                      </div>
                      <div class="w-full px-2 mb-3 py-1">
                        <label>
                          <p class="ml-1 mb-1">Usuario</p>
                          <el-input placeholder="Usuario del Trabajador" v-model="search.usuario"></el-input>
                        </label>
                      </div>
                      <div class="w-full px-2 mb-3 py-1">
                        <label>
                          <p class="ml-1 mb-1">Especializacion</p>
                          <el-input placeholder="Especializacion del Trabajador" v-model="search.especializacion"></el-input>
                        </label>
                      </div>
                      <div class="w-full px-2 mb-3 py-1">
                        <label>
                          <p class="ml-1 mb-1">Fecha</p>
                          <el-date-picker v-model="search.fecha" type="date" placeholder="Selecciona una fecha"></el-date-picker>
                        </label>
                      </div>
                      <div v-if="nivelesUsuario && nivelesUsuario.data" class="w-full px-2 mb-3 py-1">
                        <label>
                          <p class="ml-1">Nivel / Rol</p>
                          <el-select v-model="search.nivel" placeholder="Nivel del trabajador" class="w-full">
                            <el-option label="Ninguno" :value="null"></el-option>
                            <el-option v-for="item in nivelesUsuario.data" :key="item.id_nivel_usuario" :label="item.nombre_nivel_usuario" :value="item.id_nivel_usuario"></el-option>
                          </el-select>
                        </label>
                      </div>
                      <!-- Fin del contenido -->
                    </div>
                    <div>
                      <button class="w-full bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2" type="submit">Buscar</button>
                    </div>
                  </div>
                </form>
              </el-drawer>
            </div>
            <div v-else>
              <h3 class="mb-3 ml-3">
                No hay registro de materiales
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
    import config from '../../../config';
    export default {
      name: 'product-list',
      metaInfo: {
        title: config.frontend.title,
        titleTemplate: '%s | Lista de Materia',
      },
      created() {
        // this.$store.dispatch('obtenerListaDeUsuarios')
        this.aplicarFiltro();
      },
      data() {
        return {
          modal: false,
          search: {
            nombre: "",
            usuario: "",
            fecha: "",
            especializacion: "",
            nivel: "",
          },
        }
      },
      methods: {
        parseDate(date) {
          return new Date(date).toLocaleString();
        },
        handleClose() {
          this.modal = false;
        },
        aplicarFiltro() {
          this.$store.dispatch('obtenerListaDeproducto');
        }
      },
      computed: {
        producto () {
           return this.$store.getters.getproducto;
        },
        productoid () {
          return this.$store.getters.getDetalleProductoId;
        },
        /*tipo () {
          return this.$store.getters.getTipoProducto;
        },*/
      }
    }
  </script>
  <style lang="scss">
    .el-date-editor {
      width: 100% !important;
    }
  </style>
  