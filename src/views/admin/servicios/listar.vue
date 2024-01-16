<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                    <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 class="font-semibold  text-blueGray-700">
                                Lista de Servicios
                            </h3>
                        </div>
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button v-on:click="modalServicio()"
                                class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                Agregar nuevo
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <div v-if="servicios && servicios.data">

                        <template class="relative h-32 w-6/12 ">
                            <el-input v-model="search" class="h-1/6 w-2/12 ml-10" placeholder="Buscar" />
                        </template>

                        <el-table :data="servicios.data.filter(data => !search ||
                            data.nombre_servicio.toLowerCase().includes(search.toLowerCase()))" class="w-full p-10">

                            <el-table-column prop="nombre_servicio" label="Servicio">
                                <template slot-scope="scope">
                                    <router-link :to="`/admin/servicios/${scope.row.id_servicio}`"
                                        class=" text-verdiAnderson">
                                        {{ scope.row.nombre_servicio }}
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="descripcion" label="Descripcion"></el-table-column>
                            <el-table-column prop="costo_dolares" label="Presio"></el-table-column>

                            <el-table-column label="Operaciones">
                                <template slot-scope="scope">
                                    <p class="text-left ml-8">
                                        <router-link :to="`/admin/servicios/${scope.row.id_servicio}`"
                                            class="text-verdiAnderson  w-full">
                                            Editar
                                        </router-link>
                                    </p>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else>
                        <h3> No Exisiten servicios registrados</h3>
                    </div>
                </div>
                <!-- modal del nuevo servicio -->
                <el-dialog title="Nuevo Servicio" :visible.sync="centerDialogVisibleNuevoServicio" width="30%" center>
                    <div class="flex flex-wrap justify-around">
                        <el-form label-position="top" class="w-96" :model="nuevoServicio" :rules="rules"
                            ref="registrarServicio">

                            <label>
                                <p class="ml-1">Nombre</p>
                                <el-form-item prop="nombre">
                                    <el-input placeholder="Nombre del servicio" v-model="nuevoServicio.nombre"></el-input>
                                </el-form-item>
                            </label>
                            <label>
                                <p class="ml-1">Valor del servicio</p>
                                <el-form-item prop="costo">
                                    <el-input placeholder="Costo del servicio" type="number"
                                        v-model="nuevoServicio.costo"></el-input>
                                </el-form-item>
                            </label>
                            <label>
                                <p class="ml-1">Descripcion</p>
                                <el-form-item prop="descripcion">
                                    <el-input placeholder="Descripcion del servicio"
                                        v-model="nuevoServicio.descripcion"></el-input>
                                </el-form-item>
                            </label>
                        </el-form>
                    </div>

                    <div slot="footer" class="dialog-footer flex flex-wrap justify-around">
                        <button slot="reference" :disabled="loading"
                            class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                            @click="centerDialogVisibleNuevoServicio = false" type="button">
                            Cerrar
                        </button>
                        <button slot="reference" :disabled="loading"
                            class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                            v-on:click="registrarServicio" type="button">
                            Ingresar
                        </button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import config from "../../../config";
import axios from "axios";
export default {
    name: "listar-servicios",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Lista de Pacientes",
    },
    created() {
        this.$store.dispatch("obtenerServicios");

    },
    data() {
        return {
            modal: false,
            search: "",
            centerDialogVisibleNuevoServicio: false,
            nuevoServicio: {
                nombre: '',
                descripcion: '',
                costo: '',
            },
            rules: {
                nombre: [
                    { required: true, message: 'Es necesario ingresar el nombre del servicio', trigger: 'change' },
                    { min: 2, message: 'El nombre del servicio tiene que ser como minimo 2 caracteres', trigger: 'change' }
                ],
                descripcion: [
                    { required: true, message: 'Es necesario ingresar la descripcion del servicio', trigger: 'change' },
                    { min: 5, message: 'La descripcion tiene que ser mayor a  5 caracteres', trigger: 'change' }
                ],
                costo: [
                    { required: true, message: 'Es necesario ingresar el costo del servicio', trigger: 'change' },
                    { min: 1, message: 'El costo del servicio tiene que ser como minimo 1 digito', trigger: 'change' }
                ],
            },
            loading: false,

        };
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        async registrarServicio() {
            this.$refs['registrarServicio'].validate(async (valid) => {
                if (valid) {
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
                        this.$store.dispatch("obtenerServicios");
                        this.centerDialogVisibleNuevoServicio = false
                        this.resetForm("registrarServicio")
                    } catch (error) {
                        console.log("entro en el error=====", error)
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
                    }
                }
            });


        },
        modalServicio() {
            this.centerDialogVisibleNuevoServicio = true;
        },

    },
    computed: {
        servicios() {
            return this.$store.getters.getServicios;
        },
    },
};
</script>
<style lang="scss">
.el-date-editor {
    width: 100% !important;
}

th {
    --tw-text-opacity: 1;
    color: rgb(0 200 165 / var(--tw-text-opacity));
}
</style>
