<template>
    <!-- se mejorara la presentacion de los recibos , y se mostraran como tajetas-->
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div v-if="detallesCompra && detallesCompra.data"  class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 
                            class="font-semibold text-xl text-blueGray-700 uppercase">
                            Detalles del recivo de compra 
                        </h3>
                    </div>
                </div>
                
                <div class="mt-5 pb-5">
                    <div >
                        <form >
                            <div class="flex flex-wrap justify-around">

                                <div class="block w-11/12 mb-10  p-6 bg-white border border-gray-200 rounded-lg shadow-md"> 
                                    
                                    <div class="flex justify-center">
                                        <div class="rounded-t mb-0 px-4 py-3 border-0">
                                            <p 
                                                class="font-semibold text-lg text-verdiAnderson uppercase">
                                                Detalles de la  compra N-<span class="text-verdiAnderson">{{ detallesCompra.data[0].id_compra }} </span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div class="flex mt-9 flex-wrap justify-around">
                                        
                                        <div class="w-1/3">
                                            <p class=" mb-3 font-normal text-center text-gray-700 dark:text-gray-400">
                                               <b>Datos de la clinica </b> 
                                            </p>

                                            <p class="font-normal text-gray-700 dark:text-gray-400">
                                               <b>Nombre: </b> DENTIMAGEN C.A.
                                            </p>
                                            <p class="font-normal text-gray-700 dark:text-gray-400">
                                               <b>Direccion: </b>Santiago mariño,turmero 
                                            </p>
                                            <p class="font-normal text-gray-700 dark:text-gray-400">
                                               <b>Telefono: </b> 04126533015
                                            </p>
                                            
                                        </div>


                                        <div class="w-4/12 border-l-2 border-verdiAnderson pl-10">
                                            <p class="font-normal mb-3 text-gray-700 dark:text-gray-400">
                                                <b>Datos del Trabajador </b>
                                            </p>
                                            <p class="font-normal text-gray-700 dark:text-gray-400">
                                                <b>Nombres: </b> {{ detallesCompra.data[0].nombre_trabajador }}
                                            </p>
                                            <p class="font-normal text-gray-700 dark:text-gray-400">
                                                <b>Apellido: </b> {{ detallesCompra.data[0].apellido_trabajador }}
                                            </p>
                                            <p class="font-normal text-gray-700 dark:text-gray-400">
                                                <b>telefono: </b> {{ detallesCompra.data[0].telefono_trabajador}}
                                            </p>
                                           
                                        </div>
                                    </div>

                                    <div class="w-11/12">
                                        <el-divider>Datos de la compra</el-divider>
                                    </div>

                                    <div class="flex mt-9 pl-20 flex-wrap justify-start">

                                        <div class="w-11/12">
                                            <p  class="border font-normal p-2 text-gray-700 dark:text-gray-400">
                                                <b >Nombre del Proveedor: </b> {{ detallesCompra.data[0].nombre_proveedor }}
                                            </p>
                                            <p class="border font-normal p-2 text-gray-700 dark:text-gray-400">
                                                <b>Metodo de pago: </b>{{ detallesCompra.data[0].forma_pago }}
                                            </p>
                                            <p class="border font-normal p-2 text-gray-700 dark:text-gray-400">
                                                <b>Referencia: </b>{{ detallesCompra.data[0].referencias }}
                                            </p>
                                            <p class="border font-normal p-2 text-gray-700 dark:text-gray-400">
                                                <b>Fecha de compra: </b> {{ parseDate(detallesCompra.data[0].fecha_compra) }}
                                            </p>
                                            
                                        </div>
                                    </div>

                                    <div class="w-11/12">
                                        <el-divider>Detalles de la  Compra</el-divider>
                                    </div>



                                    <!-- tabla -->
                                    <div class="relative overflow-x-auto mt-10">
                                        <table class="w-full text-sm text-left text-gray-500 ">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                                                <tr>
                                                    <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                        Material
                                                    </th>
                                                    <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                        Unidades Compradas
                                                    </th>
                                                    <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                        Tipo de moneda
                                                    </th>
                                                    <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                        Costo 
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="detallesCompraMateriales && detallesCompraMateriales.data">
                                                <tr v-for="material in detallesCompraMateriales.data" :key="material.id_recurso" class="bg-white border-b">
                                                    
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                        {{  material.nombre_recurso}}
                                                    </th>

                                                    <td class="px-6 py-4">
                                                        {{ material.unidades_compradas }}
                                                    </td>

                                                    <td class="px-6 py-4">
                                                        {{ material.tipo_moneda }}
                                                    </td>
                                                    
                                                    <td class="px-6 py-4">
                                                        {{ material.costo_unidad }}
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>


                                    <div class="border flex flex-wrap  border-solid border-gray-400 my-10 p-5">
                                        <p class=" text-verdiAnderson w-1/2 pl-5 text-2xl">Total</p>
                                        <p class="w-1/2 text-right text-2xl pl-5">{{ detallesCompra.data[0].monto_total }}</p>
                                        
                                    </div>
                                    <br>
                                    
                                </div>
                                
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import config from '../../../../config';
export default {
    name: 'users-list',
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: '%s | Lista de Usuarios',
    },
    created() {
        this.$store.dispatch('obtenerDetallesCompras', { id: this.$route.params.ID });
        this.$store.dispatch('obtenerDetallesCompraMateriales', { id: this.$route.params.ID });

    },
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        parseDate(date) {
            return new Date(date).toLocaleString();
        }
    },
    computed: {
        detallesCompra () {
          return this.$store.getters.getDetallesCompra;
        },
        detallesCompraMateriales () {
          return this.$store.getters.getDetallesCompraMateriales;
        },
       
    }
}
</script>
<style lang="scss">
.el-date-editor {
    width: 100% !important;
}
</style>
