<template>
    <!-- se mejorara la presentacion de los recibos , y se mostraran como tajetas-->
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                    <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-blueGray-700">
                                Lista de Recibos de Compra
                            </h3>
                        </div>
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <router-link to="/admin/recibo/compra/agregar"
                                class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ">
                                Agregar nuevo
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="mt-5 ">
                    <div v-if="compras && compras.data">
                        <!--tabla-->
                        <template class="relative h-32 w-32 ">
                            <el-input v-model="search" class="h-1/6 w-2/12 ml-10" placeholder="Buscar" />
                        </template>

                        <el-table :data="compras.data.filter(data => !search ||
                            data.nombre_trabajador.toLowerCase().includes(search.toLowerCase()) ||
                            data.nombre_proveedor.toLowerCase().includes(search.toLowerCase()))" class="w-full p-10">

                            <el-table-column prop="usuario" label="Usuario">
                                <template slot-scope="scope">
                                    <router-link :to="`/admin/usuarios/${scope.row.id_trabajador}`"
                                        class="uppercase text-verdiAnderson">
                                        @{{ scope.row.nombre_trabajador }}
                                    </router-link>
                                </template>
                            </el-table-column>

                            <el-table-column prop="telefono_trabajador" label="movil del Usuario"></el-table-column>



                            <el-table-column prop="forma_pago" label="Pago"></el-table-column>
                            <el-table-column prop="nombre_proveedor" label="Proveedor">
                                <template slot-scope="scope">
                                    <router-link :to="`/admin/proveedores/${scope.row.id_proveedor}`"
                                        class="uppercase text-verdiAnderson">
                                        @{{ scope.row.nombre_proveedor }}
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="monto_total" label="Monto total"></el-table-column>

                            <el-table-column prop="referencias" label="Referencia">
                                <template slot-scope="scope">
                                    <el-tag class="text-sm p-2 pb-2"
                                        :type="scope.row.referencias == '--Sin referencia---' ? 'warning' : 'success'"
                                        disable-transitions>{{ scope.row.referencias }}
                                    </el-tag>
                                </template>
                            </el-table-column>

                            <el-table-column prop="fecha" label="Fecha">
                                <template slot-scope="scope">
                                    <p class="">{{ parseDate(scope.row.fecha_compra) }}</p>
                                </template>
                            </el-table-column>
                            <!--fin tabla-->

                            <el-table-column label="Opciones" width="170">
                                <template slot-scope="scope">
                                    <p class="text-left">
                                        <router-link :to="`/admin/recibo/compra/detalles/${scope.row.id_compra}`"
                                            class="text-red-600 text-xs w-full">
                                            <p class="text-sm">Detalles</p>

                                        </router-link>
                                    </p>
                                </template>
                            </el-table-column>
                        </el-table>
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
                                <span class="font-medium">No se ha registrado ninguna Compra</span>
                                <ul class="mt-1.5 ml-4 list-disc list-inside">
                                    <li>Se recomienda al usuario tener proveedores registrados previamente</li>
                                    <li>Se recomienda tener tipos de materiales y materiales registrados previamentes para
                                        poder registrar la compra</li>
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
    name: 'users-list',
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: '%s | Lista de Usuarios',
    },
    created() {
        // this.$store.dispatch('obtenerListaDeUsuarios')
        this.aplicarFiltro();
        this.$store.dispatch('obtenerListaCompra');

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
        aplicarFiltro() {
            this.$store.dispatch('obtenerDetalleUsuario', this.search);
        }
    },
    computed: {
        // usuarios () {
        //   return this.$store.getters.getusuarios;
        // },
        compras() {
            return this.$store.getters.getListaCompra;
        },
        usuarios() {
            return this.$store.getters.getdetalleUsuarioId;
        },
        nivelesUsuario() {
            return this.$store.getters.getnivelesUsuarios;
        },
    }
}
</script>
<style lang="scss">
.el-date-editor {
    width: 100% !important;
}

th {
    --tw-bg-opacity: 1;
    color: rgb(0 200 165 / var(--tw-bg-opacity));
}
</style>
