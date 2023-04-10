<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">

                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-3 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Recibo de Venta
                        </h3>
                    </div>
                </div>

                <div >
                    <el-steps align-center :active="active" finish-status="success">
                        <el-step title="Datos basicos"></el-step>

                        <el-step title="Servicios aplicados"></el-step>

                        <el-step title="Materiales invertidos"></el-step>

                    </el-steps>
                </div>

                <div class="flex justify-center w-full sm:px-5 md:px-20 lg:px-36">
                    <form class="w-full" @submit.prevent="registrarCompra()">

                        <div v-if="active == 1" class="my-10 flex flex-wrap justify-around">

                            <div v-if="usuarios && usuarios.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Odontologo</p>
                                    <el-select v-model="datosVenta.idTrabajador" placeholder="Seleccione el Odontologo"
                                        class="w-full">
                                        <div v-for="item in usuarios.data" :key="item.id">
                                            <el-option v-if="item.rol == 'Odontologo'"
                                                :label="`${item.nombre} - ${item.especializacion}`"
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
                                            :label="`${item.nombre_paciente} ${item.apellido_paciente}`"
                                            :value="item.id_paciente"></el-option>
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
                                    <p class="ml-1">Iva</p>
                                    <el-input placeholder="Iva de la venta" type="number"
                                        v-model="datosVenta.ivaVenta"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Precio del dolar</p>
                                    <el-input placeholder="Monto del Dolar Actual en Bs" type="number" min="1" step="any"
                                        v-model="datosVenta.precioDolar"></el-input>
                                </label>
                            </div>

                        </div>

                        <div v-if="active == 2"  class="my-10 flex flex-wrap justify-around  " >


                            <div  class=" md:w-1/2 lg:w-3/6 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Servicios</p>
                                    <el-select v-model="serviciosIngresados" placeholder="Seleccione el Odontologo" class="w-full">

                                        <el-option
                                            label="`${item.nombre} - ${item.especializacion}`"
                                            value="1">
                                        </el-option>

                                    </el-select>
                                </label>
                            </div>


                            <div class="md:w-1/2 lg:w-3/6 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Costo del servicio</p>
                                    <el-input placeholder="Costo del servicio" type="number"
                                        v-model="datosVenta.ivaVenta"></el-input>
                                </label>
                            </div>

                            <button type="button"
                                class="  md:w-1/5 py-2 text-white bg-verdiAnderson transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase rounded-md" @click="next">
                                Ingresar
                            </button>



                            <!-- Se agrega la tabla para los items -->
                            <div v-if="serviciosIngresados.length" class="w-11/12 mt-10  m-0 p-0">
                                <div class="w-11/12">
                                    <el-divider>Servicios aplicados</el-divider>
                                </div>

                                <!-- <div class="  flex flex-row-reverse my-2 mr-5">
                                    <button @click="centerDialogVisible = true"
                                        class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button">
                                        Agregar Materiales usados
                                    </button>
                                </div> -->

                                <!-- <div v-if="aviso" class=" w-1/3 justify-center flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Danger</span>
                                    <div>
                                        <span class="font-medium">Consideraciones para registrar un pago</span>
                                        <ul class="mt-1.5 ml-4 list-disc list-inside">
                                            <li>Se tiene que tener servicios registrados</li>
                                            <li>Mantener al dia el inventario</li>
                                            <li>A ver registrado el paciente previamente</li>
                                        </ul>
                                    </div>
                                </div> -->

                                <el-table :data="datosVenta.venta" class="w-full mt-10 ">
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




                        <div v-if="active== 3" class="flex flex-wrap justify-around mt-5">


                            <div class="w-11/12 mt-10  m-0 p-0">

                                <div class="  flex flex-row-reverse my-2 mr-5">
                                    <button @click="centerDialogVisible = true"
                                        class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button">
                                        Agregar Materiales usados
                                    </button>
                                </div>
                                <el-table :data="datosVenta.venta" class="w-full mt-10 mb-10 ">
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

                            <button :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                Guardar
                            </button>

                        </div>
                        <div class="flex flex-wrap  justify-end my-5">
                            <button type="button"
                                class="w-full bg-none md:w-1/3  text-verdiAnderson transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md" @click="next">
                                Siguiente ->
                            </button>
                        </div>



                    </form>
                    <!-- Modal para agregar Servicio -->

                    <el-dialog title="Agregar los datos de los materiales" :visible.sync="centerDialogVisible" width="30%" center>
                        <div class="flex flex-wrap justify-around">

                            <div class="w-full md:w-1/2  px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Material</p>
                                    <el-input placeholder="Unidades compradas" type="number"
                                        auto-complete="email"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2  px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Unidades Utilizadas</p>
                                    <el-input placeholder="Unidades compradas" type="number"
                                        auto-complete="email"></el-input>
                                </label>
                            </div>



                        </div>


                        <div slot="footer" class="dialog-footer flex flex-wrap justify-around">
                            <button slot="reference" :disabled="loading"
                                class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                @click="centerDialogVisible = false" type="button">
                                Cerrar
                            </button>
                        </div>

                    </el-dialog>



                    <!-- <el-drawer title="Agregando Servicio" :visible.sync="modal" direction="rtl" :before-close="handleClose">
                        <div v-if="servicios && servicios.data" class="h-full">
                            <div class="flex flex-col content-between justify-between h-full">
                                <div class="flex flex-col">
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
                    </el-drawer> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from "../../../../config";
import axios from "axios";
export default {
    name: "ventas-registro",
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
            activeName: '1',
            aviso: true,
            active: 1,
            serviciosIngresados:[],

            datosVenta: {
                idPaciente: null,
                idTrabajador: null,
                formaPago: null,
                referencia: null,
                ivaVenta: "12",
                precioDolar: null,
                servicios:[]
            },

            centerDialogVisible: false,
            loading: false,
        };
    },
    methods: {
        next() {
            if (this.active++ > 2) this.active = 1;
        }
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
