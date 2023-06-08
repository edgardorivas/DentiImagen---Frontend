<template>
    <!-- se mejorara la presentacion de los recibos , y se mostraran como tajetas-->
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                    <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-blueGray-700">
                                Lista de Presupuestos
                            </h3>
                        </div>
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <router-link to="/admin/presupuesto/venta/agregar"
                                class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ">
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
                <div class="mt-3">
                    <div v-if="presupuesto && presupuesto.data">
                        <el-table :data="presupuesto.data" class="w-full">

                            <el-table-column fixed prop="paciente" label="Paciente" width="190">
                                <template slot-scope="scope">
                                    <router-link :to="`/admin/paciente/id/${scope.row.id_pacinte}`"
                                        class="uppercase text-verdiAnderson">
                                        @{{ scope.row.nombre_paciente }}
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="apellido_paciente" label="Apellido"></el-table-column>
                            <el-table-column prop="cedula_paciente" label="Cedula"></el-table-column>
                            <el-table-column prop="nombre_trabajador" label="Odontologo"></el-table-column>
                            <el-table-column prop="presio_dolar" label="Valor del dolar"></el-table-column>
                            <el-table-column prop="precio_total" label="Total de la compra"></el-table-column>

                            
                            <el-table-column prop="forma_pago" label="Forma de pago"></el-table-column>
                            
                            
                            <el-table-column prop="estado_compra" label="Estado">
                                <template slot-scope="scope">
                                    <el-tag
                                        class="text-sm p-2 pb-2"
                                        :type="scope.row.estado_compra == 'Pendiente' ? 'warning' : 'success'"
                                        disable-transitions>{{scope.row.estado_compra}}
                                    </el-tag>
                                </template>
                            </el-table-column>

                            <el-table-column prop="fecha" label="Creado">
                                <template slot-scope="scope">
                                    <p class="">{{ parseDate(scope.row.fecha_presupuesto) }}</p>
                                </template>
                            </el-table-column>


                            <el-table-column fixed="right" label="Operaciones" width="170">
                                <template slot-scope="scope">
                                    <p class="text-left">
                                        <router-link :to="`/admin/presupuesto/venta/detalles/${scope.row.id_presupuesto}`"
                                            class="text-red-600 text-xs w-full">
                                            <p class="text-sm">Ver detalles</p>
                                            
                                        </router-link>
                                    </p>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- Modales de busqueda
                      <el-drawer title="Busqueda Avanzada" :visible.sync="modal" direction="rtl"
                          :before-close="handleClose">
                          <form class="h-full" @submit.prevent="aplicarFiltro">
                              <div class="flex flex-col content-between justify-between h-full">
                                  <div class="flex flex-col">
                                       Contenido
                                      <div class="w-full px-2 mb-3 py-1">
                                          <label>
                                              <p class="ml-1 mb-1">Nombre</p>
                                              <el-input placeholder="Nombre del Trabajador"
                                                  v-model="search.nombre"></el-input>
                                          </label>
                                      </div>
                                      <div class="w-full px-2 mb-3 py-1">
                                          <label>
                                              <p class="ml-1 mb-1">Usuario</p>
                                              <el-input placeholder="Usuario del Trabajador"
                                                  v-model="search.usuario"></el-input>
                                          </label>
                                      </div>
                                      <div class="w-full px-2 mb-3 py-1">
                                          <label>
                                              <p class="ml-1 mb-1">Especializacion</p>
                                              <el-input placeholder="Especializacion del Trabajador"
                                                  v-model="search.especializacion"></el-input>
                                          </label>
                                      </div>
                                      <div class="w-full px-2 mb-3 py-1">
                                          <label>
                                              <p class="ml-1 mb-1">Fecha</p>
                                              <el-date-picker v-model="search.fecha" type="date"
                                                  placeholder="Selecciona una fecha"></el-date-picker>
                                          </label>
                                      </div>
                                      <div v-if="nivelesUsuario && nivelesUsuario.data" class="w-full px-2 mb-3 py-1">
                                          <label>
                                              <p class="ml-1">Nivel / Rol</p>
                                              <el-select v-model="search.nivel" placeholder="Nivel del trabajador"
                                                  class="w-full">
                                                  <el-option label="Ninguno" :value="null"></el-option>
                                                  <el-option v-for="item in nivelesUsuario.data"
                                                      :key="item.id_nivel_usuario" :label="item.nombre_nivel_usuario"
                                                      :value="item.id_nivel_usuario"></el-option>
                                              </el-select>
                                          </label>
                                      </div>
                                  </div>
                                  <div>
                                      <button
                                      class="w-full bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2"
                                      type="submit">Buscar</button>
                                  </div>
                              </div>
                          </form>
                      </el-drawer>
                      Fin del contenido -->
                    </div>
                    <div v-else class=" w-1/2 sm:ml-32 md:ml-36 lg:ml-96 mb-20">
                        <div class=" flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="warning">
                            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">warning</span>
                            <div>
                                <span class="font-medium">No se ha registrado ningun presupuesto</span>
                                <ul class="mt-1.5 ml-4 list-disc list-inside">
                                    <li>Se recomienda al usuario tener pacientes registrados previamente</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from '../../../../config';
export default {
    name: 'ventas-lista',
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: '%s | Lista de Usuarios',
    },
    created() {
        // this.$store.dispatch('obtenerListaDeUsuarios')
        this.$store.dispatch('listaPresupuestos');

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

    },
    computed: {
        // usuarios () {
        //   return this.$store.getters.getusuarios;
        // },
        presupuesto() {
            console.log(this.$store.getters.getListaPresupuestos);
            return this.$store.getters.getListaPresupuestos;
        }
    }
}
</script>
<style lang="scss">
.el-date-editor {
    width: 100% !important;
}
</style>
