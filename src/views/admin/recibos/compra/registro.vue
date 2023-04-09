<template>
    <!-- error:despues de rellenar el formulario y enviarlo no se oculta de nueva la parte inferior del formulario-->
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
                    <form id="formulario-compra">
                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Datos del basicos del recibo de compra</el-divider>
                            </div>
                            <div v-if="usuarios && usuarios.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Trabajador que recibe la compra</p>
                                    <el-select v-model="datos.idtrabajador"  placeholder="Trabajadores" class="w-full">
                                        <el-option v-for="item in usuarios.data"  :key="item.id" :label="`${item.nombre} - ${item.rol}`"
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
                                    <p class="ml-1">Monto Total</p>
                                    <el-input placeholder="Monto total " type="number" 
                                        v-model="datos.montoTotal"></el-input>
                                </label>
                            </div>

                            <div v-if="datos.formaPago == 'Pago Movil' || datos.formaPago == 'Transferencias' "
                             class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Referencia</p>
                                    <el-input placeholder="Referencia " type="number" 
                                        v-model="datos.referencia"></el-input>
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
                                    <el-select v-model="datos.idProvedor" placeholder="Proveedores" class="w-full">
                                        <el-option v-for="item in proveedores.data" :key="item.id_provedor"
                                            :label="item.nombre_proveedor" :value="item.id_provedor"></el-option>
                                    </el-select>
                                </label>
                            </div>
                        </div>

                        <!-- Vista para cuando se registre los materiales -->
                        <div v-if="proveedorMateriales && proveedorMateriales.data" class="flex flex-wrap justify-around">
    
                            <el-divider class="w-11/12" >
                                Datos de los materiales comprados
                            </el-divider>

                            <div class=" my-2 mr-5">
                                <button @click="centerDialogVisible = true" class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                    Agregar Item
                                </button>
                            </div>

                            <div v-if="aviso" class=" w-1/2 sm:ml-32 md:ml-36 lg:ml-96 mb-20">
                                <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Danger</span>
                                    <div>
                                        <span class="font-medium">Consideraciones para registrar los materiales comprados</span>
                                        <ul class="mt-1.5 ml-4 list-disc list-inside">
                                            <li>Tener registrados previamente los materiales</li>
                                            <li>Asociar los materiales al provedor previamente selecionado</li>
                                            <li>Mantener la infomacion actualizada de los materiales que maneja cada proveedor</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="w-11/12 m-0 p-0">
                                <el-table :data="datos.recurso" class="w-full">
                                    <!-- {{ scope.$index, tableData}} -->
                                    <el-table-column prop="idRecurso" label="Id"></el-table-column>

                                    <el-table-column  label="Nombre" >
                                        <template slot-scope="scope">
                                            <div v-for="item in datosMaterialesSinModificar" :key="item.id_recurso">
                                                <p v-if="datos.recurso[scope.$index].idRecurso == item.id_recurso">{{ item.nombre_recurso }}</p>
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="unidades" label="Unidades"></el-table-column>tipoMoneda
                                    <el-table-column prop="tipoMoneda" label="Tipo de moneda"></el-table-column>
                                    <el-table-column prop="costo" label="Costo"></el-table-column>

                                    
                                    <el-table-column fixed="right" label="Operaciones" width="170">
                                        <template slot-scope="scope">
                                            <el-popconfirm confirm-button-text='Si, Eliminar' confirm-button-type="danger"
                                                cancel-button-text='No, Cancelar' icon="el-icon-info" icon-color="red"
                                                :title="`Estas seguro de eliminar el material ?`"
                                                class="w-full md:w-1/3" @confirm="eliminarItemArray(datos.recurso[scope.$index].idRecurso)">

                                                <p slot="reference" :disabled="loading" class="w-full text-red-600  uppercase py-2 ">Borrar</p>
                                            </el-popconfirm>
                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>
                            <!-- Modal para agregar nuevos material para el revibo de compra-->
                            <el-dialog title="Agregar los datos de la compra" :visible.sync="centerDialogVisible" width="30%" center>
                                <p class="px-2 mb-10 text-center">Datos del material </p>

                                <div class="flex flex-wrap justify-around">

                                    <div v-if="proveedorMateriales && proveedorMateriales.data"
                                        class="w-full md:w-1/2  px-2 mb-3 py-1 block">
                                        <label>
                                            <p class="ml-1">Materiales</p>
                                            <el-select v-model="datosRecurso.idRecurso" placeholder="Materiales" class="w-full">
                                                <el-option v-for="item in proveedorMateriales.data" :key="item.id_recurso"
                                                    :label="item.nombre_recurso" :value="item.id_recurso"></el-option>
                                            </el-select>
                                        </label>
                                    </div>
        
                                    <div class="w-full md:w-1/2  px-2 mb-3 py-1">
                                        <label>
                                            <p class="ml-1">Unidades Compradas</p>
                                            <el-input placeholder="Unidades compradas" type="number" auto-complete="email"
                                                v-model="datosRecurso.unidades"></el-input>
                                        </label>
                                    </div>

                                    <div class="w-full md:w-3/3  px-2 mb-3 py-1">
                                        <label >
                                            <p class="ml-1">Costo de la compra</p>
                                            <el-input placeholder="monto" v-model="datosRecurso.costo" class="input-with-select ">
                                                <el-select v-model="datosRecurso.tipoMoneda"   slot="prepend" placeholder="Select">
                                                    <el-option label="$" value="dolares"></el-option>
                                                    <el-option label="Bs" value="bolivares"></el-option>
                                                </el-select>
                                            </el-input>
                                        </label>
                                    </div>
                                </div>                                
                                
    
                                <div  slot="footer" class="dialog-footer flex flex-wrap justify-around">
                                    <button slot="reference" :disabled="loading"
                                        class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                        @click="centerDialogVisible = false"
                                        type="button">Cerrar</button>
    
                                    <button :disabled="loading"
                                        class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                        type="button" v-on:click="agregarRecurso(datosRecurso)">Guardar</button>
                                </div>
    
    
                            </el-dialog>
    {{ datos }}
                            

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
            centerDialogVisible: false,
            aviso: true,
            datosMaterialesSinModificar:[],
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
                referencia:'',
                montoTotal:"",
            },
            datosRecurso: {
                idRecurso: null,
                unidades: null,
                costo: null,
                tipoMoneda: null
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
        agregarRecurso(valor) {

            this.datos.recurso.push(valor)
            this.datosRecurso = {
                idRecurso: null,
                unidades: null,
                costo: null,
                tipoMoneda: null,
            }
            this.aviso = false
            this.centerDialogVisible= false

            console.log(this.proveedorMateriales.data.filter(item => item.id_recurso == valor.idRecurso)[0])
            this.datosMaterialesSinModificar.push(this.proveedorMateriales.data.filter(item => item.id_recurso == valor.idRecurso)[0])

            this.proveedorMateriales.data = this.proveedorMateriales.data.filter(item => item.id_recurso != valor.idRecurso);

            
            
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
                console.clear()
            }
        },
        eliminarItemArray(id){
            console.log(id)
            if(this.datos.recurso.length == 1){
                this.$message({
                    message: 'Se tiene que tener como minimo 1 material registrado',
                    type: 'error',
                });
            }else{
                this.datos.recurso= this.datos.recurso.filter(elementos => elementos.idRecurso != id)
                console.log(this.datos.recurso)
            }
        }
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
        'datos.idProvedor'(newValue) {
            console.log(newValue)
            this.$store.dispatch("obtenerMaterialesProveedor", {
                id: newValue
            });
        },
    },
};
</script>
