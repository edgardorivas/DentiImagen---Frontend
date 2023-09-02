<template>
    <div>
        <a class="text-blueGray-500 block" href="#pablo" ref="btnDropdownRef" v-on:click="toggleDropdown($event)">
            <div class="items-center flex">
                <span
                    class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                    <img alt="..." class="w-full rounded-full align-middle border-none shadow-lg"
                        src="../../assets/avatar_masculino.svg" />
                </span>
            </div>
        </a>
        <div ref="popoverDropdownRef"
            class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48" v-bind:class="{
                hidden: !dropdownPopoverShow,
                block: dropdownPopoverShow,
            }">
            <div v-if="getmiUsuario && getmiUsuario.id_usuario" v-on:click="toggleDropdown">
                <router-link :to="`/admin/usuarios/${getmiUsuario.id_usuario}`"
                    class="py-1 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">

                    <el-button class="w-full border-none text-left text-blueGray-700">Perfil</el-button>
                </router-link>

                <el-container v-if="getmiUsuario.id_rol == 1">
                    <el-button @click="respaldoBaseDatos()"
                        class="w-full py-4 border-none text-left text-blueGray-700">Respaldo</el-button>
                </el-container>
                <el-container v-if="getmiUsuario.id_rol == 1">
                    <el-button @click="restauracionBaseDatos()"
                        class="w-full py-4 border-none text-left text-blueGray-700">Restauracion</el-button>
                </el-container>
            </div>


            <div class="h-0 my-2 border border-solid border-blueGray-100"> </div>
            <router-link to="/logout"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Cerrar Sesion
            </router-link>
        </div>
        <!-- Modal para respaldo -->
        <!-- <el-dialog title="Confirmacion de respaldo de la base de datos" :visible.sync="centerDialogVisible" width="30%"
            center>
            <p class="px-2 mb-4 text-center">Respaldo</p>

            <div slot="footer" class="dialog-footer flex flex-wrap justify-around">
                <button slot="reference" :disabled="loading"
                    class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                    @click="centerDialogVisible = false" type="button">Cerrar</button>

                <button :disabled="loading"
                    class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                    type="button" v-on:click="respaldoBaseDatos()">Guardar</button>
            </div>

        </el-dialog> -->
    </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
import config from "../../config";
import axios from "axios";
import image from "@/assets/img/team-1-800x800.jpg";

export default {
    data() {
        return {
            dropdownPopoverShow: false,
            image: image,
            respaldo: false,
            restauracion: false,
            centerDialogVisible: true,
            loading: false
        };
    },
    methods: {
        toggleDropdown: function (event) {
            event.preventDefault();
            if (this.dropdownPopoverShow) {
                this.dropdownPopoverShow = false;
            } else {
                this.dropdownPopoverShow = true;
                createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
                    placement: "bottom-start",
                });
            }
        },
        async respaldoBaseDatos() {
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: '/respaldo',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: this.datos
                });
                this.$store.dispatch('getLoadingApp', false);
                this.loading = false;
                this.$message({
                    message: request.data.mensaje,
                    type: 'success',
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
        async restauracionBaseDatos() {
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: '/restauracion',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: this.datos
                });
                console.log("paso por aquiiiiii")
                this.$store.dispatch('getLoadingApp', false);
                this.loading = false;
                localStorage.removeItem('token_acess');
                this.$router.push({ path: '/auth/login' });
                // await this.reiniciarServidor()

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
        async reiniciarServidor() {
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'POST',
                    baseURL: config.backend.baseURL,
                    url: '/reiniciarServidor',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: this.datos
                });
                this.$store.dispatch('getLoadingApp', false);
                this.loading = false;
                localStorage.removeItem('token_acess');
                this.$router.push({ path: '/auth/login' });
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
        getmiUsuario() {
            return this.$store.getters.getmiUsuario;
        }

    },
    created() {

    }
};
</script>
