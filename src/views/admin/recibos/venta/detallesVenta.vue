<template>
    <!-- se mejorara la presentacion de los recibos , y se mostraran como tajetas-->
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div v-if="venta && venta.data"  class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 
                            class="font-semibold text-xl text-blueGray-700 uppercase">
                            Detalles del recivo de venta
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">
                    <div >
                        <form >
                            <div  class="flex flex-wrap justify-around">
                                <div style="    width: 800px;" class="block w-2/3 mb-10  p-6 bg-white border border-gray-200 rounded-lg shadow-md "> 
                                    
                                    <div class="flex justify-center">
                                        <div class="rounded-t mb-0 px-4 py-3 border-0">
                                            <p 
                                                class="font-semibold text-lg text-verdiAnderson uppercase">
                                                Detalles de la  venta N-<span class="text-verdiAnderson">{{ detallesVenta.data[0].id_venta }} </span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div class="flex mt-9 flex-wrap justify-around">
                                        
                                        <div class="w-1/3">
                                            <p class=" mb-3 font-normal text-center text-gray-700  ">
                                               <b>Datos de la clinica </b> 
                                            </p>

                                            <p class="font-normal text-gray-700  ">
                                               <b>Nombre: </b> DENTIMAGEN C.A.
                                            </p>
                                            <p class="font-normal text-gray-700  ">
                                               <b>Direccion: </b>Santiago mariño,turmero 
                                            </p>
                                            <p class="font-normal text-gray-700  ">
                                               <b>Telefono: </b> 04126533015
                                            </p>
                                            
                                        </div>


                                        <div class="w-4/12 border-l-2 border-verdiAnderson pl-10">
                                            <p class="font-normal mb-3 text-gray-700  ">
                                                <b>Datos del Trabajador </b>
                                            </p>
                                            <p class="font-normal text-gray-700  ">
                                                <b>Nombres: </b> {{ venta.data[0].nombre_trabajador }}
                                            </p>
                                            <p class="font-normal text-gray-700  ">
                                                <b>Apellido: </b> {{ venta.data[0].apellido_trabajador }}
                                            </p>
                                            <p class="font-normal text-gray-700  ">
                                                <b>Especializacion: </b> {{ venta.data[0].especializacion_trabajador}}
                                            </p>
                                           
                                        </div>
                                    </div>

                                    <div class="w-11/12">
                                        <el-divider>Datos del Paciente</el-divider>
                                    </div>

                                    <div class="flex mt-9 pl-20 flex-wrap justify-start">

                                        <div class="w-11/12">
                                            <p  class="border font-normal p-2 text-gray-700  ">
                                                <b >Nombres: </b> {{ venta.data[0].nombre_paciente }}
                                            </p>
                                            <p class="border font-normal p-2 text-gray-700  ">
                                                <b>Apellidos: </b>{{ venta.data[0].apellido_paciente }}
                                            </p>
                                            <p class="border font-normal p-2 text-gray-700  ">
                                                <b>Edad: </b>{{ venta.data[0].edad_paciente }}
                                            </p>
                                            <p class="border font-normal p-2 text-gray-700  ">
                                                <b>Genero: </b>{{ venta.data[0].genero_paciente }}
                                            </p>
                                            <p class="border font-normal p-2 text-gray-700  ">
                                                <b>Cedula: </b>{{ venta.data[0].cedula_paciente }}
                                            </p>
                                            <p class="border font-normal p-2 text-gray-700  ">
                                                <b>Fecha de la venta: </b> {{ parseDate(venta.data[0].fecha_venta) }}
                                            </p>
                                            <p class="border font-normal p-2 text-gray-700  ">
                                                <b>Forma de pago: </b>{{ venta.data[0].forma_pago }}
                                            </p>
                                            
                                        </div>
                                    </div>

                                    <div class="w-11/12">
                                        <el-divider>Detalles de la  Venta</el-divider>
                                    </div>

                                    <!-- tabla -->
                                    <div v-if="detallesVenta && detallesVenta.data" class="relative overflow-x-auto mt-10">
                                        <table class="w-full text-sm text-left text-gray-500  ">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                                <tr>
                                                    <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                        Servicio
                                                    </th>
                                                    <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                        Valor del servicio
                                                    </th>
                                                    <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                        Cantidad de veces aplicada
                                                    </th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody >
                                                <tr v-for="servicio in detallesVenta.data" :key="servicio.id_detalles_servicios" class="bg-white border-b   ">
                                                    
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-500">
                                                        {{  servicio.nombre_servicio}}
                                                    </th>

                                                    <td class="px-6 py-4">
                                                        {{ servicio.presio_servicio }}
                                                    </td>

                                                    <td class="px-6 py-4">
                                                        {{ servicio.cantidad }}
                                                    </td>
                                                    
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>


                                    <div class="border flex flex-wrap  border-solid border-gray-400 my-10 p-5">

                                        <p class=" text-verdiAnderson w-1/2 pl-5 text-xl">Precio del dolar</p>
                                        <p class="w-1/2 text-right text-xl pl-5">{{ venta.data[0].precio_dolares }} $</p>

                                        <p class=" text-verdiAnderson w-1/2 pl-5 text-2xl">Total dolares</p>
                                        <p class="w-1/2 text-right text-2xl pl-5">{{ venta.data[0].precio_total }} $</p>
                                        
                                    </div>
                                    <br>
                                    <div class="flex flex-wrap justify-around">
                                        
                                        <button :disabled="loading"
                                            class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                            type="button" v-on:click="openNewTab">Descargar PDF</button>
                                    </div>
                                    
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
        titleTemplate: '%s | Detalles de la venta',
    },
    created() {
        this.$store.dispatch('obtenerVenta', { id: this.$route.params.ID });
        this.$store.dispatch('obtenerDetallesVenta', { id: this.$route.params.ID });

    },
    data() {
        return {
            loading: false,
            url:`http://localhost:3000/pdf/venta/${this.$route.params.ID}`,
        }
    },
    methods: {
        parseDate(date) {
            return new Date(date).toLocaleString();
        },
        openNewTab() {
            window.open(this.url, '_blank');
        }
    },
    computed: {
        detallesVenta () {
          return this.$store.getters.getDetallesVenta;
        },
        venta () {
          return this.$store.getters.getVentas;
        },
       
    }
}
</script>
<style lang="scss">
.el-date-editor {
    width: 100% !important;
}
</style>
