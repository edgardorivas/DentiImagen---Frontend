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
                    <form @submit.prevent="registroPaciente()" >

                        <div class="flex flex-wrap justify-around" v-if="segundaParte == false">

                            <div class="w-11/12">
                                <el-divider>Datos del Paciente</el-divider>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
                                    <el-input placeholder="Nombre del Paciente"
                                        v-model="nuevoHistorialPaciente.nombre"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Apellido</p>
                                    <el-input placeholder="Apellido del Paciente"
                                        v-model="nuevoHistorialPaciente.apellido"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Edad</p>
                                    <el-input placeholder="Edad del Paciente"
                                        v-model="nuevoHistorialPaciente.edad"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cedula</p>
                                    <el-input placeholder="Cedula del Paciente"
                                        v-model="nuevoHistorialPaciente.cedula"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Sexo</p>
                                    <el-input placeholder="Genero del Paciente"
                                        v-model="nuevoHistorialPaciente.genero"></el-input>
                                </label>
                            </div>


                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Telefono</p>
                                    <el-input placeholder="Telefono del Paciente"
                                        v-model="nuevoHistorialPaciente.telefono"></el-input>
                                </label>
                            </div>



                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Correo Electronico</p>
                                    <el-input placeholder="Correo del Paciente"
                                        v-model="nuevoHistorialPaciente.correo"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Referido por:</p>
                                    <el-input placeholder="Nombre del tipo de material"
                                        v-model="nuevoHistorialPaciente.referidoPor"></el-input>
                                </label>
                            </div>


                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Motivo de la Consulta</p>
                                    <el-input placeholder="Motivo de la Consulta"
                                        v-model="nuevoHistorialPaciente.motivoConsulta"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Profesion </p>
                                    <el-input placeholder="Profesion del Paciente"
                                        v-model="nuevoHistorialPaciente.profecion"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Direccion </p>
                                    <el-input placeholder="Direccion del Paciente"
                                        v-model="nuevoHistorialPaciente.direccion"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Odontologo Referido</p>
                                    <el-input placeholder="Indique el nombre del doctor referido"
                                        v-model="nuevoHistorialPaciente.trabajadorOdontologo"></el-input>
                                </label>
                            </div>
                        </div>

                        <div class="flex flex-wrap justify-around" v-else>

                            <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Esta usted en tratamiento ?</p>
                                <el-select v-model="nuevoHistorialPaciente.estaTratamiento" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Alergia a algun medicamento?</p>
                                <el-select v-model="nuevoHistorialPaciente.alergicoAlgunMedicamento" placeholder="¿ Alergia a algun medicamento?" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Sufre de presion arterial ?</p>
                                <el-select v-model="nuevoHistorialPaciente.sufreTensionAlterial" placeholder="¿ Sufre de presion arterial ?" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Diabetico ?</p>
                                <el-select v-model="nuevoHistorialPaciente.diabetico" placeholder="¿ Diabetico ?" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Antecedentes familiares de diabetes ?</p>
                                <el-select v-model="nuevoHistorialPaciente.antecedentesDiabetico" placeholder="¿ Antecedentes familiares de diabetes ?" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Ha sufrido de Hepatitis ?</p>
                                <el-select v-model="nuevoHistorialPaciente.sufridoHepatitis" placeholder="¿ Ha sufrido de Hepatitis ?" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Ha sufrido de Herpes ?</p>
                                <el-select v-model="nuevoHistorialPaciente.sufridoHerpes" placeholder="¿ Ha sufrido de Herpes ?" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Ha sufrido de Afecciones cardiacas ?</p>
                                <el-select v-model="nuevoHistorialPaciente.efeccionesCardiacas" placeholder="Tratamiento" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Problemas con la Anestecia ?</p>
                                <el-select v-model="nuevoHistorialPaciente.sufridoAnestecia" placeholder="¿ Problemas con la Anestecia ?" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Es usted propenso a las Hemorragias ?</p>
                                <el-select v-model="nuevoHistorialPaciente.propensoHemorragias" placeholder="¿ Es usted propenso a las Hemorragias ?" class="w-full">
                                    <el-option label="Si" value=true></el-option>
                                    <el-option label="No" value=false></el-option>
                                </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                <p class="ml-1">¿ Ha convulsionado alguna vez ?</p>
                                <el-select v-model="nuevoHistorialPaciente.convulcionAlgunaVez" placeholder="¿ Ha convulsionado alguna vez ?" class="w-full">
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

                            <button   :disabled="loading"
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
        titleTemplate: "%s | Agregar nuevo Paciente",
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
                diabetico:  null,
                antecedentesDiabetico: null,
                sufridoHepatitis : null,
                sufridoHerpes: null,
                efeccionesCardiacas: null,
                sufridoAnestecia : null,
                propensoHemorragias: null,
                convulcionAlgunaVez: null,
                estaTratamiento: null,
                alergicoAlgunMedicamento: null,
                sufreTensionAlterial: null,
                trabajadorOdontologo:null

            },

            segundaParte:false,
            loading: false,
        }
    },
    methods: {
        async registroPaciente() {
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                console.log(this.nuevoHistorialPaciente)
                const request = await axios({
                    method: 'POST',
                    baseURL: config.backend.baseURL,
                    url: '/paciente/ingresar',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: this.nuevoHistorialPaciente
                });
                console.log(request);
                this.$store.dispatch('getLoadingApp', false);
                this.loading = false;
                this.$message({
                    message: 'Registrado Exitosamente',
                    type: 'success',
                });
                this.$router.push({ path: '/admin/' });
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
    },
};
</script>
