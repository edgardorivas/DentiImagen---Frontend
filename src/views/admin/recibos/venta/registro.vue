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
                    <form class="w-full">

                    <!-- <form class="w-full" @submit.prevent="registrarCompra()"> -->
                        <div v-if="active == 1" class="my-10 flex flex-wrap justify-around">

                            <div v-if="usuarios && usuarios.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Odontologo</p>
                                    <el-select v-model="datosVenta.idTrabajador" placeholder="Seleccione el Odontologo"
                                        class="w-full">
                                        <div v-for="item in usuarios.data" :key="item.id_trabajador">
                                            <el-option v-if="item.rol == 'Odontologo'"
                                                :label="`${item.nombre} - ${item.especializacion}`"
                                                :value="item.id_trabajador"></el-option>
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
                            
                            <div v-if="servicios && servicios.data"  class=" md:w-1/2 lg:w-3/6 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Servicios</p>
                                    <el-select v-model="serviciosIngresados.idServicio" placeholder="Seleccione el Odontologo" class="w-full">
                                        <el-option  v-for="servicio in servicios.data" :key="servicio.id_servicio"
                                            :label="servicio.nombre_servicio"
                                            :value="servicio.id_servicio">
                                        </el-option>
                                    </el-select>
                                </label>
                            </div>

                            <div class="md:w-1/2 lg:w-3/6 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Veces realizadas</p>
                                    <el-input placeholder="Costo del servicio" type="number"
                                        v-model="serviciosIngresados.cantidadRealizadas"></el-input>
                                </label>
                            </div>

                            <div class="md:w-1/2 lg:w-3/6 px-2 mb-3 pt-1">
                                <label>
                                    <p class="ml-1">Costo del servicio</p>
                                    <el-input placeholder="Costo del servicio" type="number"
                                        v-model="serviciosIngresados.costoServicio"></el-input>
                                </label>
                            </div>
                            
                            <div class="md:w-1/2 lg:w-3/6 px-2 mb-3 pt-7">
                                <button type="button"
                                    class="  md:w-1/2 py-2 text-white bg-verdiAnderson transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase rounded-md" @click="asociarServiciosIngresados(serviciosIngresados)">
                                    Ingresar
                                </button>
                            </div>

                            

                            <!-- Se agrega la tabla para los items -->
                            <div v-if="datosServicioTabla.length" class="w-11/12 mt-10  m-0 p-0">
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
    
                                <el-table :data="datosVenta.servicios" class="w-full mt-10 ">
                                    <el-table-column prop="idServicio" label="Id"></el-table-column>
                                    <el-table-column v-for="dato in datosServicioTabla" :key="dato.id_servicio" class="text-center" label="Operaciones" >
                                        <template  >
                                            <p >
                                                {{ dato.nombre_servicio }}
                                            </p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="costoServicio" label="Costo"></el-table-column>
                                    <el-table-column prop="cantidadRealizadas" label="Repeticiones"></el-table-column>

                                    <el-table-column  label="Operaciones" width="170">
                                        <template slot-scope="scope">
                                            <button type="button" class="w-full text-center bg-none text-red-600 uppercase rounded-md"
                                             @click="eliminarAsociacion(datosVenta.servicios[scope.$index].idServicio)">
                                                Eliminar
                                            </button>
                                            
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

                                <el-table v-if="datosMaterialesTabla.length" :data="datosMaterialesTabla" class="w-full mt-10 mb-10 ">
                                     <el-table-column prop="id_recurso" label="Id"></el-table-column>
                                     <el-table-column prop="nombre" label="Nombre "></el-table-column>
                                     <el-table-column prop="descripcion" label="Descripcion "></el-table-column>
                                     <el-table-column prop="disponible" label="Cantidad Disponible"></el-table-column>
                                     <el-table-column fixed="right" label="Operaciones" width="170">

                                         <template>

                                            <button type="button"
                                                class="  md:w-1/2 py-2 text-red-600 bg-none transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase rounded-md" @click="asociarServiciosIngresados(serviciosIngresados)">
                                                    eliminar
                                            </button>

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

{{ datosMaterialesTabla }}

                    </form>
                    <!-- Modal para agregar Servicio -->

                    <el-dialog title="Agregar los datos de los materiales" :visible.sync="centerDialogVisible" width="30%" center>
                        <div class="flex flex-wrap justify-around">
                            <div v-if="producto && producto.data"  class=" md:w-1/2 lg:w-3/6 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Material</p>
                                    <el-select v-model="materialesIngresados.idMaterial" placeholder="Seleccione el Material" class="w-full">
                                        <el-option  v-for="producto in producto.data" :key="producto.id_servicio"
                                            :label="producto.nombre"
                                            :value="producto.id_recurso">
                                        </el-option>
                                    </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2  px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Unidades Utilizadas</p>
                                    <el-input placeholder="Unidades compradas" v-model="materialesIngresados.cantidadMaterial" type="number"
                                        ></el-input>
                                </label>
                            </div>
                        </div>


                        <div slot="footer" class="dialog-footer flex flex-wrap justify-around">
                            <button slot="reference" :disabled="loading"
                                class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                @click="centerDialogVisible = false" type="button">
                                Cerrar
                            </button>
                            <button slot="reference" :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                @click="asociarMaterialesIngresados(materialesIngresados)" type="button">
                                Ingresar
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
    name: "users-add",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Agregar nuevo usuario",
    },
    created() {
        this.$store.dispatch("obtenerListaDeproducto");

        this.$store.dispatch("obtenerListaServiciosTabla");
        this.$store.dispatch("obtenerListaDeUsuarios");
        this.$store.dispatch("obtenerListaDePacientes");
    },
    data() {
        return {
            activeName: '1',
            aviso: true,
            active: 1,
            datosVenta: {
                idPaciente: null,
                idTrabajador: null,
                formaPago: null,
                ivaVenta: "12",
                precioDolar: null,
                servicios:[],
                materiales:[]
            },
            serviciosIngresados:{
                idServicio: null,
                costoServicio: null,
                cantidadRealizadas: null
            },
            materialesIngresados:{
                idMaterial:null,
                cantidadMaterial: null
            },
            datosServicioTabla:[],
            datosMaterialesTabla:[],
            centerDialogVisible: false,
            loading: false,
        };
    },
    methods: {
        next() {
            if (this.active++ > 2) this.active = 1;
        },
        asociarServiciosIngresados(datos){
            this.datosVenta.servicios.push(datos);
            this.serviciosIngresados= {
                idServicio: null,
                costoServicio: null,
                cantidadRealizadas: null
            }
            
            this.datosServicioTabla.push( this.servicios.data.filter(item => item.id_servicio == datos.idServicio)[0])
            console.log("Asociada",this.datosServicioTabla[0])
        },
        asociarMaterialesIngresados(datos){
            this.datosVenta.materiales.push(datos);

            this.materialesIngresados={
                idMaterial:null,
                cantidadMaterial: null
            }
            // console.log("datos enviados-------------------",datos)
            // console.log("datos guardados-------------------",this.datosVenta)
            // console.log("datos materia---------------",this.producto.data)
            
            this.datosMaterialesTabla.push( this.producto.data.filter(item => item.id_recurso == datos.idMaterial)[0] )
            console.log("datos materia---------------",this.datosMaterialesTabla)
            this.centerDialogVisible = false
        },
        eliminarAsociacion(datos){
            console.log(datos)
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
            return this.$store.getters.getListaServicios;
        }
    },
    
};
</script>
