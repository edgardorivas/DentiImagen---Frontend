<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Registro de Usuario / Trabajador
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">

                    <el-form label-position="top" :model="nuevoUsuario" :rules="rules"  ref="nuevoUsuario" label-width="120px" class="demo-ruleForm">
                        
                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Datos del Trabajador</el-divider>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombres</p>
                                    <el-form-item prop="nombre">
                                        <el-input placeholder="Nombres del trabajador" v-model="nuevoUsuario.nombre"></el-input>
                                    </el-form-item>
                                </label>
                            </div>


                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Apellidos</p>
                                    <el-form-item prop="apellido">
                                        <el-input placeholder="Apellidos del trabajador" v-model="nuevoUsuario.apellido"></el-input>
                                    </el-form-item>
                                </label>

                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Correo Electronico </p>
                                    <el-form-item prop="correo">
                                        <el-input placeholder="Telefono del trabajador" type="email" v-model="nuevoUsuario.correo"></el-input>

                                        <!-- <div style="margin-top: 15px;">
                                            <el-input placeholder="luis_pedro" v-model="nuevoUsuario.correo" class="input-with-select">
                                                <el-select  v-model="selectMail" class="selectMail" slot="append" placeholder="mail">
                                                    <el-option label="@Gmail" value="gmail.com"></el-option>
                                                    <el-option label="@Hotmail" value="hotmail.com"></el-option>
                                                    <el-option label="@Outlook" value="outlook.com"></el-option>
                                                </el-select>
                                            </el-input>
                                        </div> -->
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Telefono</p>
                                    <el-form-item prop="telefono">
                                        <el-input placeholder="Telefono del trabajador" type="number" v-model="nuevoUsuario.telefono"></el-input>
                                    </el-form-item>
                                </label>
                                
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Especialización</p>
                                    <el-form-item prop="especializacion">
                                        <el-select v-model="nuevoUsuario.especializacion"
                                            placeholder="Selecciona tu Especialización" allow-create filterable class="w-full">
                                            <el-option label="Odontologo" value="Odontologo"></el-option>
                                            <el-option label="Programador" value="Desarrollador"></el-option>
                                            <el-option label="Administrador" value="Administrador"></el-option>
                                            <el-option label="Secretaria" value="Secretaria"></el-option>
                                            <el-option label="Vendedor" value="Vendedor"></el-option>
                                            <el-option label="Comprador" value="Comprador"></el-option>
                                            <el-option label="Director" value="Director"></el-option>
                                            <el-option label="Director Medico" value="Director Medico"></el-option>
                                            <el-option label="Mantenimiento" value="Mantenimiento"></el-option>
                                        </el-select>
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-11/12">
                                <el-divider>Datos de Autenticación</el-divider>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-4/12 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Usuario</p>
                                    <el-form-item prop="usuario">
                                        <el-input placeholder="Usuario del trabajador" auto-complete="username" v-model="nuevoUsuario.usuario"></el-input>
                                    </el-form-item>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Contraseña</p>
                                    <el-form-item prop="clave">
                                        <el-input type="password" placeholder="Contraseña del trabajador"
                                            auto-complete="new-password" v-model="nuevoUsuario.clave" show-password></el-input>
                                    </el-form-item>
                                </label>
                            </div>
                            <div v-if="nivelesUsuario && nivelesUsuario.data"
                                class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nivel / Rol</p>
                                    <el-form-item prop="nivel">
                                        <el-select v-model="nuevoUsuario.nivel" placeholder="Nivel del trabajador"
                                            class="w-full">
                                            <el-option 
                                                label="Selecciona" value="nada" :disabled="true"></el-option>

                                            <el-option v-for="item in nivelesUsuario.data" :key="item.id_nivel_usuario"
                                                :label="item.nombre_nivel_usuario" :value="item.id_nivel_usuario"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </label>
                            </div>
                            <div class="w-11/12">
                                <el-divider>Preguntas de Seguridad</el-divider>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Pregunta</p>
                                    <el-form-item prop="pregunta1">
                                        <el-input placeholder="Pregunta de Seguridad"
                                            v-model="nuevoUsuario.pregunta1"></el-input>
                                    </el-form-item>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Respuesta</p>
                                    <el-form-item prop="respuesta1">
                                        <el-input placeholder="Respuesta de Seguridad"
                                            v-model="nuevoUsuario.respuesta1"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Pregunta</p>
                                    <el-form-item prop="pregunta2">
                                        <el-input placeholder="Pregunta de Seguridad"
                                            v-model="nuevoUsuario.pregunta2"></el-input>
                                    </el-form-item>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Respuesta</p>
                                    <el-form-item prop="respuesta2">
                                        <el-input placeholder="Respuesta de Seguridad"
                                            v-model="nuevoUsuario.respuesta2"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Pregunta</p>
                                    <el-form-item prop="pregunta3">
                                        <el-input placeholder="Pregunta de Seguridad"
                                            v-model="nuevoUsuario.pregunta3"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Respuesta</p>
                                    <el-form-item prop="respuesta3">
                                        <el-input placeholder="Respuesta de Seguridad"
                                            v-model="nuevoUsuario.respuesta3"></el-input>
                                    </el-form-item>
                                    
                                </label>
                            </div>
                        </div>
                        <br>
                        <div class="flex flex-wrap justify-around">
                            <button type="button" v-on:click="registrarUsuario" :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Guardar</button>
                        </div>
                    </el-form>

                    <!-- <form @submit.prevent="registrarUsuario">
                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Datos del Trabajador</el-divider>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombres</p>
                                    <el-input placeholder="Nombres del trabajador" auto-complete="name"
                                        v-model="nuevoUsuario.nombre"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Apellidos</p>
                                    <el-input placeholder="Apellidos del trabajador" auto-complete="family-name"
                                        v-model="nuevoUsuario.apellido"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <div style="margin-top: 15px;">
                                    <el-input placeholder="luis_pedro" v-model="nuevoUsuario.correo" class="input-with-select">
                                        <el-select  v-model="selectMail" class="selectMail" slot="append" placeholder="mail">
                                            <el-option label="@Gmail" value="gmail.com"></el-option>
                                            <el-option label="@Hotmail" value="hotmail.com"></el-option>
                                            <el-option label="@Outlook" value="outlook.com"></el-option>
                                        </el-select>
                                    </el-input>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Telefono</p>
                                    <el-input placeholder="Telefono del trabajador" type="tel" auto-complete="tel"
                                        v-model="nuevoUsuario.telefono"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Especialización</p>
                                    <el-select v-model="nuevoUsuario.especializacion"
                                        placeholder="Selecciona tu Especialización" allow-create filterable class="w-full">
                                        <el-option label="Odontologo" value="Odontologo"></el-option>
                                        <el-option label="Programador" value="Desarrollador"></el-option>
                                        <el-option label="Administrador" value="Administrador"></el-option>
                                        <el-option label="Secretaria" value="Secretaria"></el-option>
                                        <el-option label="Vendedor" value="Vendedor"></el-option>
                                        <el-option label="Comprador" value="Comprador"></el-option>
                                        <el-option label="Director" value="Director"></el-option>
                                        <el-option label="Director Medico" value="Director Medico"></el-option>
                                        <el-option label="Mantenimiento" value="Mantenimiento"></el-option>
                                    </el-select>
                                </label>
                            </div>
                            <div class="w-11/12">
                                <el-divider>Datos de Autenticación</el-divider>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-4/12 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Usuario</p>
                                    <el-input placeholder="Usuario del trabajador" auto-complete="username"
                                        v-model="nuevoUsuario.usuario"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Contraseña</p>
                                    <el-input type="password" placeholder="Contraseña del trabajador"
                                        auto-complete="new-password" v-model="nuevoUsuario.clave" show-password></el-input>
                                </label>
                            </div>
                            <div v-if="nivelesUsuario && nivelesUsuario.data"
                                class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nivel / Rol</p>
                                    <el-select v-model="nuevoUsuario.nivel" placeholder="Nivel del trabajador"
                                        class="w-full">
                                        <el-option v-for="item in nivelesUsuario.data" :key="item.id_nivel_usuario"
                                            :label="item.nombre_nivel_usuario" :value="item.id_nivel_usuario"></el-option>
                                    </el-select>
                                </label>
                            </div>
                            <div class="w-11/12">
                                <el-divider>Preguntas de Seguridad</el-divider>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Pregunta</p>
                                    <el-input placeholder="Pregunta de Seguridad"
                                        v-model="nuevoUsuario.pregunta1"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Respuesta</p>
                                    <el-input placeholder="Respuesta de Seguridad"
                                        v-model="nuevoUsuario.respuesta1"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Pregunta</p>
                                    <el-input placeholder="Pregunta de Seguridad"
                                        v-model="nuevoUsuario.pregunta2"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Respuesta</p>
                                    <el-input placeholder="Respuesta de Seguridad"
                                        v-model="nuevoUsuario.respuesta2"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Pregunta</p>
                                    <el-input placeholder="Pregunta de Seguridad"
                                        v-model="nuevoUsuario.pregunta3"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Respuesta</p>
                                    <el-input placeholder="Respuesta de Seguridad"
                                        v-model="nuevoUsuario.respuesta3"></el-input>
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
import usuarios from '@/store/usuarios';
export default {
    name: "users-add",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Agregar nuevo usuario",
    },
    data() {
        return {
            selectMail: '',
            nuevoUsuario: {
                nombre: null,
                apellido: null,
                correo: '',
                telefono: null,
                especializacion: null,
                nivel: null,
                usuario: null,
                clave: null,
                pregunta1: null,
                respuesta1: null,
                pregunta2: null,
                respuesta2: null,
                pregunta3: null,
                respuesta3: null,
            },
            loading: false,
            rules: {
                nombre: [
                    { required: true, message: 'Es necesario ingresar el nombre del trabajador', trigger: 'blur' },
                    { min: 5,  message: 'El nombre tiene que tener mas de 5 caracteres', trigger: 'blur' }
                ],
                apellido: [
                    { required: true, message: 'Es necesario ingresar el apellido del trabajador', trigger: 'change' },
                    { min: 5,  message: 'El apellido tiene que tener mas de 5 caracteres', trigger: 'blur' }

                ],
                correo: [
                    { type: 'email', required: true, message: 'Ingrese un correo electronico valido', trigger: 'change',
                }
                ],
                telefono: [
                    { type: 'string',required: true, message: 'Es obligatorio el numero de telefono ', trigger: 'change' },
                    { length:11,  message: 'El numero telefonico tiene que contener 11 digitos', trigger: 'blur'}

                ],
                especializacion: [
                    { required: true, message: 'Es obligatorio seleccionar la especialidad del trabajador', trigger: 'change' }
                ],
                nivel: [
                    { required: true, message: 'Es obligatorio seleccionar el nivel de autoridad del trabajador', trigger: 'change'  }
                ],
                usuario: [
                    { required: true, message: 'Es necesario definir el nombre de usuario ', trigger: 'blur' },
                    { min: 5,  message: 'El nombre de usuario  tiene que contener 5 digitos como minimo', trigger: 'blur' }

                ],
                clave: [
                    { required: true, message: 'Ingrese la contraseña del usuario', trigger: 'blur' },
                    { min: 8,  message: 'La contraseña del usuario tiene que contener 8 digitos como minimo', trigger: 'blur' }

                ],
                pregunta1: [
                    { required: true, message: 'Ingrese el nombre de la pregunta', trigger: 'blur' },
                    { min: 5,  message: 'El nombre de la pregunta tiene que contener 5 digitos como minimo', trigger: 'blur' }

                ],
                respuesta1: [
                    { required: true, message: 'Ingrese la respuesta  de la pregunta 1', trigger: 'blur' },
                    { min: 2,  message: 'El nombre de la respuesta tiene que contener 2 digitos como minimo', trigger: 'blur' }
                ],
                pregunta2: [
                    { required: true, message: 'Ingrese el nombre de la pregunta 2', trigger: 'blur' },
                    { min: 5,  message: 'El nombre de la pregunta 2 ,tiene que contener 5 digitos como minimo', trigger: 'blur' }
                ],
                respuesta2: [
                { required: true, message: 'Ingrese la respuesta  de la pregunta 2', trigger: 'blur' },
                    { min: 2,  message: 'El nombre de la respuesta 2, tiene que contener 2 digitos como minimo', trigger: 'blur' }
                ],
                pregunta3: [
                    { required: true, message: 'Ingrese el nombre de la pregunta 3' , trigger: 'blur' },
                    { min: 5,  message: 'El nombre de la pregunta 3, tiene que contener 5 digitos como minimo', trigger: 'blur' }
                ],
                respuesta3: [
                    { required: true, message: 'Ingrese la respuesta  de la pregunta 3', trigger: 'blur' },
                    { min: 2,  message: 'El nombre de la respuesta 3, tiene que contener 2 digitos como minimo', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        async registrarUsuario() {
            try {
                this.$refs['nuevoUsuario'].validate(async (valid) => {
                    if (valid) {
                        this.$store.dispatch('getLoadingApp', true);
                        this.loading = true;
                        const token = localStorage.getItem('token_acess');
                        const request = await axios({
                            method: 'POST',
                            baseURL: config.backend.baseURL,
                            url: '/trabajador',
                            headers: {
                                ['auth-token']: token,
                            },
                            data: this.nuevoUsuario
                        });
                        this.$store.dispatch('getLoadingApp', false);
                        this.loading = false;
                        this.$message({
                            message: 'Registrado Exitosamente',
                            type: 'success',
                        });
                        this.$router.push({ path: '/admin/usuarios' });
                    }
                });
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
        nivelesUsuario() {
            return this.$store.getters.getnivelesUsuarios;
        }
    }
};
</script>
<style>
  .selectMail{
    width: 110px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>