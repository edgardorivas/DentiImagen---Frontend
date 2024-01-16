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
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button
                                class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                                v-on:click="modalTipoMaterial()">
                                Agregar nuevo
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-5">

                    <div v-if="tipoProducto && tipoProducto.data">
                        <template class="relative h-32 w-32 ">
                            <el-input v-model="search" class="h-1/6 w-2/12 ml-10" placeholder="Buscar" />
                        </template>

                        <el-table
                            :data="tipoProducto.data.filter(data => !search || data.nombre_tipo_recurso.toLowerCase().includes(search.toLowerCase()))"
                            class="w-full p-10">
                            <el-table-column prop="nombre_tipo_recurso" label="Nombre" width="190">
                                <template slot-scope="scope">
                                    <router-link :to="`/admin/tipo-materiales/${scope.row.id_tipo_recurso}`"
                                        class="uppercase text-verdiAnderson">
                                        @{{ scope.row.nombre_tipo_recurso }}
                                    </router-link>
                                </template>
                            </el-table-column>

                            <el-table-column prop="descripcion_tipo_recurso" label="Descripcion"></el-table-column>

                            <el-table-column label="Operaciones">
                                <template slot-scope="scope">
                                    <p class="text-center">
                                        <router-link :to="`/admin/tipo-materiales/${scope.row.id_tipo_recurso}`"
                                            class="text-verdiAnderson text-xs w-full">
                                            Editar
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
                                <span class="font-medium">No se ha registrado ningun tipo material</span>
                                <ul class="mt-1.5 ml-4 list-disc list-inside">
                                    <li>Se recomienda ingresar el tipo de materiales usados en la odontologia</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- modal del nuevo tipo de material -->
            <el-dialog title="Nuevo tipo de material" :visible.sync="centerDialogVisibleNuevoTipo" width="30%" center>
                <div class="flex flex-wrap justify-around">
                    <el-form label-position="top" class="w-96" :model="nuevoTipoMaterial" :rules="rules"
                        ref="nuevoTipoMaterial">

                        <label>
                            <p class="ml-1">Nombre</p>
                            <el-form-item prop="nombre">
                                <el-input placeholder="Nombre del tipo de material"
                                    v-model="nuevoTipoMaterial.nombre"></el-input>
                            </el-form-item>
                        </label>
                        <label>
                            <p class="ml-1">Descripcion</p>
                            <el-form-item prop="descripcion">
                                <el-input placeholder="Descripcion del tipo material"
                                    v-model="nuevoTipoMaterial.descripcion"></el-input>
                            </el-form-item>
                        </label>
                    </el-form>
                </div>

                <div slot="footer" class="dialog-footer flex flex-wrap justify-around">
                    <button slot="reference" :disabled="loading"
                        class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                        @click="centerDialogVisibleNuevoTipo = false" type="button">
                        Cerrar
                    </button>
                    <button slot="reference" :disabled="loading"
                        class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                        v-on:click="registroTipoMaterial" type="button">
                        Ingresar
                    </button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import config from "../../../../config";
import axios from "axios";
export default {
    name: 'typeProduct',
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: '%s | Lista de tipos de Materia',
    },
    created() {
        this.$store.dispatch('obtenerListaDeTipoProducto');
    },
    data() {
        return {
            nuevoTipoMaterial: {
                nombre: null,
                descripcion: null,
            },
            loading: false,
            rules: {
                nombre: [
                    { required: true, message: 'Es necesario ingresar el nombre del tipo de material', trigger: 'change' },
                    { min: 2, message: 'el nombre del tipo de material tiene que ser como minimo 2 caracteres', trigger: 'change' }
                ],
                descripcion: [
                    { required: true, message: 'Es necesario ingresar la descripcion del tipo de material', trigger: 'change' },
                    { min: 5, message: 'La descripcion tiene que ser mayor a  5 caracteres', trigger: 'change' }
                ]

            },
            centerDialogVisibleNuevoTipo: false,
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
        modalTipoMaterial() {
            this.centerDialogVisibleNuevoTipo = true;
        },
        async registroTipoMaterial() {
            this.$refs['nuevoTipoMaterial'].validate(async (valid) => {
                if (valid) {
                    try {
                        this.$store.dispatch('getLoadingApp', true);
                        this.loading = true;
                        const token = localStorage.getItem('token_acess');
                        await axios({
                            method: 'POST',
                            baseURL: config.backend.baseURL,
                            url: '/tipo-recurso',
                            headers: {
                                ['auth-token']: token,
                            },
                            data: this.nuevoTipoMaterial
                        });
                        this.$store.dispatch('getLoadingApp', false);
                        this.loading = false;
                        this.$message({
                            message: 'Registrado Exitosamente',
                            type: 'success',
                        });
                        // this.$router.push({ path: '/admin/tipo-materiales' });
                        this.$store.dispatch('obtenerListaDeTipoProducto')
                        this.centerDialogVisibleNuevoTipo = false;
                        this.nuevoTipoMaterial = {
                            nombre: null,
                            descripcion: null,
                        }
                        this.resetForm("nuevoTipoMaterial")
                    } catch (error) {
                        console.log("entro en el error======", error)
                        if (error.response) {
                            this.$message({
                                message: error.response.data.mensaje || 'Sin mensaje del servidor',
                                type: 'error',
                            });
                        } else {
                            this.$message({
                                message: 'No estas conectado a internet.',
                                type: 'error'
                            });
                        }
                        this.$store.dispatch('getLoadingApp', false);
                        this.loading = false;
                    }
                }
            });

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }

    },
    computed: {
        tipoProducto() {
            return this.$store.getters.getTipoProducto;
        },
        materiales() {
            return this.$store.getters.getproducto;
        }
    }
}
</script>
<style lang="scss">
.el-date-editor {
    width: 100% !important;
}
</style>
  