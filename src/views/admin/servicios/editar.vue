<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Registro de Servicios
                        </h3>
                    </div>
                </div>

                <div class="mt-5 pb-5">
                    <el-form label-position="top" :model="detallesServicio.data[0]" :rules="rules"  ref="EditarServicio" label-width="120px" class="demo-ruleForm">
                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Datos del Servicio</el-divider>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
									<el-form-item prop="nombre_servicio">
                                        <el-input  v-model="detallesServicio.data[0].nombre_servicio"></el-input>
									</el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Descripcion</p>
									<el-form-item prop="descripcion">
                                        <el-input v-model="detallesServicio.data[0].descripcion "></el-input>
									</el-form-item>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Costo</p>
									<el-form-item prop="costo_dolares">
                                        <el-input  type="number" v-model="detallesServicio.data[0].costo_dolares"></el-input>
									</el-form-item>
                                </label>
                            </div>
                        </div>
                        <br />



                    </el-form>

                    <div class="ml-36 mb-10 w-10/12" v-if="detallesServicioInsumos && detallesServicioInsumos.data">
                      <el-table :data="detallesServicioInsumos.data[0].consumible" class="w-full">
                          <!-- {{ scope.$index, tableData}} -->
                          <el-table-column prop="idRecurso" label="Id"></el-table-column>
                          <el-table-column prop="nombre" label="Insumo"></el-table-column>
                          <el-table-column prop="necesarios" label="Unidades a utilizar"></el-table-column>
                          <el-table-column prop="disponible" label="disponible"></el-table-column>
                          <el-table-column fixed="right" label="Operaciones" width="170">
                            <template slot-scope="scope">
                                  <button slot="reference" :disabled="loading" @click="eliminarAsociacionItemServicio(detallesServicio.data[0].id_servicio,scope.row.idRecurso)"
                                      class="w-full  text-red-600 bg-none uppercase py-2 "
                                      type="button" >Borrar</button>
                            </template>
                        </el-table-column>
                      </el-table>
                  </div>
                  <div v-else class=" w-1/2 ml-64 mb-10">
                    <div class=" flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="warning">
                      <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd"></path>
                      </svg>
                      <span class="sr-only">warning</span>
                      <div>
                        <span class="font-medium">Aun no se ha asociado ningun insumo al servicio considere:</span>
                        <ul class="mt-1.5 ml-4 list-disc list-inside">
                          <li>Tiene que existir por lo minimo un insumo registrado previamente</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-wrap justify-around">
                            <el-popconfirm confirm-button-text='Si, Eliminar' confirm-button-type="danger"
                                cancel-button-text='No, Cancelar' icon="el-icon-info" icon-color="red"
                                :title="`Estas seguro de eliminar el servicio ${detallesServicio.data[0].nombre_servicio}?`"
                                class="w-full md:w-1/3 bg-red-600" @confirm="eliminarServicio(detallesServicio.data[0].id_servicio)">
                                <button slot="reference" :disabled="loading"
                                    class="w-full bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                    type="button">Eliminar</button>
                            </el-popconfirm>
                            <button :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                type="button" v-on:click="editarServicio">Guardar</button>
                        </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from "../../../config";
import axios from "axios";
export default {
    name: "product-add",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Agregar nuevo Servicio",
    },
    created() {
        this.$store.dispatch('obtenerServiciosEspecifico', { id: this.$route.params.ID });
        this.$store.dispatch('obtenerServiciosMaterialesEspecifico', { id: this.$route.params.ID });
    },
    data() {
        return {
            rules: {
                nombre_servicio: [
                    { required: true, message: 'Es necesario ingresar el nombre del servicio', trigger: 'change' },
                    { min: 2,  message: 'El nombre del servicio tiene que ser como minimo 2 caracteres', trigger: 'change' }
                ],
                descripcion: [
                    { required: true, message: 'Es necesario ingresar la descripcion del servicio', trigger: 'change' },
                    { min: 5,  message: 'La descripcion tiene que ser mayor a  5 caracteres', trigger: 'change' }
                ],
                costo_dolares: [
                    { required: true, message: 'Es necesario ingresar el costo del servicio', trigger: 'change' },
                    { min: 1,  message: 'El costo del servicio tiene que ser como minimo 1 digito', trigger: 'change' }
                ],
            },
            loading: false,
        };
    },
    methods: {
        async editarServicio() {
            this.$refs['EditarServicio'].validate(async (valid) => {
                if(valid){
                    try {
                        this.$store.dispatch("getLoadingApp", true);
                        this.loading = true;
                        const token = localStorage.getItem("token_acess");
                        const request = await axios({
                            method: "PATCH",
                            baseURL: config.backend.baseURL,
                            url: `/servicios/${this.$route.params.ID}`,
                            headers: {
                                ["auth-token"]: token,
                            },
                            data: this.detallesServicio.data[0],
                        });
                        this.$store.dispatch("getLoadingApp", false);
                        this.loading = false;
                        this.$message({
                            message: "Actualizacion Exitosamente",
                            type: "success",
                        });
                        this.$router.push({ path: "/admin/servicios" });
                    } catch (error) {
                        if (error.response) {
                            this.$message({
                                message: error.response.data.mensaje || "Sin mensaje del servidor",
                                type: "error",
                            });
                        } else {
                            this.$message({
                                message: "No estas conectado a internet.",
                                type: "error",
                            });
                        }
                        this.$store.dispatch("getLoadingApp", false);
                        this.loading = false;
                        console.clear();
                    }
                }
			});
        },
        async eliminarServicio(id) {
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'DELETE',
                    baseURL: config.backend.baseURL,
                    url: '/servicios/' + id,
                    headers: {
                        ['auth-token']: token,
                    },
                });
                this.$store.dispatch('getLoadingApp', false);
                this.loading = false;
                this.$message({
                    message: 'Eliminado Exitosamente',
                    type: 'success',
                });
                this.$router.push({ path: "/admin/servicios" });
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
        },
        async eliminarAsociacionItemServicio(idServicio,idRecurso){
          try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'DELETE',
                    baseURL: config.backend.baseURL,
                    url:`/servicios-recurso/eliminar/${idServicio}/${idRecurso}`,
                    headers: {
                        ['auth-token']: token,
                    },
                });
                this.$store.dispatch('getLoadingApp', false);
                this.loading = false;
                this.$message({
                    message: 'Eliminado Exitosamente',
                    type: 'success',
                });
                this.$store.dispatch('obtenerServiciosEspecifico', { id: this.$route.params.ID });
                this.$store.dispatch('obtenerServiciosMaterialesEspecifico', { id: this.$route.params.ID });
                // this.$router.push({ path: "/admin/servicios" });
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
    },
    computed: {
        detallesServicio() {
            return this.$store.getters.getServicioEspecifico;
        },
        detallesServicioInsumos() {
            return this.$store.getters.getServicioInsumoEspecifico;
        },

    }
};
</script>
