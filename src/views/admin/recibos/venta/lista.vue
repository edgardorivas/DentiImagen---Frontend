<template>
    <!-- se mejorara la presentacion de los recibos , y se mostraran como tajetas-->
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                    <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-blueGray-700">
                                Lista de Recibos de Venta
                            </h3>
                        </div>
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <router-link to="/admin/recibo/venta/agregar"
                                class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ">
                                Agregar nuevo
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="mt-5">
                    <div v-if="Ventas && Ventas.data">

                        <template class="relative h-32 w-32 ">
                            <el-input v-model="search" class="h-1/6 w-2/12 ml-10" placeholder="Buscar" />
                        </template>

                        <el-table
                            :data="Ventas.data.filter(data => !search || data.nombre_paciente.toLowerCase().includes(search.toLowerCase()))"
                            class="w-full mt-10 ml-5">

                            <el-table-column fixed prop="paciente" label="Paciente">
                                <template slot-scope="scope">
                                    <router-link :to="`/admin/paciente/id/${scope.row.id_pacinte}`"
                                        class="uppercase text-verdiAnderson">
                                        @{{ scope.row.nombre_paciente }}
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="edad_paciente" label="Edad"></el-table-column>

                            <el-table-column prop="cedula_paciente" label="Cedula"></el-table-column>
                            <el-table-column prop="nombre_trabajador" label="Odontologo"></el-table-column>
                            <el-table-column prop="precio_total" label="total"></el-table-column>


                            <el-table-column prop="fecha" label="Fecha">
                                <template slot-scope="scope">
                                    <p class="">{{ parseDate(scope.row.fecha_venta) }}</p>
                                </template>
                            </el-table-column>

                            <el-table-column fixed="right" label="Operaciones" width="170">
                                <template slot-scope="scope">
                                    <p class="text-left">
                                        <router-link :to="`/admin/recibo/venta/detalles/${scope.row.id_venta}`"
                                            class="text-red-600 text-xs w-full">
                                            <p class="text-sm">Ver detalles</p>

                                        </router-link>
                                    </p>
                                </template>
                            </el-table-column>

                        </el-table>
                        <el-pagination class="text-center my-5"
                          layout="prev, pager, next"
                          @current-change="pasarLote"
                          :total='Ventas.dataExtra'>
                        </el-pagination>
                      </div>
                    <div v-else class=" w-1/2 sm:ml-32 md:ml-36 lg:ml-64 mb-20">

                        <div class=" flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="warning">
                            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">warning</span>
                            <div>
                                <span class="font-medium">No se ha registrado ninguna venta</span>
                                <ul class="mt-1.5 ml-4 list-disc list-inside">
                                    <li>Se recomienda al usuario tener pacientes registrados previamente</li>
                                    <li>Se recomienda tener odontologos y materiales registrados previamentes para poder
                                        registrar una venta</li>
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
        this.$store.dispatch('obtenerListaVentas');

    },
    data() {
        return {
            modal: false,
            search: "",
        }
    },
    methods: {
        parseDate(date) {
            return new Date(date).toLocaleString();
        },
        handleClose() {
            this.modal = false;
        },
        async pasarLote(lote){
          console.log(lote)
          this.$store.dispatch("obtenerListaVentas",lote-1)
        },

    },
    computed: {
        // usuarios () {
        //   return this.$store.getters.getusuarios;
        // },
        Ventas() {
            return this.$store.getters.getListaVentas;
        }
    }
}
</script>
<style lang="scss">
.el-date-editor {
    width: 100% !important;
}
</style>
