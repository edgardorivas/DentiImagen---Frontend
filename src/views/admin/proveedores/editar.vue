<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 v-if="proveedorDetalles && proveedorDetalles.data"
                            class="font-semibold text-xl text-blueGray-700 uppercase">
                            Editando Proveedor <i
                                class="text-verdiAnderson font-extrabold">@{{ proveedorDetalles.data[0].nombre_proveedor }}</i>
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">
            
                    <div v-if="proveedorDetalles && proveedorDetalles.data">
                        <form @submit.prevent="modificarProveedor(proveedorDetalles.data[0])">
                            <div class="flex flex-wrap justify-around">
                                <!--datos basicos-->

                                <div class="w-11/12">
                                    <el-divider>Datos del Proveedor</el-divider>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Nombres</p>
                                        <el-input placeholder="Nombres del Proveedor" type="text" auto-complete="name"
                                            v-model="proveedorDetalles.data[0].nombre_proveedor"></el-input>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Correo</p>
                                        <el-input placeholder="Correo del Proveedor" type="mail" auto-complete="family-name"
                                            v-model="proveedorDetalles.data[0].correo_proveedor"></el-input>
                                    </label>
                                </div>

                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Telefono</p>
                                        <el-input placeholder="Telefono del proveedor" type="text"
                                            auto-complete="family-name"
                                            v-model="proveedorDetalles.data[0].telefono_proveedor"></el-input>
                                    </label>
                                </div>

                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">RIF del proveedor</p>
                                        <el-input placeholder="RiF del proveedor" type="text" auto-complete="family-name"
                                            v-model="proveedorDetalles.data[0].rif_provedor"></el-input>
                                    </label>
                                </div>
                                
                                <!--visualizar los items del proveedor-->
                                <div class="w-11/12 m-0 mt-2">
                                    <el-divider>Lista de materiales del proveedor</el-divider>
                                </div>
                                <div class="w-11/12 m-0 p-0">

                                   

                                    <div class="flex flex-row-reverse my-2 mr-5">
                                        <button @click="centerDialogVisible = true" class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                            Agregar Item
                                        </button>
                                    </div>
                                    
                                    <!--card con los items agregadas-->
                                    <!-- <div class="flex flex-wrap py-2 mb-8 justify-around">
                                        <div v-for="item in materialesProveedor.data" :key="item.id_recurso"   class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-1 mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <div class="p-5">
                                                <a href="#">
                                                    <h5 class="  mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.nombre_recurso }}</h5>
                                                </a>
                                                <p class="mb-3 text-left font-normal text-gray-700 dark:text-gray-400">{{ item.descripcion_recurso }}</p>
                                                
                                                <el-popconfirm confirm-button-text='Si, Eliminar' confirm-button-type="danger"
                                                    cancel-button-text='No, Cancelar' icon="el-icon-info" icon-color="red"
                                                    :title="`Estas seguro de eliminar el material ${item.nombre_recurso} asociado al proveedor ${proveedorDetalles.data[0].nombre_proveedor}?`"
                                                    class="w-full md:w-1/3" @confirm="eliminarAsociacionItemProveedor(proveedorDetalles.data[0].id_provedor,item.id_recurso)">

                                                    <button slot="reference" :disabled="loading"
                                                        class="w-full bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                                        type="button" >Borrar</button>
                                                </el-popconfirm>
                                            </div>
                                        </div>
                                    </div> -->

                                    <!-- tabla para visualizar los items asociados al proveedor -->
                                    <div class="w-11/12 m-0 p-0">
                                        <el-table :data="materialesProveedor.data" class="w-full">
                                            <!-- {{ scope.$index, tableData}} -->
                                            <el-table-column prop="id_recurso" label="Id"></el-table-column>
                                            <el-table-column prop="nombre_recurso" label="Nombre del material"></el-table-column>
                                            <el-table-column prop="descripcion_recurso" label="Descripcion"></el-table-column>
                                            
                                            <el-table-column fixed="right" label="Operaciones" width="170">
                                                <template slot-scope="scope">
                                                    <el-popconfirm confirm-button-text='Si, Eliminar' confirm-button-type="danger"
                                                        cancel-button-text='No, Cancelar' icon="el-icon-info" icon-color="red"
                                                        :title="`Estas seguro de eliminar el material ${materialesProveedor.data[scope.$index].nombre_recurso} asociado al proveedor ${proveedorDetalles.data[0].nombre_proveedor} ?`"
                                                        class="w-full md:w-1/3" @confirm="eliminarAsociacionItemProveedor(proveedorDetalles.data[0].id_provedor, scope.$index,materialesProveedor.data)">

                                                        <button slot="reference" :disabled="loading"
                                                            class="w-full  text-red-600 bg-none uppercase py-2 "
                                                            type="button" >Borrar</button>
                                                    </el-popconfirm>
                                                </template>
                                            </el-table-column>

                                        </el-table>
                                    </div>


                                </div>
                            </div>
                            <br>

                            <!-- Modal para agregar nuevos material al provedor-->
                            <el-dialog title="Agregar mas items al poveedor" :visible.sync="centerDialogVisible" width="30%" center>
                                <p class="px-2 mb-3 text-center">Seleccione los materiales </p>
                                
                                <div v-if="materiales" class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                                    <label>
                                        <el-select v-model="nuevosItems.materiales"  multiple placeholder="Materiales disponibles" class="w-96 ml-24">
                                        <el-option v-for="item in materiales" :key="item.id" :label="item.nombre"  :value="item.id"></el-option>
                                        </el-select>
                                    </label>
                                </div>

                                <div  slot="footer" class="dialog-footer flex flex-wrap justify-around">
                                    <button slot="reference" :disabled="loading"
                                        class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                        @click="centerDialogVisible = false"
                                        type="button">Cerrar</button>

                                    <button :disabled="loading"
                                        class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                        
                                        v-on:click="agregarItemsProveedor(proveedorDetalles.data[0].id_provedor)"
                                        type="button">Guardar</button>
                                </div>
                            </el-dialog>

                            <!--Botones para eliminar y guardar-->
                            <div class="flex flex-wrap justify-around">
                                <el-popconfirm confirm-button-text='Si, Eliminar' confirm-button-type="danger"
                                    cancel-button-text='No, Cancelar' icon="el-icon-info" icon-color="red"
                                    :title="`Estas seguro de eliminar el material ${proveedorDetalles.data[0].nombre_proveedor}?`"
                                    class="w-full md:w-1/3" @confirm="eliminarProveedor(proveedorDetalles.data[0])">

                                    <button slot="reference" :disabled="loading"
                                        class="w-full bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                        type="button">Eliminar</button>
                                </el-popconfirm>

                                <button :disabled="loading"
                                    class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                    type="button" v-on:click="modificarProveedor(proveedorDetalles.data[0])">Guardar</button>
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
    name: "produc-update",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Editar Material",
    },
    created() {
        this.$store.dispatch('obtenerDetalleProveedor', { id: this.$route.params.ID });
        this.$store.dispatch('obtenerRecursosProveedor', { id: this.$route.params.ID });
        //this.$store.dispatch('obtenerListaDeproducto');

        
    },
    data() {
        return {
            loading: false,
            contador:0,
            centerDialogVisible: false,
            nuevosItems:{
                materiales:[]
            },
            // materialesProveedor:[]
        }
    },
    methods: {
        async modificarProveedor(payload) {
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'PATCH',
                    baseURL: config.backend.baseURL,
                    url: '/provedor/' + payload.id_provedor,
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
                this.$router.push({ path: '/admin/proveedores' });
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
        async eliminarProveedor(payload) {
            console.log(payload.id)
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'DELETE',
                    baseURL: config.backend.baseURL,
                    url: '/provedor/' + payload.id_provedor,
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
                this.$router.push({ path: '/admin/proveedores' });
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
        async agregarItemsProveedor(id){
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                
                if(this.nuevosItems.length <= 0){
                    throw new Error('No se a asociado ningun materiale nuevo ')
                }

                const request = await axios({
                    method: 'PATCH',
                    baseURL: config.backend.baseURL,
                    url: `/asociarMaterialProveedor/${id}`,
                    headers: {
                        ['auth-token']: token,
                    },
                    data: this.nuevosItems
                });
                console.log(request)
                this.$store.dispatch('getLoadingApp', false);
                this.loading = false;
                this.$store.dispatch('obtenerRecursosProveedor', { id: this.$route.params.ID });
                

                this.centerDialogVisible = false
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
        async eliminarAsociacionItemProveedor(idProveedor,indiceArray,arrayMateriales){
            console.log("-------",idProveedor,"---------------",indiceArray,'------------------',arrayMateriales[indiceArray].id_recurso)
            let idMaterial= arrayMateriales[indiceArray].id_recurso
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'PATCH',
                    baseURL: config.backend.baseURL,
                    url: `/BorrarAsociarMaterialProveedor/${idProveedor}/${idMaterial}`,
                    headers: {
                        ['auth-token']: token,
                    },
                    data: this.nuevosItems
                });
                console.log(request)
                this.$store.dispatch('getLoadingApp', false);
                this.loading = false;
                this.centerDialogVisible = false
                this.$store.dispatch('obtenerRecursosProveedor', { id: this.$route.params.ID });
                this.$message({
                    message: 'Eliminacion exitosa',
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

        }
        // mostrarMaterialesProveedor() {
        //     this.materialesProveedor =  this.$store.getters.getRecursosProveedor;
        //     // return this.$store.getters.getRecursosProveedor;
        // },



    },
    computed: {
        proveedorDetalles() {
            return this.$store.getters.getDetalleProveedoresId;
        },
        
        materialesProveedor() {
            return this.$store.getters.getRecursosProveedor;
        },

        materiales() {
            
            let res = [];
            let materialesAsociadosProveedor = this.materialesProveedor.data;
            
            if(typeof materialesAsociadosProveedor != "undefined"){
                let materiales = this.$store.getters.getproducto;
                console.log(materiales)

                res = materiales.data.filter(item => {
                    return !materialesAsociadosProveedor.filter(x => item.id_recurso == x.id_recurso).length > 0 
                });
              
                return res;
                
            }
            return this.$store.getters.getproducto
            
        }
    }
};
</script>


<style lang="scss">
.el-button--danger {
    background-color: #dc2626;
}
th {
    --tw-bg-opacity: 1;
    color: rgb(0 200 165 / var(--tw-bg-opacity));
    font-size: 110%;
}
</style>
  