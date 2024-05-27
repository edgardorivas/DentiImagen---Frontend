<template>
  <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 xl:mb-0 px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div class="rounded-t mb-0 px-4 py-3 border-0">
                  <div class="flex flex-wrap items-center">
                      <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 class="font-semibold text-base text-blueGray-700">
                              Historial de movimientos
                          </h3>
                      </div>
                  </div>
              </div>
              <!-- <div v-if="inventario && inventario.data"
                  class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button v-on:click="openNewTab"
                      class="bg-red-600 text-white active:bg-indigo-600 text-xs font-bold uppercase px-8 py-1 rounded outline-none focus:outline-none mr-8 mb-1 ease-linear transition-all duration-150"
                      type="button">
                      PDF
                  </button>
              </div> -->
              <div v-if="obteneHistorial && obteneHistorial.data">

                  <div class="mt-5">
                      <div>
                          <template>
                              <template class="relative h-32 w-32 ">
                                  <el-input v-model="search" class="h-1/6 w-2/12 ml-10" placeholder="Buscar" />
                              </template>

                              <el-table class="p-10 "
                                  :data="obteneHistorial.data.filter(data => !search || data.nombre_usuario.toLowerCase().includes(search.toLowerCase())||data.nombre_accion.toLowerCase().includes(search.toLowerCase())|| data.nombre_trabajador.toLowerCase().includes(search.toLowerCase()) || data.fecha_auditoria.toLowerCase().includes(search.toLowerCase()))"
                                  style="width: 100%">

                                  <el-table-column type="expand" >

                                      <template slot-scope="scope">
                                        <div  class="mx-20 bg-slate-200" v-for="(item) in obteneHistorial.data" :key="item.id_servicio">

                                          <div v-if="item.id == scope.row.id" >
                                            <label  class="w-6/12" >
                                              <p class="">Telefono trabajador: {{ item.telefono_trabajador }}</p>
                                              <p class="">Descripcion: {{ item.descripcion }}</p>
                                              <span class="text-right"  role="textbox" >Datos:{{ item.datos }}</span>
                                            </label>

                                          </div>

                                        </div>
                                      </template>

                                    </el-table-column>

                                  <el-table-column prop="informacion" label="Titulo"></el-table-column>
                                  <el-table-column prop="fecha_auditoria" label="Fecha"></el-table-column>
                                  <el-table-column prop="nombre_accion" label="Accion"></el-table-column>
                                  <el-table-column prop="nombre_usuario" label="Usuario"></el-table-column>
                                  <el-table-column prop="nombre_trabajador" label="Trabajador"></el-table-column>
                                  <el-table-column prop="apellido_trabajador" label="Apellido"></el-table-column>
                              </el-table>

                              <el-pagination class="text-center my-5"
                                layout="prev, pager, next"
                                @current-change="pasarLote"
                                :total='obteneHistorial.dataExtra'>
                              </el-pagination>
                          </template>

                          <!-- Modales de busqueda -->
                          <el-drawer title="Busqueda Avanzada" :visible.sync="modal" direction="rtl"
                              :before-close="handleClose">
                              <form class="h-full" @submit.prevent="aplicarFiltro">
                                  <div class="flex flex-col content-between justify-between h-full">
                                      <div class="flex flex-col">
                                     </div>
                                      <div>
                                          <button
                                              class="w-full bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2"
                                              type="submit">Buscar</button>
                                      </div>
                                  </div>
                              </form>
                          </el-drawer>
                      </div>
                  </div>
              </div>
              <div v-else class=" w-1/2 sm:ml-32 md:ml-36 lg:ml-96 mb-20">
                  <div class=" flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="warning">
                      <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                          viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clip-rule="evenodd"></path>
                      </svg>
                      <span class="sr-only">warning</span>
                      <div>
                          <span class="font-medium">No existen items ingresados en el inventario</span>
                          <ul class="mt-1.5 ml-4 list-disc list-inside">
                              <li>Se recomienda ingresar los materiales pertenecientes a la clinica odontologica</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import config from '../../../config';
export default {
  name: 'users-list',
  metaInfo: {
      title: config.frontend.title,
      titleTemplate: '%s | Lista de Usuarios',
  },
  created() {
      // this.$store.dispatch('obtenerListaDeUsuarios')
      this.$store.dispatch('obtenerInventario');
      this.$store.dispatch('obteneHistorial');
  },
  data() {
      return {
          modal: false,
          bloqueado: false,
          search: '',
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
          this.$store.dispatch('obtenerDetalleUsuario', this.search);
      },
      openNewTab() {
          window.open(this.url, '_blank');
      },
      async pasarLote(lote){
        console.log(lote)
        this.$store.dispatch("obteneHistorial",lote-1)
      },
    //   tableRowClassName({row, rowIndex}) {
    //     console.log('====================')
    //     console.log({row})
    //     console.log({rowIndex})
    //     const resta = row.disponible - row.minimo
    //     if(resta <= 10 && resta >= 8 ){
    //       return 'warning-row';

    //     }
    //     if(resta <= 7 && resta >= 4){
    //       return 'naranja-row';

    //     }
    //     if(resta <= 3 && resta >= 1){
    //       return 'red-row';

    //     }
    //     if(resta <=0){
    //       return 'nada-row';
    //     }

    //   return 'blue-row';
    // }
  },
  computed: {
      inventario() {
          return this.$store.getters.getInventario;
      },
      obteneHistorial() {
          return this.$store.getters.getAuditoria;
      },

  }
}
</script>
<style lang="scss">
.el-date-editor {
  width: 100% !important;
}
.el-table .warning-row {
  background: rgb(237, 230, 218);
}
.el-table .blue-row {
  background: rgb(215, 243, 228);
}

.el-table .red-row {
  background: #fa6e6e;
  color: #ffffff;
}

.el-table .naranja-row {
  background: #ffc07d;
}
.el-table .nada-row {
  background: #cfcfcf;
}
</style>
