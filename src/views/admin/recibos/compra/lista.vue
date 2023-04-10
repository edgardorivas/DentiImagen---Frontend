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
                <div class="px-5 mt-3 flex justify-start">
                    <button @click="modal = true" class="bg-verdiAnderson text-white py-2 px-3 rounded-md uppercase">
                        Busqueda Avanzada
                    </button>
                </div>
                <div class="mt-5 ">
                    <div v-if="compras && compras.data">
                        <!--tabla-->
                        <el-table :data="compras.data" class="w-full mb-8">
                            <el-table-column fixed prop="usuario" label="Compra recivida por" width="190">
                                <template slot-scope="scope">
                                    <router-link :to="`/admin/usuarios/${scope.row.id_trabajador}`"
                                        class="uppercase text-verdiAnderson">
                                        @{{ scope.row.nombre_trabajador }}
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="telefono_trabajador" label="Telefono del Usuario"></el-table-column>

                            <el-table-column fixed prop="usuario" label="Compra recivida por" width="190">
                                <template slot-scope="scope">
                                    <router-link :to="`/admin/proveedores/${scope.row.id_proveedor}`"
                                        class="uppercase text-verdiAnderson">
                                        @{{ scope.row.nombre_proveedor }}
                                    </router-link>
                                </template>
                            </el-table-column>
                            
                            <el-table-column prop="nombre_proveedor" label="Proveedor"></el-table-column>
                            <el-table-column prop="monto_total" label="Monto total"></el-table-column>
                            <el-table-column prop="forma_pago" label="Forma de Pago"></el-table-column>
                            <el-table-column prop="referencias" label="Referencia del Pago"></el-table-column>

                            <el-table-column prop="fecha" label="Creado">
                                <template slot-scope="scope">
                                    <p class="">{{ parseDate(scope.row.fecha_compra) }}</p>
                                </template>
                            </el-table-column>
                            <!--fin tabla-->

                            <el-table-column fixed="right" label="Operaciones" width="170">
                                <template slot-scope="scope">
                                    <p class="text-left">
                                        <router-link :to="`/admin/recibo/compra/detalles/${scope.row.id_compra}`"
                                            class="text-red-600 text-xs w-full">
                                            <p class="text-sm">Ver detalles</p>
                                            
                                        </router-link>
                                    </p>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <div v-else class=" mb-5 ml-3">
                        <h3>No existen registros de Compras</h3>
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
