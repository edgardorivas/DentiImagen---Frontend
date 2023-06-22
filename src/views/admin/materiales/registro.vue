<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Registro de Materiales
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">
                    <el-form label-position="top" :model="nuevoMaterial" :rules="rules"  ref="registrarMaterial" label-width="120px" class="demo-ruleForm">
                        <div class="flex flex-wrap justify-around">

                            <div class="w-11/12">
                                <el-divider>Datos del Material</el-divider>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
                                    <el-form-item prop="nombre">
                                        <el-input placeholder="Nombre del material" auto-complete="name"
                                            v-model="nuevoMaterial.nombre"></el-input>
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Descripcion</p>
                                    <el-form-item prop="descripcion">
                                        <el-input placeholder="Descripcion del material" auto-complete="family-name"
                                            v-model="nuevoMaterial.descripcion"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cantidad disponible</p>
                                    <el-form-item prop="cantidadD">
                                        <el-input placeholder="Cantidad disponible" type="number" auto-complete="number"
                                            v-model="nuevoMaterial.cantidadD"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cantidad minima</p>
                                    <el-form-item prop="cantidadM">
                                        <el-input placeholder="Cantidad minima" type="number" auto-complete="tel"
                                            v-model="nuevoMaterial.cantidadM"></el-input>
                                    </el-form-item>

                                </label>
                            </div>

                            <div v-if="tipoMaterial && tipoMaterial.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Tipo de material</p>
                                    <el-form-item prop="tipo_recurso">

                                        <el-select v-model="nuevoMaterial.tipo_recurso" placeholder="Tipo de materia"
                                            class="w-full">
                                            <el-option v-for="item in tipoMaterial.data" :key="item.id_tipo_recurso"
                                                :label="item.nombre_tipo_recurso" :value="item.id_tipo_recurso"></el-option>
                                        </el-select>

                                    </el-form-item>
                                </label>
                            </div>

                        </div>
                        <br>
                        <div class="flex flex-wrap justify-around">
                            <button :disabled="loading" type="button" v-on:click="registroMaterial"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Guardar</button>
                        </div>
                    </el-form>

                    <!-- <form @submit.prevent="registroMaterial">

                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Datos del Material</el-divider>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
                                    <el-input placeholder="Nombre del material" auto-complete="name"
                                        v-model="nuevoMaterial.nombre"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Descripcion</p>
                                    <el-input placeholder="Descripcion del material" auto-complete="family-name"
                                        v-model="nuevoMaterial.descripcion"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cantidad disponible</p>
                                    <el-input placeholder="Cantidad disponible" type="number" auto-complete="number"
                                        v-model="nuevoMaterial.cantidadD"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cantidad minima</p>
                                    <el-input placeholder="Cantidad minima" type="number" auto-complete="tel"
                                        v-model="nuevoMaterial.cantidadM"></el-input>
                                </label>
                            </div>

                            <div v-if="tipoMaterial && tipoMaterial.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Tipo</p>
                                    <el-select v-model="nuevoMaterial.tipo_recurso" placeholder="Tipo de materia"
                                        class="w-full">
                                        <el-option v-for="item in tipoMaterial.data" :key="item.id_tipo_recurso"
                                            :label="item.nombre_tipo_recurso" :value="item.id_tipo_recurso"></el-option>
                                    </el-select>
                                </label>
                            </div>

                        </div>
                        <br>
                        <div class="flex flex-wrap justify-around">
                            <button :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Guardar</button>
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
        titleTemplate: "%s | Agregar nuevo material",
    },
    created() {
        this.$store.dispatch('obtenerTipoProducto');

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
            rules: {
                nombre: [
                    { required: true, message: 'Es necesario ingresar el nombre del material', trigger: 'change' },
                    { min: 2,  message: 'El nombre del material tiene que tener como minimo 2 caracteres', trigger: 'change' }
                ],
                descripcion: [
                    { required: true, message: 'Es necesario ingresar la descripcion del material', trigger: 'change' },
                    { min: 5,  message: 'La descripcion tiene que ser mayor a  5 caracteres', trigger: 'change' }
                ],
                cantidadD: [
                    { required: true, message: 'Es necesario ingresar la cantidad disponible actualmente', trigger: 'change' },
                    { min: 1, message: 'La cantidad disponible tiene que tener como minimo un digito ', trigger: 'change' }
                ],
                cantidadM: [
                    { required: true, message: 'Es necesario ingresar la cantidad minima permitida', trigger: 'change' },
                    { min: 1,  message: 'La cantidad minima permitida tiene que tener como minimo un digito', trigger: 'change' }
                ],
                tipo_recurso: [
                    { required: true, message: 'Es obligatorio seleccionar un tipo de material', trigger: 'change',}
                ],
                
            },
            loading: false,
        }
    },
    methods: {
        async registroMaterial() {
            this.$refs['registrarMaterial'].validate(async (valid) => {
                if(valid){
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
                        this.$router.push({ path: '/admin/materiales' });
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
    },
    computed: {
        tipoMaterial() {
            let tipoMaterial = this.$store.getters.getTipoMaterial;
            return tipoMaterial;
        }
    }
};
</script>
  