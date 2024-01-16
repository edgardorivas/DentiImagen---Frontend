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
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button v-on:click="modalMaterial()"
                                class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ">
                                Agregar nuevo
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <div v-if="producto && producto.data">
                        <template class="relative h-32 w-32 ">
                            <el-input v-model="search" class="h-1/6 w-2/12 ml-10" placeholder="Buscar" />
                        </template>

                        <el-table
                            :data="producto.data.filter(data => !search || data.nombre.toLowerCase().includes(search.toLowerCase()))"
                            class="w-full p-10">
                            <el-table-column prop="nombre" label="Nombre">
                                <template slot-scope="scope">
                                    <router-link :to="`/admin/materiales/${scope.row.id_recurso}`"
                                        class="uppercase text-verdiAnderson">
                                        @{{ scope.row.nombre }}
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="descripcion" label="Descripcion"></el-table-column>
                            <el-table-column prop="tipo" label="Tipo de Material"></el-table-column>


                            <el-table-column label="Operaciones">
                                <template slot-scope="scope">
                                    <p class="text-left pl-10">
                                        <router-link :to="`/admin/materiales/${scope.row.id_recurso}`"
                                            class="text-verdiAnderson text-xs w-full">
                                            Editar
                                        </router-link>
                                    </p>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!-- Modales de busqueda -->
                        <!-- 
              <el-drawer title="Busqueda Avanzada" :visible.sync="modal" direction="rtl" :before-close="handleClose">
                <form class="h-full" @submit.prevent="aplicarFiltro">
                  <div class="flex flex-col content-between justify-between h-full">
                    <div class="flex flex-col">
                      
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
                      
                    </div>
                    <div>
                      <button class="w-full bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2" type="submit">Buscar</button>
                    </div>
                  </div>
                </form>
              </el-drawer>
              -->
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
                                <span class="font-medium">No se ha registrado ningun material/consumible</span>
                                <ul class="mt-1.5 ml-4 list-disc list-inside">
                                    <li>Se recomienda tener tipos de materiales para poder registrar materiales</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- modal del nuevo material -->
                <el-dialog title="Nuevo insumo" :visible.sync="centerDialogVisibleNuevoMaterial" width="30%" center>
                    <div class="flex flex-wrap justify-around">
                        <el-form label-position="top" class="w-full" :model="nuevoMaterial" :rules="rules"
                            ref="registrarMaterial">

                            <label>
                                <p class="ml-1">Nombre</p>
                                <el-form-item prop="nombre">
                                    <el-input placeholder="Nombre del material" v-model="nuevoMaterial.nombre"></el-input>
                                </el-form-item>
                            </label>
                            <label>
                                <p class="ml-1">Descripcion</p>
                                <el-form-item prop="descripcion">
                                    <el-input placeholder="Descripcion del material"
                                        v-model="nuevoMaterial.descripcion"></el-input>
                                </el-form-item>
                            </label>
                            <label>
                                <p class="ml-1">Cantidad disponible</p>
                                <el-form-item prop="cantidadD">
                                    <el-input placeholder="Cantidad disponible" type="number"
                                        v-model="nuevoMaterial.cantidadD"></el-input>
                                </el-form-item>
                            </label>
                            <label>
                                <p class="ml-1">Cantidad minima</p>
                                <el-form-item prop="cantidadM">
                                    <el-input placeholder="Cantidad minima" type="number"
                                        v-model="nuevoMaterial.cantidadM"></el-input>
                                </el-form-item>
                            </label>

                            <label v-if="tipoMaterial && tipoMaterial.data">
                                <p class="ml-1">Tipo de material</p>
                                <el-form-item prop="tipo_recurso">
                                    <el-select v-model="nuevoMaterial.tipo_recurso" placeholder="Tipo de materia"
                                        class="w-full">
                                        <el-option v-for="item in tipoMaterial.data" :key="item.id_tipo_recurso"
                                            :label="item.nombre_tipo_recurso" :value="item.id_tipo_recurso"></el-option>
                                    </el-select>
                                </el-form-item>
                            </label>
                            <label v-else class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <el-alert title="No existen tipos de materiales" type="error" :closable=false
                                    description="Ingrese como minimo 1 tipo de material">
                                </el-alert>
                            </label>

                            <!-- <label class="w-full  md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <button slot="reference" :disabled="loading"
                                    class="w-full mb-1  bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                    v-on:click="registroMaterial" type="button">
                                    Ingresar
                                </button>
                                <button slot="reference" :disabled="loading"
                                    class="w-full mb-2 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                    @click="centerDialogVisibleNuevoMaterial = false" type="button">
                                    Cerrar
                                </button>
                            </label> -->

                        </el-form>
                    </div>

                    <div slot="footer" class="dialog-footer flex flex-wrap justify-around">
                        <button slot="reference" :disabled="loading"
                            class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                            @click="centerDialogVisibleNuevoMaterial = false" type="button">
                            Cerrar
                        </button>
                        <button slot="reference" :disabled="loading"
                            class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                            v-on:click="registroMaterial" type="button">
                            Ingresar
                        </button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import config from '../../../config';
import axios from "axios";
export default {
    name: 'product-list',
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: '%s | Lista de Materia',
    },
    created() {
        this.$store.dispatch('obtenerTipoProducto');
        this.$store.dispatch("obtenerListaDeproducto");
    },
    data() {
        return {
            nuevoMaterial: {
                nombre: '',
                descripcion: '',
                cantidadD: '',
                cantidadM: '',
                tipo_recurso: '',
            },
            centerDialogVisibleNuevoMaterial: false,
            modal: false,
            search: "",
            rules: {
                nombre: [
                    { required: true, message: 'Es necesario ingresar el nombre del material', trigger: 'change' },
                    { min: 2, message: 'El nombre del material tiene que tener como minimo 2 caracteres', trigger: 'change' }
                ],
                descripcion: [
                    { required: true, message: 'Es necesario ingresar la descripcion del material', trigger: 'change' },
                    { min: 5, message: 'La descripcion tiene que ser mayor a  5 caracteres', trigger: 'change' }
                ],
                cantidadD: [
                    { required: true, message: 'Es necesario ingresar la cantidad disponible actualmente', trigger: 'change' },
                    { min: 1, message: 'La cantidad disponible tiene que tener como minimo un digito ', trigger: 'change' }
                ],
                cantidadM: [
                    { required: true, message: 'Es necesario ingresar la cantidad minima permitida', trigger: 'change' },
                    { min: 1, message: 'La cantidad minima permitida tiene que tener como minimo un digito', trigger: 'change' }
                ],
                tipo_recurso: [
                    { required: true, message: 'Es obligatorio seleccionar un tipo de material', trigger: 'change', }
                ],

            },
            loading: false,
        }
    },
    methods: {
        parseDate(date) {
            return new Date(date).toLocaleString();
        },
        handleClose() {
            this.modal = false;
        },
        modalMaterial() {
            this.centerDialogVisibleNuevoMaterial = true;
        },
        async registroMaterial() {
            this.$refs['registrarMaterial'].validate(async (valid) => {
                if (valid) {
                    try {
                        this.$store.dispatch('getLoadingApp', true);
                        this.loading = true;
                        const token = localStorage.getItem('token_acess');
                        const request = await axios({
                            method: 'POST',
                            baseURL: config.backend.baseURL,
                            url: '/recurso',
                            headers: {
                                ['auth-token']: token,
                            },
                            data: this.nuevoMaterial
                        });
                        this.$store.dispatch('getLoadingApp', false);
                        this.loading = false;
                        this.$message({
                            message: 'Registrado Exitosamente',
                            type: 'success',
                        });
                        this.centerDialogVisibleNuevoMaterial = false
                        this.resetForm("registrarMaterial")
                    } catch (error) {
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
                        console.clear()
                    }
                }
            });

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    computed: {
        producto() {
            let materiales = this.$store.getters.getproducto
            return materiales;
        },
        productoid() {
            return this.$store.getters.getDetalleProductoId;
        },
        tipoMaterial() {
            let tipoMaterial = this.$store.getters.getTipoMaterial;
            return tipoMaterial;
        }
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
  