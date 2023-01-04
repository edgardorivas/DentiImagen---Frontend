<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 xl:mb-0 px-4">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-blueGray-700">
                  Lista de Tipos de Materia
                </h3>
              </div>
              <div
                class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
              >
                <router-link to="/admin/tipo-materiales/agregar" class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ">
                  Agregar nuevo
                </router-link>
              </div>
            </div>
          </div>
          <!--
          <div class="px-5 mt-3 flex justify-start">
            <button @click="modal = true" class="bg-verdiAnderson text-white py-2 px-3 rounded-md uppercase">
              Busqueda Avanzada
            </button>
          </div> 
          -->
          <div class="mt-5">
            
              <div v-if="tipoProducto && tipoProducto.data">
              <el-table :data="tipoProducto.data" class="w-full">
                <el-table-column fixed prop="nombre_tipo_recurso" label="Nombre" width="190">
                  <template slot-scope="scope">
                    <router-link :to="`/admin/tipo-materiales/${scope.row.id_tipo_recurso}`" class="uppercase text-verdiAnderson">
                      @{{scope.row.nombre_tipo_recurso}}
                    </router-link>
                  </template>
                </el-table-column>
                
                <el-table-column prop="descripcion_tipo_recurso" label="Descripcion"></el-table-column>
                
                <el-table-column
                  fixed="right"
                  label="Operaciones"
                  width="170">
                  <template slot-scope="scope">
                    <p class="text-center">
                      <router-link :to="`/admin/tipo-materiales/${scope.row.id_tipo_recurso}`" class="text-verdiAnderson text-xs w-full">
                        Editar
                      </router-link>
                    </p>
                  </template>
                </el-table-column>
              </el-table>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
    import config from '../../../../config';
    export default {
      name: 'typeProduct',
      metaInfo: {
        title: config.frontend.title,
        titleTemplate: '%s | Lista de tipos de Materia',
      },
      created() {
        this.aplicarFiltro();
      }, 
        data() {
        return {
          modal: false,
          search: {
            nombre: "",
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
          this.$store.dispatch('obtenerListaDeTipoProducto');
        }
      },
      computed: {
        tipoProducto () {
          return this.$store.getters.getTipoProducto;
        },
      }
    }
  </script>
  <style lang="scss">
    .el-date-editor {
      width: 100% !important;
    }
  </style>
  