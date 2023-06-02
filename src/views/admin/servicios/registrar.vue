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
						<el-form label-position="top" :model="nuevoServicio" :rules="rules"  ref="registrarServicio" label-width="120px" class="demo-ruleForm">
                            <div class="flex flex-wrap justify-around">
                                <div class="w-11/12">
                                    <el-divider>Datos del Servicio</el-divider>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Nombre</p>
										<el-form-item prop="nombre">
                                            <el-input placeholder="Nombre del servicio" 
                                                v-model="nuevoServicio.nombre"></el-input>
										</el-form-item>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Descripcion</p>
										<el-form-item prop="descripcion">
                                            <el-input placeholder="Descripcion del servicio" 
                                                v-model="nuevoServicio.descripcion"></el-input>
										</el-form-item>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Costo</p>
										<el-form-item prop="costo">
                                            <el-input placeholder="Costo del servicio" type="number" 
                                                v-model="nuevoServicio.costo"></el-input>
										</el-form-item>
                                    </label>
                                </div>
                            </div>
                            <br />
                            <div class="flex flex-wrap justify-around">
                                <button :disabled="loading" type="button" v-on:click="registrarServicio"
                                    class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                    Guardar
                                </button>
                            </div>
                        </el-form>

                    <!-- <form @submit.prevent="registrarServicio">
                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Datos del Servicio</el-divider>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
                                    <el-input placeholder="Nombre del servicio" 
                                        v-model="nuevoServicio.nombre"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Descripcion</p>
                                    <el-input placeholder="Descripcion del servicio" 
                                        v-model="nuevoServicio.descripcion"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Costo</p>
                                    <el-input placeholder="Costo del servicio" type="number" 
                                        v-model="nuevoServicio.costo"></el-input>
                                </label>
                            </div>
                        </div>
                        <br />
                        <div class="flex flex-wrap justify-around">
                            <button :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                Guardar
                            </button>
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
    },
    data() {
        return {
            nuevoServicio: {
                nombre: '',
                descripcion: '',
                costo: '',
            },
            rules: {
                nombre: [
                    { required: true, message: 'Es necesario ingresar el nombre del servicio', trigger: 'change' },
                    { min: 2,  message: 'El nombre del servicio tiene que ser como minimo 2 caracteres', trigger: 'change' }
                ],
                descripcion: [
                    { required: true, message: 'Es necesario ingresar la descripcion del servicio', trigger: 'change' },
                    { min: 5,  message: 'La descripcion tiene que ser mayor a  5 caracteres', trigger: 'change' }
                ],
                costo: [
                    { required: true, message: 'Es necesario ingresar el costo del servicio', trigger: 'change' },
                    { min: 1,  message: 'El costo del servicio tiene que ser como minimo 1 digito', trigger: 'change' }
                ],
            },
            loading: false,
        };
    },
    methods: {
        async registrarServicio() {
            this.$refs['registrarServicio'].validate(async (valid) => {
                if(valid){
                    try {
                        this.$store.dispatch("getLoadingApp", true);
                        this.loading = true;
                        const token = localStorage.getItem("token_acess");
                        const request = await axios({
                            method: "POST",
                            baseURL: config.backend.baseURL,
                            url: "/servicios/registrar",
                            headers: {
                                ["auth-token"]: token,
                            },
                            data: this.nuevoServicio,
                        });
                        this.$store.dispatch("getLoadingApp", false);
                        this.loading = false;
                        this.$message({
                            message: "Registrado Exitosamente",
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
    }
};
</script>
