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
                                    <el-select v-model="nuevoHistorialPaciente.genero" size="large" placeholder="Genero del Paciente">
                                        <el-option
                                        key="Masculino"
                                        label="Masculino"
                                        value="Masculino">
                                        </el-option>
                                        <el-option
                                        key="Femenino"
                                        label="Femenino"
                                        value="Femenino">
                                        </el-option>
                                    </el-select>
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
                                    <p class="ml-1">¿ Alergia a algun medicamento?</p>
                                    <el-input placeholder="Indique el nombre del medicamento"
                                        v-model="nuevoHistorialPaciente.alergicoAlgunMedicamento"></el-input>
                                    </label>
                                </div>



                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label v-if="trabajadoresOdontologicos">
                                    <p class="ml-1">Odontologo Asignado</p>
                                    <el-select v-model="nuevoHistorialPaciente.trabajadorOdontologo" size="large" placeholder="Genero del Paciente">
                                        <el-option v-for=" trabajador in trabajadoresOdontologicos" 
                                        :key="trabajador.id_trabajador"
                                        :label= "trabajador.nombre + ' - ' +trabajador.especializacion"
                                        :value="trabajador.id_trabajador">
                                        </el-option>
                                    </el-select>
                                </label>
                                <label v-else>
                                    <h4>No hay odontologos registrados</h4>
                                </label>
                            </div>
                            
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Odontologo Referido</p>
                                    <el-input  placeholder="Indique el nombre del doctor referido"
                                        v-model="nuevoHistorialPaciente.referidoPor"></el-input>
                                </label>
                            </div>

                            <div class="w-11/12">
                                <el-divider>Datos historicos de padecimientos</el-divider>
                            </div>
                            <!--Se muestra los selects-->
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Esta usted en tratamiento ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.estaTratamiento" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.estaTratamiento" label="0">NO</el-radio>
                                    </label>
                                </div>

                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Sufre de presion arterial ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.sufreTensionAlterial" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.sufreTensionAlterial" label="0">NO</el-radio>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Diabetico ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.diabetico" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.diabetico" label="0">NO</el-radio>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Antecedentes familiares de diabetes ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.antecedentesDiabetico" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.antecedentesDiabetico" label="0">NO</el-radio>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Ha sufrido de Hepatitis ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoHepatitis" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoHepatitis" label="0">NO</el-radio>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Ha sufrido de Herpes ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoHerpes" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoHerpes" label="0">NO</el-radio>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Ha sufrido de Afecciones cardiacas ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.efeccionesCardiacas" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.efeccionesCardiacas" label="0">NO</el-radio>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Problemas con la Anestecia ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoAnestecia" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoAnestecia" label="0">NO</el-radio>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Es usted propenso a las Hemorragias ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.propensoHemorragias" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.propensoHemorragias" label="0">NO</el-radio>
                                    </label>
                                </div>
    
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                    <p class="ml-1">¿ Ha convulsionado alguna vez ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.convulcionAlgunaVez" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.convulcionAlgunaVez" label="0">NO</el-radio>
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
    created() {
      this.mostrarTrabajadoresRol();
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
                alergicoAlgunMedicamento: '',
                sufreTensionAlterial: null,
                trabajadorOdontologo:null

            },
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
                //console.clear()
            }
        },
        cambiar(){
            this.segundaParte = !this.segundaParte;
        },
        mostrarTrabajadoresRol() {
            this.$store.dispatch("obtenerListaDeTrabajadoresRol");
        },
    },
    computed: {
      trabajadoresOdontologicos() {
        let trabajadoresRol = this.$store.getters.getUsuariosOdontologicos;
        let trabajadoresRolOdontologo= trabajadoresRol.data.filter(datosTrabajador => datosTrabajador.id_rol == 3);
        return trabajadoresRolOdontologo;
      },
    },
};
</script>
