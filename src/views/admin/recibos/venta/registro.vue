<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Recibo de Venta
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">
                    <form id="formulario-compra" @submit.prevent="registrarCompra()">
                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Datos del basicos del recibo de Venta</el-divider>
                            </div>

                            <div v-if="usuarios && usuarios.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Odontologo</p>
                                    <el-select v-model="datosVenta.idTrabajador" placeholder="Seleccione el Odontologo"
                                        class="w-full">
                                        <div v-for="item in usuarios.data" :key="item.id">
                                            <el-option v-if="item.especializacion == 'Odontologo'" :label="item.nombre"
                                                :value="item.id"></el-option>
                                        </div>
                                    </el-select>
                                </label>
                            </div>
                            <div v-if="pacientes && pacientes.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Paciente</p>
                                    <el-select v-model="datosVenta.idPaciente" placeholder="Paciente" class="w-full">
                                        <el-option v-for="item in pacientes.data" :key="item.id_paciente"
                                            :label="item.nombre_paciente" :value="item.id_paciente"></el-option>
                                    </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Forma de pago</p>
                                    <el-select v-model="datosVenta.formaPago" placeholder="Formas de pago" class="w-full">
                                        <el-option label="Pago Movil" value="Pago Movil"></el-option>
                                        <el-option label="Transferencias" value="Transferencias"></el-option>
                                        <el-option label="Divisa" value="Divisa"></el-option>
                                    </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Referencia</p>
                                    <el-input placeholder="Referencia del pago" type="text"
                                        v-model="datosVenta.referencia"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Iva</p>
                                    <el-input placeholder="Iva de la venta" type="number"
                                        v-model="datosVenta.ivaVenta"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Valor del Dolar</p>
                                    <el-input placeholder="Monto del Dolar Actual en Bs" type="number" min="1" step="any"
                                        v-model="datosVenta.precioDolar"></el-input>
                                </label>
                            </div>

                            <div class="w-11/12">
                                <el-divider>Datos de los servicios</el-divider>
                            </div>

                            <div class="w-11/12 m-0 p-0">
                                <div class="flex flex-row-reverse my-2 mr-5">
                                    <button type="button"
                                        class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                        Agregar Item
                                    </button>
                                </div>
                                <el-table :data="datosVenta.venta" class="w-full">
                                    <el-table-column prop="Servicio" label="Servicio"></el-table-column>
                                    <el-table-column prop="Servicio" label="Cantidad de Servicio"></el-table-column>
                                    <el-table-column prop="Servicio" label="Materiales"></el-table-column>
                                    <el-table-column fixed="right" label="Operaciones" width="170">
                                        <template>
                                            <p class="text-center">
                                                Eliminar
                                            </p>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>

                        <div class="flex flex-wrap justify-around mt-5">
                            <button :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                Guardar
                            </button>
                        </div>
                    </form>
                    <!-- Modal para agregar Servicio -->
                    <el-drawer title="Agregando Servicio" :visible.sync="modal" direction="rtl" :before-close="handleClose">
                        <div v-if="servicios && servicios.data" class="h-full">
                            <div class="flex flex-col content-between justify-between h-full">
                                <div class="flex flex-col">
                                    <!-- Contenido -->
                                    <div class="w-full px-2 mb-3 py-1">
                                        <label>
                                            <p class="ml-1 mb-1">Seleccione el Servicio</p>
                                            <el-select v-model="detallesVenta.servicio" placeholder="Seleccione el servicio"
                                                class="w-full">
                                                <el-option v-for="servicio of servicios.data" :key="servicio.id"
                                                    :label="`${servicio.nombre} - Costo: $${servicio.costo}`"
                                                    :value="servicio.id"></el-option>
                                            </el-select>
                                        </label>
                                    </div>
                                    <div class="w-full px-2 mb-3 py-1">
                                        <label>
                                            <p class="ml-1 mb-1">Cantidades del Servicio</p>
                                            <el-input-number class="w-full" v-model="detallesVenta.cantidad"
                                                min="1"></el-input-number>
                                        </label>
                                    </div>
                                    <div class="w-full px-2 mb-3 py-1">
                                        <el-divider>Materiales / Productos</el-divider>
                                    </div>
                                    <div v-if="detallesVenta.materiales.length" class="w-full px-2 mb-3 py-1">
                                        <ul class="ml-3">
                                            <li v-for="(item, index) of detallesVenta.materiales" :key="index">
                                                <div class="flex flex-wrap justify-around">
                                                    <div class="uppercase">☑️ {{ item.nombreMaterial }} | Cantidad:
                                                        {{ item.cantidad }}</div>
                                                    <button type="button" @click="eliminarDetalleMaterial(index)"
                                                        class="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Eliminar</button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="w-full px-2 mb-3 py-1">
                                        <label>
                                            <p class="ml-1 mb-1">Seleccione el Material / Producto</p>
                                            <el-select v-model="datosMateriales.id"
                                                placeholder="Seleccione el material / producto" class="w-full">
                                                <el-option v-for="material of producto.data" :key="material.id"
                                                    :label="`${material.nombre} - Costo: $${material.costo}`"
                                                    :value="material.id"></el-option>
                                            </el-select>
                                        </label>
                                    </div>
                                    <div class="w-full px-2 mb-3 py-1">
                                        <label>
                                            <p class="ml-1 mb-1">Cantidades del Material / Producto</p>
                                            <el-input-number class="w-full" size="small" v-model="datosMateriales.cantidad"
                                                min="1"></el-input-number>
                                        </label>
                                    </div>
                                    <div class="w-full px-2 mb-3 py-1 flex justify-center">
                                        <button @click="agregarDetalleMaterial" type="button"
                                            class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                            Agregar Material al Servicio
                                        </button>
                                    </div>

                                    <!-- Fin del contenido -->
                                </div>
                                <div>
                                    <button @click="agregarDetalleVenta"
                                        class="w-full bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2"
                                        type="button">
                                        Agregar a Venta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </el-drawer>
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
    created() {
        this.$store.dispatch("obtenerListaDeproducto");
        this.$store.dispatch("obtenerListaDeServicios");
        this.$store.dispatch("obtenerListaDeUsuarios");
        this.$store.dispatch("obtenerListaDePacientes");
    },
    data() {
        return {
            datosVenta: {
                idPaciente: null,
                idTrabajador: null,
                formaPago: null,
                referencia: null,
                ivaVenta: "12",
                precioDolar: null,
                venta: [],
            },
            detallesVenta: this.getDetallesVenta(),
            datosMateriales: this.getDetallesMateriales(),
            modal: true,
            loading: false,
        };
    },
    methods: {
        agregarVenta() {
            this.detallesVenta.materiales.push(this.datosMateriales);
            this.datosVenta.venta.push(this.detallesVenta);

            this.datosMateriales = {
                id: null,
                cantidad: null,
            };

            this.detallesVenta = {
                servicio: null,
                cantidad: null,
                materiales: [],
            };
        },
        async registrarCompra() {
            try {
                this.agregarVenta(this.datosRecurso);

                this.$store.dispatch("getLoadingApp", true);
                this.loading = true;
                const token = localStorage.getItem("token_acess");
                const request = await axios({
                    method: "POST",
                    baseURL: config.backend.baseURL,
                    url: "/venta",
                    headers: {
                        ["auth-token"]: token,
                    },
                    data: this.datosVenta,
                });
                console.log(request);
                this.$store.dispatch("getLoadingApp", false);
                this.loading = false;
                this.$message({
                    message: "Registrado Exitosamente",
                    type: "success",
                });
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
            }
        },
        handleClose() {
            this.modal = false;
        },
        getDetallesVenta() {
            return {
                servicio: null,
                nombreServicio: null,
                cantidad: null,
                materiales: [],
            };
        },
        agregarDetalleVenta() {
            const detalleVenta = this.detallesVenta;
            if (!detalleVenta || !detalleVenta.servicio) {
                return this.$message({
                    message: "No puedes agregar este item hasta que selecciones el servicio",
                    type: "error",
                });
            }
            if (!detalleVenta.materiales.length) {
                return this.$message({
                    message: "Debes agregar los materiales que usaste",
                    type: "error",
                });
            }
            this.datosVenta.venta.push(detalleVenta);
            this.detallesVenta = this.getDetallesVenta();
            this.datosMateriales = this.getDetallesMateriales();
            this.modal = false;
        },
        getDetallesMateriales() {
            return {
                id: null,
                nombreMaterial: null,
                cantidad: null,
            }
        },
        agregarDetalleMaterial() {
            const detalleMaterial = this.datosMateriales;
            if (!detalleMaterial || !detalleMaterial.id) {
                return this.$message({
                    message: "No puedes agregar este item hasta que selecciones el material",
                    type: "error",
                });
            }
            const material = this.producto.data.filter(item => item.id == detalleMaterial.id);
            detalleMaterial.nombreMaterial = material[0].nombre;
            this.detallesVenta.materiales.push(detalleMaterial);
            this.datosMateriales = this.getDetallesMateriales();
        },
        eliminarDetalleMaterial(index) {
            this.detallesVenta.materiales.splice(index, 1)
        },
    },
    computed: {
        usuarios() {
            return this.$store.getters.getusuarios;
        },
        pacientes() {
            return this.$store.getters.getPacientes;
        },
        producto() {
            return this.$store.getters.getproducto;
        },
        servicios() {
            return this.$store.getters.getServicios;
        },
    },
};
</script>
