<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Recibo de Compra
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">
                    <form>
                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Datos del basicos del recibo de compra</el-divider>
                            </div>
                            <div v-if="usuarios && usuarios.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Trabajador</p>
                                    <el-select v-model="datos.idtrabajador" placeholder="Formas de pago" class="w-full">
                                        <el-option v-for="item in usuarios.data" :key="item.id" :label="item.nombre"
                                            :value="item.id"></el-option>
                                    </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Forma de pago</p>
                                    <el-select v-model="datos.formaPago" placeholder="Formas de pago" class="w-full">
                                        <el-option v-for="item in opciones" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Fecha Compra</p>
                                    <el-input placeholder="Fecha de la compra" type="date" auto-complete="tel"
                                        v-model="datos.fechaCompra"></el-input>
                                </label>
                            </div>

                            <div v-if="proveedores && proveedores.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Proveedor</p>
                                    <el-select v-model="datos.idProvedor" placeholder="Formas de pago" class="w-full">
                                        <el-option v-for="item in proveedores.data" :key="item.id_provedor"
                                            :label="item.nombre_proveedor" :value="item.id_provedor"></el-option>
                                    </el-select>
                                </label>
                            </div>

                            <el-divider v-if="proveedorMateriales && proveedorMateriales.data">Datos del la
                                materiacomprada</el-divider>

                            <div v-if="proveedorMateriales && proveedorMateriales.data"
                                class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Materiales</p>
                                    <el-select v-model="datosRecurso.idRecurso" placeholder="Materiales" class="w-full">
                                        <el-option v-for="item in proveedorMateriales.data" :key="item.id_recurso"
                                            :label="item.nombre_recurso" :value="item.id_recurso"></el-option>
                                    </el-select>
                                </label>
                            </div>

                            <div v-if="proveedorMateriales && proveedorMateriales.data"
                                class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Unidades Compradas</p>
                                    <el-input placeholder="Unidades compradas" type="number" auto-complete="email"
                                        v-model="datosRecurso.unidades"></el-input>
                                </label>
                            </div>
                            <div v-if="proveedorMateriales && proveedorMateriales.data"
                                class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Costo en Bolivares</p>
                                    <el-input placeholder="Costo en Bolivares" type="number" auto-complete="tel"
                                        v-model="datosRecurso.costoB"></el-input>
                                </label>
                            </div>
                            <div v-if="proveedorMateriales && proveedorMateriales.data"
                                class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Costo en Dolares</p>
                                    <el-input placeholder="Costo en Dolares" type="number"
                                        v-model="datosRecurso.costoD"></el-input>
                                </label>
                            </div>


                        </div>
                    <!--
                    <div>
                        <el-table :data="datos.recurso" class="w-full">
                            <el-table-column prop="unidades" label="Nombres"></el-table-column>
                            <el-table-column prop="unidades" label="Apellidos"></el-table-column>
                            <el-table-column prop="unidades" label="Correo Electronico"></el-table-column>
                        </el-table>

                    </div>
-->
                        <div class="flex flex-wrap justify-around">
                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <button @click="agregarRecurso(datosRecurso)" type="button"
                                    class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                    agregar materia
                                </button>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                <button type="button" @click="registrarCompra()"
                                    class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from "../../../../config";
import axios from "axios";
export default {
    name: "users-add",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Agregar nuevo usuario",
    },
    data() {
        return {

            opciones: [
                {
                    value: "Pago Movil",
                    label: "Pago Movil",
                },
                {
                    value: "Transferencias",
                    label: "Transferencias",
                },
                {
                    value: "Divisa",
                    label: "Divisa",
                },
            ],
            datos: {
                idtrabajador: null,
                formaPago: null,
                fechaCompra: null,
                idProvedor: "",
                recurso: [],
            },
            datosRecurso: {
                idRecurso: null,
                unidades: null,
                costoB: null,
                costoD: null,
            },

            loading: false,
        };
    },
    created() {
        this.$store.dispatch("obtenerListaDeproducto");
        this.$store.dispatch("obtenerListaDeProveedores");
        this.$store.dispatch("obtenerListaDeUsuarios");
    },
    methods: {
        async buscarMaterialProveedor() {
            try {
                alert("entro");
                this.$store.dispatch("getLoadingApp", true);
                this.loading = true;
                const token = localStorage.getItem("token_acess");
                const request = await axios({
                    method: "POST",
                    baseURL: config.backend.baseURL,
                    url: "/recurso/proveedor",
                    headers: {
                        ["auth-token"]: token,
                    },
                    data: this.datos.idProvedor,
                });
                this.$store.dispatch("getLoadingApp", false);
                this.loading = false;
                this.proveedorRecurso = request;
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
        },
        agregarRecurso(valor) {

            this.datos.recurso.push(valor)
            this.datosRecurso = {
                idRecurso: null,
                unidades: null,
                costoB: null,
                costoD: null,
            }
        },
        async registrarCompra() {
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'POST',
                    baseURL: config.backend.baseURL,
                    url: '/compra',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: this.datos
                });
                this.$store.dispatch('getLoadingApp', false);
                this.loading = false;
                this.$message({
                    message: 'Registrado Exitosamente',
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
    },
    computed: {
        materiales() {
            return this.$store.getters.getproducto;
        },
        proveedorMateriales: function () {
            return this.$store.getters.getMaterialesProveedor;
        },
        proveedores() {
            return this.$store.getters.getProveedores;
        },
        usuarios() {
            return this.$store.getters.getusuarios;
        },
    },
    watch: {
        "datos.idProvedor"(newValue) {
            this.$store.dispatch("obtenerMaterialesProveedor", {
                id_proveedor: newValue,
            });
        },
    },
};
</script>
