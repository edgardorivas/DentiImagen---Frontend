<template>
    <!--
        - cambia la forma en la que se vizualisa los registros en ves de una tabla que se vean como tarjetas con su informacion
        Error: si registro una compra y despues vengo al inventario no se refresca si no que me sigue mostrando los valores que existian 
        antes del nuevo registro de compra
    -->
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                    <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-blueGray-700">
                                Inventario
                            </h3>
                        </div>
                    </div>
                </div>
                <div v-if="inventario && inventario.data">

                    <div class="px-5 mt-3 flex ">

                        <button @click="modal = true" class="bg-verdiAnderson justify-start text-white py-2 px-3 rounded-md uppercase">
                            Busqueda Avanzada
                        </button>

                        <button :disabled="loading"
                            class=" md:w-1/12 bg-indigo-600 justify-end text-white  uppercase py-1 rounded-md"
                            type="button" v-on:click="openNewTab">
                            PDF
                        </button>
                       
                        
                    </div>
                    
                    <div class="mt-5">
                        <div >
                            <el-table :data="inventario.data" class="w-full">
                                <el-table-column prop="nombre" label="Nombres"></el-table-column>
                                <el-table-column prop="tipo" label="Tipo de material"></el-table-column>
                                <el-table-column prop="minimo" label="Cantidad Minima"></el-table-column>
                                <el-table-column prop="disponible" label="Cantidad Disponible"></el-table-column>
    
                                
                            </el-table>
                            <!-- Modales de busqueda -->
                            <el-drawer title="Busqueda Avanzada" :visible.sync="modal" direction="rtl"
                                :before-close="handleClose">
                                <form class="h-full" @submit.prevent="aplicarFiltro">
                                    <div class="flex flex-col content-between justify-between h-full">
                                        <div class="flex flex-col">
                                            <!-- Contenido 
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
                                             Fin del contenido 
                                            -->
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
    },
    data() {
        return {
            modal: false,
            /*
                search: {
                    nombre: "",
                    usuario: "",
                    fecha: "",
                    especializacion: "",
                    nivel: "",
                },
            */
            url:`http://localhost:3000/pdf/inventario`,

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
        }
    },
    computed: {
        inventario() {
            return this.$store.getters.getInventario;
        },
        
    }
}
</script>
<style lang="scss">
.el-date-editor {
    width: 100% !important;
}
</style>
