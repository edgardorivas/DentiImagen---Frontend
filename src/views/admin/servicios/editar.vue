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
                    </el-form>

                    <!-- <form @submit.prevent="editarServicio">
                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Datos del Servicio</el-divider>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
                                    <el-input  v-model="detallesServicio.data[0].nombre_servicio"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Descripcion</p>
                                    <el-input 
                                        v-model="detallesServicio.data[0].descripcion "></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Costo</p>
                                    <el-input  type="number"
                                        v-model="detallesServicio.data[0].costo_dolares"></el-input>
                                </label>
                            </div>
                        </div>
                        <br />
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
                                type="submit">Guardar</button>
                        </div>
                    </form> -->
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
    },


    computed: {
        detallesServicio() {
            return this.$store.getters.getServicioEspecifico;
        },

    }
};
</script>
