<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Registro de un nuevo Paciente
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">
                    <form >

                        <div class="flex flex-wrap justify-around" v-if="segundaParte == false">

                            <div class="w-11/12">
                                <el-divider>Datos del Paciente</el-divider>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
                                    <el-input placeholder="Nombre del Paciente" auto-complete="name"
                                        v-model="nuevoHistorialPaciente.nombre"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Apellido</p>
                                    <el-input placeholder="Apellido del Paciente" auto-complete="name"
                                        v-model="nuevoHistorialPaciente.apellido"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Edad</p>
                                    <el-input placeholder="Edad del Paciente" auto-complete="name"
                                        v-model="nuevoHistorialPaciente.edad"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cedula</p>
                                    <el-input placeholder="Cedula del Paciente" auto-complete="name"
                                        v-model="nuevoHistorialPaciente.cedula"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Sexo</p>
                                    <el-input placeholder="Genero del Paciente" auto-complete="name"
                                        v-model="nuevoHistorialPaciente.genero"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Telefono</p>
                                    <el-input placeholder="Telefono del Paciente" auto-complete="name"
                                        v-model="nuevoHistorialPaciente.telefono"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Correo Electronico</p>
                                    <el-input placeholder="Correo del Paciente" auto-complete="name"
                                        v-model="nuevoHistorialPaciente.correo"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Referido por:</p>
                                    <el-input placeholder="Nombre del tipo de material" auto-complete="name"
                                        v-model="nuevoHistorialPaciente.referidoPor"></el-input>
                                </label>
                            </div>
                           

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Motivo de la Consulta</p>
                                    <el-input placeholder="Motivo de la Consulta" auto-complete="name"
                                        v-model="nuevoHistorialPaciente.motivoConsulta"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Profesion </p>
                                    <el-input placeholder="Profesion del Paciente" auto-complete="family-name"
                                        v-model="nuevoHistorialPaciente.profecion"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Direccion </p>
                                    <el-input placeholder="Direccion del Paciente" auto-complete="family-name"
                                        v-model="nuevoHistorialPaciente.direccion"></el-input>
                                </label>
                            </div>
                        </div>

                        <div class="flex flex-wrap justify-around" v-else>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Esta usted en tratamiento ?</p>
                                <el-select v-model="nuevoHistorialPaciente.tratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Alergia a algun medicamento?</p>
                                <el-select v-model="nuevoHistorialPaciente.tratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Sufre de presion arterial ?</p>
                                <el-select v-model="nuevoHistorialPaciente.tratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Diabetico ?</p>
                                <el-select v-model="nuevoHistorialPaciente.tratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Antecedentes familiares de diabetes ?</p>
                                <el-select v-model="nuevoHistorialPaciente.tratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Ha sufrido de Hepatitis ?</p>
                                <el-select v-model="nuevoHistorialPaciente.tratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Ha sufrido de Herpes ?</p>
                                <el-select v-model="nuevoHistorialPaciente.tratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Ha sufrido de Afecciones cardiacas ?</p>
                                <el-select v-model="nuevoHistorialPaciente.tratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Problemas con la Anestecia ?</p>
                                <el-select v-model="nuevoHistorialPaciente.tratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Es usted propenso a las Hemorragias ?</p>
                                <el-select v-model="nuevoHistorialPaciente.tratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Ha convulsionado alguna vez ?</p>
                                <el-select v-model="nuevoHistorialPaciente.tratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            




                            





                        </div>


                        <br>


                        <div class="flex flex-wrap justify-around"  v-if="segundaParte == false">
                            <button @click="cambiar()" type="button"  :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Continuar</button>
                        </div>

                        <div class="flex flex-wrap justify-around" v-else>
                                
                            <button @click="cambiar()" type="button"   :disabled="loading"
                                class="w-full md:w-1/3 bg-red-300 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Atras</button>
                                
                            <button  type="button"   :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Guardar</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from "../../../config";
import axios from "axios";
export default {
    name: "typeProduct-add",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Agregar nuevo material",
    },
    created() {
        
    },
    data() {
        return {
            nuevoHistorialPaciente:{
                nombre : "",
                apellido : "",
                edad: "",
                cedula: "",
                telefono: "",
                correo : "",
                referidoPor: "",
                profecion: "",
                genero: "",
                motivoConsulta: "",
                direccion: "",
                tratamiento: null,


            },

            segundaParte:false,
            loading: false,
        }
    },
    methods: {
        async registroMaterial() {
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
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
                this.$router.push({ path: '/admin/tipo-materiales' });
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
        cambiar(){
            this.segundaParte = !this.segundaParte;
        }
    }
};
</script>
