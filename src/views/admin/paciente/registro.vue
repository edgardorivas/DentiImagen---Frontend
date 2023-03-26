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

                        <div class="flex flex-wrap justify-around" >

                            <div class="w-11/12">
                                <el-divider>Datos del Paciente</el-divider>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 ml-2 py-1">
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

                            <div class="w-11/12">
                                <el-divider>Datos historicos de padecimientos</el-divider>
                            </div>

                            <!--Se muestra los selects-->
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Esta usted en tratamiento ?</p>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">si</label>
                                        
                                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">no</label>
                                    </div>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Alergia a algun medicamento?</p>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">si</label>
                                        
                                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">no</label>
                                    </div>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Sufre de presion arterial ?</p>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">si</label>
                                        
                                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">no</label>
                                    </div>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Diabetico ?</p>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">si</label>
                                        
                                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">no</label>
                                    </div>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Antecedentes familiares de diabetes ?</p>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">si</label>
                                        
                                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">no</label>
                                    </div>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Ha sufrido de Hepatitis ?</p>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">si</label>
                                        
                                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">no</label>
                                    </div>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Ha sufrido de Herpes ?</p>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">si</label>
                                        
                                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">no</label>
                                    </div>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Ha sufrido de Afecciones cardiacas ?</p>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">si</label>
                                        
                                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">no</label>
                                    </div>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Problemas con la Anestecia ?</p>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">si</label>
                                        
                                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">no</label>
                                    </div>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Es usted propenso a las Hemorragias ?</p>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">si</label>
                                        
                                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">no</label>
                                    </div>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Ha convulsionado alguna vez ?</p>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">si</label>
                                        
                                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">no</label>
                                    </div>
                                    </label>
                                </div>
                        </div>
                        


                        <br>


                        <div class="flex flex-wrap justify-around">
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
