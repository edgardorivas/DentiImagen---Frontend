<template>
    <!-- error:despues de rellenar el formulario y enviarlo no se oculta de nueva la parte inferior del formulario-->
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
                                    <el-select v-model="datosVenta.idTrabajador" placeholder="Formas de pago" class="w-full">
                                        <div v-for="item in usuarios.data" :key="item.id">
                                            <el-option v-if="item.especializacion== 'Odontologo' || item.especializacion== 'dentista'" :label="item.nombre" :value="item.id"></el-option>
                                        </div>
                                    </el-select>
                                </label>
                            </div>

                            <div v-if="pacientes && pacientes.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Paciente</p>
                                    <el-select v-model="datosVenta.idPaciente" placeholder="Paciente" class="w-full">
                                        <el-option v-for="item in pacientes.data" :key="item.id_paciente" :label="item.nombre_paciente"
                                            :value="item.id_paciente"></el-option>
                                    </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Forma de pago</p>
                                    <el-select v-model="datosVenta.formaPago" placeholder="Formas de pago" class="w-full">
                                        <el-option v-for="item in opciones" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
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
                                    <el-input placeholder="Iva de la venta" type="number"
                                        v-model="datosVenta.precioDolar"></el-input>
                                </label>
                            </div>

                            <div class="w-11/12">
                                <el-divider>Datos de los servicios</el-divider>
                            </div>

                            <div v-if="servicios && servicios.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Servicios</p>
                                    <el-select v-model="detallesVenta.servicio" placeholder="Servicios" class="w-full">
                                        <div v-for="item in servicios.data" :key="item.id">
                                            <el-option :label="item.nombre" :value="item.id"></el-option>
                                        </div>
                                    </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cantidad</p>
                                    <el-input placeholder="Cantidad" type="number"
                                        v-model="detallesVenta.cantidad"></el-input>
                                </label>
                            </div>


                            <div v-if="producto && producto.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Materiales</p>
                                    <el-select v-model="datosMateriales.id" placeholder="Materiales" class="w-full">
                                        <div v-for="item in producto.data" :key="item.id">
                                            <el-option :label="item.nombre" :value="item.id"></el-option>
                                        </div>
                                    </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cantidad Materiales</p>
                                    <el-input placeholder="Cantidad de materiales" type="number"
                                        v-model="datosMateriales.cantidad"></el-input>
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
                        <div class="flex flex-wrap justify-around" >
                                
                            <button v-on:click="agregarVenta()"  type="button" :disabled="loading"
                                class="w-full md:w-1/3 bg-red-300 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Agregar Servicios</button>
                                    

                            <button :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Guardar</button>
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
            
            datosVenta: {
                idPaciente: null,
                idTrabajador: null,
                formaPago: null,
                referencia: null,
                ivaVenta: null,
                precioDolar:null,
                venta:[]
            },
            detallesVenta:{
                servicio: null,
                cantidad: null,
                materiales:[]
            },
            datosMateriales:{
                id: null,
                cantidad: null
            },

            loading: false,
        };
    },
    created() {

        this.$store.dispatch('obtenerListaDeproducto');

        this.$store.dispatch('obtenerListaDeServicios');
        
        this.$store.dispatch("obtenerListaDeUsuarios");

        this.$store.dispatch("obtenerListaDePacientes");

    },
    methods: {
        
        agregarVenta() {

            this.detallesVenta.materiales.push(this.datosMateriales);
            this.datosVenta.venta.push(this.detallesVenta);

            this.datosMateriales={
                id: null,
                cantidad: null
            }

            this.detallesVenta={
                servicio: null,
                cantidad: null,
                materiales:[]
            }

        },
        async registrarCompra() {
            try {
                this.agregarVenta(this.datosRecurso)

                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'POST',
                    baseURL: config.backend.baseURL,
                    url: '/venta',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: this.datosVenta
                });
                console.log(request)
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
            
            }
        },
    },
    computed: {
       
        usuarios() {
            return this.$store.getters.getusuarios;
        },
        pacientes() {
            return this.$store.getters.getPacientes;
        },
        producto () {
           return this.$store.getters.getproducto;
        },
        servicios () {
           return this.$store.getters.getServicios;
        },
    },
    
};
</script>
