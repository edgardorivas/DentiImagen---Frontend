<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 v-if="usuarioDetalle && usuarioDetalle.data"
                            class="font-semibold text-xl text-blueGray-700 uppercase">
                            Editando el usuario <i
                                class="text-verdiAnderson font-extrabold">@{{ usuarioDetalle.data[0].usuario }}</i>
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">
                    <div v-if="usuarioDetalle && usuarioDetalle.data">
                        
                        <form @submit.prevent="modificarUsuario(usuarioDetalle.data[0])">
                            <div class="flex flex-wrap justify-around">
                                <div class="w-11/12">
                                    <el-divider>Datos del Trabajador</el-divider>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Nombres</p>
                                        <el-input placeholder="Nombres del trabajador" auto-complete="name"
                                            v-model="usuarioDetalle.data[0].nombre"></el-input>
                                    </label>
                                </div>

                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Apellidos</p>
                                        <el-input placeholder="Apellidos del trabajador" auto-complete="family-name"
                                            v-model="usuarioDetalle.data[0].apellido"></el-input>
                                    </label>
                                </div>

                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Nombre de Usuario</p>
                                        <el-input placeholder="Nombre de usuario del trabajador" 
                                            v-model="usuarioDetalle.data[0].usuario"></el-input>
                                    </label>
                                </div>

                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Correo</p>
                                        <el-input placeholder="Correo del trabajador" type="email" auto-complete="email"
                                            v-model="usuarioDetalle.data[0].correo"></el-input>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Telefono</p>
                                        <el-input placeholder="Telefono del trabajador" type="tel" auto-complete="tel"
                                            v-model="usuarioDetalle.data[0].telefono"></el-input>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Especialización</p>
                                        <el-select disabled v-model="usuarioDetalle.data[0].especializacion"
                                            placeholder="Selecciona tu Especialización" allow-create filterable
                                            class="w-full">
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
                                <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Nueva Contraseña</p>
                                        <el-input type="password" placeholder="Contraseña del trabajador" minlength="8"
                                            auto-complete="new-password" v-model="usuarioDetalle.data[0].clave"
                                            show-password></el-input>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Confirmar Contraseña</p>
                                        <el-input type="password" placeholder="Contraseña del trabajador" minlength="8"
                                            auto-complete="confirm-password" 
                                            v-model="usuarioDetalle.data[0].claveRecuperacion" show-password></el-input>
                                    </label>
                                </div>

                                <div v-if="usuarioDetalle.data[0].rol"
                                    class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Nivel / Rol</p>
                                        <el-select disabled v-model="usuarioDetalle.data[0].rol"
                                            class="w-full">
                                            <el-option  
                                                :label="usuarioDetalle.data[0].rol"
                                                :value="usuarioDetalle.data[0].id_rol"></el-option>
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
                                            v-model="usuarioDetalle.data[0].pregunta_uno"></el-input>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Respuesta</p>
                                        <el-input placeholder="Respuesta de Seguridad"
                                            v-model="usuarioDetalle.data[0].respuesta_uno"></el-input>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Pregunta</p>
                                        <el-input placeholder="Pregunta de Seguridad"
                                            v-model="usuarioDetalle.data[0].pregunta_dos"></el-input>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Respuesta</p>
                                        <el-input placeholder="Respuesta de Seguridad"
                                            v-model="usuarioDetalle.data[0].respuesta_dos"></el-input>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Pregunta</p>
                                        <el-input placeholder="Pregunta de Seguridad"
                                            v-model="usuarioDetalle.data[0].pregunta_tres"></el-input>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Respuesta</p>
                                        <el-input placeholder="Respuesta de Seguridad"
                                            v-model="usuarioDetalle.data[0].respuesta_tres"></el-input>
                                    </label>
                                </div>
                            </div>
                            <br>
                            <div class="flex flex-wrap justify-around">
                                <el-popconfirm confirm-button-text='Si, Eliminar' confirm-button-type="danger"
                                    cancel-button-text='No, Cancelar' icon="el-icon-info" icon-color="red"
                                    :title="`Estas seguro de eliminar el usuario ${usuarioDetalle.data[0].usuario}?`"
                                    class="w-full md:w-1/3" @confirm="eliminarUsuario(usuarioDetalle.data[0])">
                                    <button slot="reference" :disabled="loading"
                                        class="w-full bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                        type="button">Eliminar</button>
                                </el-popconfirm>
                                <button :disabled="loading"
                                    class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                    type="submit">Guardar</button>
                            </div>
                        </form>
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
    name: "users-add",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Editar Usuario",
    },
    created() {
        this.$store.dispatch('obtenerDetalleUsuario', { id: this.$route.params.ID });
    },
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        async modificarUsuario(payload) {
            try {
                console.log(typeof payload.clave)

                if((typeof payload.clave !== 'undefined' || typeof payload.claveRecuperacion !== 'undefined') && 
                payload.clave != payload.claveRecuperacion){

                    this.$message({
                        message: 'La clave enviada no concuerdan',
                        type: 'warning',
                    });

                }
                else{
                    this.$store.dispatch('getLoadingApp', true);
                    this.loading = true;
                    const token = localStorage.getItem('token_acess');
                    const request = await axios({
                        method: 'PATCH',
                        baseURL: config.backend.baseURL,
                        url: '/usuario/' + payload.id_usuario,
                        headers: {
                            ['auth-token']: token,
                        },
                        data: payload
                    });
                    this.$store.dispatch('getLoadingApp', false);
                    this.loading = false;
                    this.$message({
                        message: 'Modificado Exitosamente',
                        type: 'success',
                    });
                    this.$router.push({ path: '/admin/usuarios' });
                }


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

        async eliminarUsuario(payload) {
            try {
                console.log(payload)
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'DELETE',
                    baseURL: config.backend.baseURL,
                    url: '/usuario/' + payload.id_usuario,
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
                this.$router.push({ path: '/admin/usuarios' });
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
        usuarioDetalle() {
            return this.$store.getters.getdetalleUsuarioId;
        },
        nivelesUsuario() {
            return this.$store.getters.getnivelesUsuarios;
        }
    }
};
</script>
<style lang="scss">.el-button--danger {
    background-color: #dc2626;
}</style>
