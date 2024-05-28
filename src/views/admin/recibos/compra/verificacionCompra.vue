<template>
  <!-- se mejorara la presentacion de los recibos , y se mostraran como tajetas-->
  <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 xl:mb-0 px-4 ">
          <div v-if="detallesCompra && detallesCompra.data"
              class="relative flex flex-col min-w-0 break-words bg-zinc-200 w-full mb-6 shadow-lg rounded">
              <div class="flex justify-center">
                  <div class="rounded-t mb-0 px-4 py-3 border-0">
                      <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                          Verificacion de la compra
                      </h3>
                  </div>
              </div>
              <div class="mt-5 pb-5">
                  <div>
                      <form>
                          <div class="flex flex-wrap justify-around">

                              <div class="block w-11/12 mb-10  p-6 bg-white border border-gray-200 rounded-lg shadow-md">

                                  <div class="flex justify-center">
                                      <div class="rounded-t mb-0 px-4 py-3 border-0">
                                          <p class="font-semibold text-lg text-verdiAnderson uppercase">
                                              Compra N-<span class="text-verdiAnderson">{{
                                                  detallesCompra.data[0].id_compra }} </span>
                                          </p>
                                      </div>
                                  </div>

                                  <div class="flex mt-9 flex-wrap justify-around">

                                      <div class="w-1/3">
                                          <p class=" mb-3 font-normal text-center text-gray-700">
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
                                              <b>Nombres: </b> {{ detallesCompra.data[0].nombre_trabajador }}
                                          </p>
                                          <p class="font-normal text-gray-700  ">
                                              <b>Apellido: </b> {{ detallesCompra.data[0].apellido_trabajador }}
                                          </p>
                                          <p class="font-normal text-gray-700  ">
                                              <b>telefono: </b> {{ detallesCompra.data[0].telefono_trabajador }}
                                          </p>

                                      </div>
                                  </div>

                                  <div class="w-11/12">
                                      <el-divider>Datos de la compra</el-divider>
                                  </div>

                                  <div class="flex mt-9 pl-20 flex-wrap justify-start">

                                      <div class="w-11/12">
                                          <p class="border font-normal p-2 text-gray-700  ">
                                              <b>Nombre del Proveedor: </b> {{ detallesCompra.data[0].nombre_proveedor }}
                                          </p>
                                          <p class="border font-normal p-2 text-gray-700  ">
                                              <b>Metodo de pago: </b>{{ detallesCompra.data[0].forma_pago }}
                                          </p>
                                          <p class="border font-normal p-2 text-gray-700  ">
                                              <b>Referencia: </b>{{ detallesCompra.data[0].referencias }}
                                          </p>
                                          <p class="border font-normal p-2 text-gray-700  ">
                                              <b>Fecha de compra: </b> {{ parseDate(detallesCompra.data[0].fecha_compra)
                                              }}
                                          </p>

                                      </div>
                                  </div>

                                  <div class="w-11/12 my-10">
                                      <el-divider>Detalles de la Compra</el-divider>
                                  </div>

                                  <!-- tabla -->
                                  <div class="relative overflow-x-auto mt-10 ">
                                      <table class="w-11/12 text-sm text-left ml-10 text-gray-500 ">
                                          <thead class="text-xs text-gray-700 uppercase bg-gray-50    ">
                                              <tr>
                                                  <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                      Material
                                                  </th>
                                                  <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                      Unidades solicitadas
                                                  </th>
                                                  <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                      Unidades obtenidas
                                                  </th>
                                                  <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                    Valor inicial
                                                  </th>
                                                  <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                    Valor final
                                                  </th>
                                                  <th scope="col" class="px-6 text-sm py-3 text-verdiAnderson">
                                                      Moneda
                                                  </th>
                                              </tr>
                                          </thead>

                                          <tbody v-if="detallesCompraMateriales && detallesCompraMateriales.data">
                                              <tr v-for="(material,index) in detallesCompraMateriales.data"
                                                  :key="material.id_recurso" class="bg-white border-b">

                                                  <th scope="row"
                                                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                      {{ material.nombre_recurso }}
                                                  </th>

                                                  <td class="px-6 py-4">
                                                      {{ material.unidades_compradas }}
                                                  </td>

                                                  <td class="px-6 py-4">
                                                    <el-input placeholder="Referencia" type="number"
                                                      v-model="detallesCompra.data[0].comprajson[0].recurso[index].unidades"></el-input>
                                                  </td>

                                                  <td class="px-6 py-4">
                                                    {{ material.costo_unidad }}
                                                  </td>

                                                  <td class="px-6 py-4">
                                                    <el-input placeholder="Referencia"  type="number"
                                                      v-model="detallesCompra.data[0].comprajson[0].recurso[index].costo"></el-input>
                                                  </td>

                                                  <td class="px-6 py-4">
                                                      {{ material.tipo_moneda == 'Dolares' ? "$":material.tipo_moneda }}
                                                  </td>
                                              </tr>

                                          </tbody>

                                          <el-button @click="calcularTotal(detallesCompra.data[0].comprajson[0])" class="mt-5" type="primary" plain>Calcular total</el-button>
                                      </table>

                                  </div>
                                  <el-divider></el-divider>
                                  <p class=" w-full text-right pr-40 text-lg">Total inicial: ${{ detallesCompra.data[0].monto_total }} </p>
                                  <p v-if="calculando" class=" w-full text-right pr-40 text-lg">Total inicial: ${{ valorCalculo}} </p>
                                  <el-divider></el-divider>

                                  <br>
                                  <br>
                                  <div class="flex flex-wrap justify-around">

                                      <button :disabled="loading" @click="cancelarCompra"
                                          class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                          type="button">
                                          No verificar
                                      </button>

                                      <button :disabled="loading" @click="registrarCompra(detallesCompra.data[0].comprajson[0])"
                                          class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                          type="button">
                                          Verificar
                                      </button>
                                  </div>
                                  <br>
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
import config from "../../../../config";
import axios from "axios";

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
          url: `http://localhost:3000/pdf/compra/${this.$route.params.ID}`,
          loading: false,
          calculando:false,
          valorCalculo:0,
      }
  },
  methods: {
      parseDate(date) {
          return new Date(date).toLocaleString();
      },

      openNewTab() {
          window.open(this.url, '_blank');
      },
      calcularTotal(detallesCompra){

        this.valorCalculo = 0;
        this.detallesCompra.data[0].comprajson[0].montoTotal = 0
        let result =0

        detallesCompra.recurso.forEach((value, index) => {
          result += +value.costo
        })

        this.detallesCompra.data[0].comprajson[0].montoTotal = result;

        this.valorCalculo =result;
        this.calculando =true
      },
      async registrarCompra(detallesCompra) {
        try {
            this.$store.dispatch('getLoadingApp', true);
            this.loading = true;
            const token = localStorage.getItem('token_acess');
            const idCompra = this.detallesCompra.data[0].id_compra

            this.valorCalculo = 0;
            this.detallesCompra.data[0].comprajson[0].montoTotal = 0
            let result =0

            detallesCompra.recurso.forEach((value, index) => {
              result += +value.costo
            })

            this.detallesCompra.data[0].comprajson[0].montoTotal = result;

            this.detallesCompra.data[0].comprajson[0]['idReciboCompra'] = idCompra
            const request = await axios({
                method: 'POST',
                baseURL: config.backend.baseURL,
                url: '/compra/verificar',
                headers: {
                    ['auth-token']: token,
                },
                data: this.detallesCompra.data[0].comprajson[0]
            });

            this.$store.dispatch('getLoadingApp', false);
            this.loading = false;
            this.$message({
                message: request.data.mensaje,
                type: 'success',
            });
            this.$router.push({ path: '/admin/recibo/compra/lista' });
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
            // console.clear()
        }
      },
      async cancelarCompra() {
        try {
            this.$store.dispatch('getLoadingApp', true);
            this.loading = true;
            const token = localStorage.getItem('token_acess');
            const idCompra = this.detallesCompra.data[0].id_compra
            const request = await axios({
                method: 'PATCH',
                baseURL: config.backend.baseURL,
                url: '/compra/cancelar',
                headers: {
                    ['auth-token']: token,
                },
                data: {idReciboCompra: idCompra}
            });

            this.$store.dispatch('getLoadingApp', false);
            this.loading = false;
            this.$message({
                message: request.data.mensaje,
                type: 'success',
            });
            this.$router.push({ path: '/admin/recibo/compra/lista' });
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
            // console.clear()
        }
      },

  },
  computed: {
      detallesCompra() {
          return this.$store.getters.getDetallesCompra;
      },
      detallesCompraMateriales() {
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
