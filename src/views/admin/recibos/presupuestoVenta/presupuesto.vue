<template>
  <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 xl:mb-0 px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">

              <div class="flex justify-center">
                  <div class="rounded-t mb-0 px-3 py-3 border-0">
                      <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                          Presupuesto para el cliente
                      </h3>
                  </div>
              </div>

              <div >
                  <el-steps align-center :active="active" finish-status="success">
                      <el-step title="Datos basicos"></el-step>
                      <el-step title="Servicios aplicados"></el-step>
                      <el-step title="Materiales invertidos"></el-step>
                      <el-step title="Vista previa"></el-step>
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

                              <!-- tabla -->
                              <el-table :data="datosVenta.servicios" class="w-full mt-10 ">
                                  <el-table-column prop="idServicio" label="Id"></el-table-column>
                                  <el-table-column prop="nombre_servicio" label="Servicio"></el-table-column>
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

                                  <el-table-column  label="Cantidad Gastada" width="170">
                                      <template slot-scope="scope">
                                          <div v-for="datos in datosVenta.materiales" :key="datos.idMaterial">
                                              <p v-if="datos.idMaterial == datosMaterialesTabla[scope.$index].id_recurso" >
                                                  {{ datos.cantidadMaterial }}
                                              </p>
                                          </div>
                                      </template>
                                  </el-table-column>



                                  <el-table-column fixed="right" label="Operaciones" width="170">
                                      <template slot-scope="scope">
                                          <button type="button"
                                              class="  md:w-1/2 py-2 text-red-600 bg-none transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase rounded-md"
                                                  @click="eliminarAsociacionMaterial(scope.row.id_recurso)">
                                                  eliminar
                                          </button>

                                      </template>
                                  </el-table-column>
                              </el-table>
                          </div>



                      </div>

                      <div v-if="active== 4" class="flex flex-wrap justify-around mt-5">
                          <div class="w-11/12 mt-10 ml-48  m-0 p-0">

                              <div class="block w-7/8 mb-10  p-6 bg-white border border-gray-200 rounded-lg shadow-md">

                                  <div class="flex justify-center">
                                      <div class="rounded-t mb-0 px-4 py-3 border-0">
                                          <p  class="font-semibold text-lg text-verdiAnderson uppercase">
                                              Pago de Servicios
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


                                      <div class="w-6/12 border-l-2 border-verdiAnderson pl-10">
                                          <p class="font-normal mb-3 text-gray-700 dark:text-gray-400">
                                              <b>Datos del Odontologo </b>
                                          </p>
                                          <div v-for="trabajador in usuarios.data" :key="trabajador.id_trabajador">
                                              <div v-if="trabajador.id_trabajador == datosVenta.idTrabajador">

                                                  <p class="font-normal text-gray-700 dark:text-gray-400">
                                                      <b>Nombres: </b> {{ trabajador.nombre }} {{ trabajador.apellido }}
                                                  </p>
                                                  <p class="font-normal text-gray-700 dark:text-gray-400">
                                                      <b>Telefono: </b> {{ trabajador.telefono }}
                                                  </p>
                                                  <p class="font-normal text-gray-700 dark:text-gray-400">
                                                      <b>especializacion: </b> {{ trabajador.especializacion }}
                                                  </p>
                                                  <p class="font-normal text-gray-700 dark:text-gray-400">
                                                      <b>Correo: </b> {{ trabajador.correo }}
                                                  </p>

                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div class="w-11/12">
                                      <el-divider>Datos del paciente</el-divider>
                                  </div>

                                  <div v-for="paciente in pacientes.data" :key="paciente.id_paciente" class="flex mt-9 pl-20 flex-wrap justify-start">
                                      <div v-if="paciente.id_paciente == datosVenta.idPaciente" class="w-11/12">

                                          <p class="border  p-2 font-normal text-gray-700 dark:text-gray-400">
                                              <b>Nombres: </b> {{ paciente.nombre_paciente }}
                                          </p>
                                          <p class=" border  p-2 font-normal text-gray-700 dark:text-gray-400">
                                              <b>Apellido: </b> {{ paciente.apellido_paciente }}
                                          </p>
                                          <p class="border  p-2 font-normal text-gray-700 dark:text-gray-400">
                                              <b>Edad: </b> {{ paciente.edad_paciente }} Años
                                          </p>
                                          <p class="border  p-2 font-normal text-gray-700 dark:text-gray-400">
                                              <b>Cedula: </b> {{ paciente.cedula_paciente }}
                                          </p>
                                          <p class="border  p-2 font-normal text-gray-700 dark:text-gray-400">
                                              <b>Telefono: </b> {{ paciente.telefono_paciente }}
                                          </p>
                                          <p class="border  p-2 font-normal text-gray-700 dark:text-gray-400">
                                              <b>Correo: </b> {{ paciente.correo_paciente }}
                                          </p>
                                          <p class="border  p-2 font-normal text-gray-700 dark:text-gray-400">
                                              <b>Motivo de la Consulta: </b> {{ paciente.motivo_consulta }}
                                          </p>
                                          <p class="border  p-2 font-normal text-gray-700 dark:text-gray-400">
                                              <b>Genero: </b> {{ paciente.genero_paciente }}
                                          </p>
                                          <p class="border  p-2 font-normal text-gray-700 dark:text-gray-400">
                                              <b>Dirreccion: </b> {{ paciente.direccion_paciente }}
                                          </p>
                                      </div>
                                  </div>

                                  <div class="w-11/12">
                                      <el-divider>Servicio</el-divider>
                                  </div>



                                  <!-- tabla -->
                                  <div class="relative overflow-x-auto mt-10">
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
                                          <el-table-column prop="cantidadRealizadas" label="Cantidad"></el-table-column>
                                      </el-table>
                                  </div>

                                  <div class="  flex flex-row-reverse my-2 mt-2 mr-5">
                                      <button @click="calculosRapidos()"
                                          class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                          type="button">
                                          Calcular precio de pago
                                      </button>
                                  </div>

                                  <div v-if="totalSuma != 0" class="border mt-10 flex flex-wrap  border-solid border-gray-400 my-10 p-5">
                                      <p class=" text-verdiAnderson w-1/2 pl-5 text-2xl">Total</p>
                                      <p class="w-1/2 text-right text-2xl pl-5">{{ totalSuma }}</p>

                                  </div>
                                  <br>
                                  <div class="flex flex-wrap justify-around">

                                      <!-- <button :disabled="loading"
                                          class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                          type="submit">Descargar PDF</button> -->
                                  </div>
                              </div>


                          </div>

                          <button :disabled="loading" v-on:click="ingresarVenta()"
                              class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                              Guardar presupuesto
                          </button>

                      </div>


                      <div class="flex flex-wrap justify-around my-5">
                          <button type="button"
                              class="w-full bg-none md:w-1/3  text-verdiAnderson transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md" @click="prev">
                              Anterior
                          </button>
                          <button type="button"
                              class="w-full bg-none md:w-1/3  text-verdiAnderson transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md" @click="next">
                              Siguiente
                          </button>
                      </div>

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
              precioDolar: "25",
              servicios:[],
              materiales:[]
          },
          serviciosIngresados:{
              idServicio: null,
              costoServicio: 1,
              cantidadRealizadas: 1
          },
          materialesIngresados:{
              idMaterial:null,
              cantidadMaterial: null
          },
          sumaTodoServicio : 0,
          totalSuma: 0,
          datosServicioTabla:[],
          datosMaterialesTabla:[],
          centerDialogVisible: false,
          loading: false,
      };
  },
  methods: {
      next() {
        switch (this.active) {
          case 1 || '1': {
            if (!this.datosVenta.idTrabajador) {
              this.$message({
                message: 'Debes seleccionar el odontologo',
                type: 'error',
              });
              return false;
            }
            if (!this.datosVenta.idPaciente) {
              this.$message({
                message: 'Debes seleccionar el paciente',
                type: 'error',
              });
              return false;
            }
            if (!this.datosVenta.formaPago) {
              this.$message({
                message: 'Debes seleccionar la forma de pago',
                type: 'error',
              });
              return false;
            }
            let iva = Number(this.datosVenta.ivaVenta);
            if (iva < 1 || iva > 99) {
              this.$message({
                message: 'Debes ingresar el iva correctamente',
                type: 'error',
              });
              return false;
            }
            let dolar = Number(this.datosVenta.precioDolar);
            if (dolar < 1) {
              this.$message({
                message: 'Debes ingresar el precio del dolar correctamente',
                type: 'error',
              });
              return false;
            }
            break;
          }
          case 2 || '2': {
            if (!this.datosVenta.servicios.length) {
              this.$message({
                message: 'Debes ingresar almenos un servicio',
                type: 'error',
              });
              return false;
            }
            break;
          }
          default: {
            break;
          }
        }
        if (this.active < 4) {
          this.active++;
        }
      },
      prev() {
        if (this.active > 1) {
          this.active--;
        }
      },
      asociarServiciosIngresados(datos){
          const producto = this.producto.data.filter(item => item.id_recurso == datos.idMaterial)[0];
          if (!datos.idServicio) {
            this.$message({
              message: 'Debes seleccionar el servicio',
              type: 'error',
            });
            return false;
          }
          this.datosVenta.servicios.push(datos);
          this.serviciosIngresados= {
              idServicio: null,
              costoServicio: 1,
              cantidadRealizadas: 1
          }

          this.datosServicioTabla.push( this.servicios.data.filter(item => item.id_servicio == datos.idServicio)[0])
          console.log("Asociada",this.datosServicioTabla[0])
      },
      asociarMaterialesIngresados(datos){
          const producto = this.producto.data.filter(item => item.id_recurso == datos.idMaterial)[0];
          datos['nombre_servicio'] = producto['nombre_servicio'];
          this.datosVenta.materiales.push(Object.assign({}, datos));

          this.materialesIngresados={
              idMaterial:null,
              cantidadMaterial: null
          }
          // console.log("datos enviados-------------------",datos)
          // console.log("datos guardados-------------------",this.datosVenta)
          // console.log("datos materia---------------",this.producto.data)


          this.datosMaterialesTabla.push(producto)
          console.log("datos materia---------------",this.datosMaterialesTabla)
          this.centerDialogVisible = false
      },
      eliminarAsociacion(id){
        this.datosVenta.servicios = this.datosVenta.servicios.filter(item => item.idServicio != id);
        this.datosServicioTabla = this.datosServicioTabla.filter(item => item.id_servicio != id);
      },
      eliminarAsociacionMaterial(datos){
          this.datosVenta.materiales = this.datosVenta.materiales.filter(materiales => materiales.idServicio != datos)
          this.datosMaterialesTabla = this.datosMaterialesTabla.filter(materiales => materiales.id_recurso != datos)

          console.log(datos)
      },
      calculosRapidos(){
          for (let index = 0; index < this.datosVenta.servicios.length; index++) {
              this.sumaTodoServicio += (Number(this.datosVenta.servicios[index].costoServicio) * parseInt(this.datosVenta.servicios[index].cantidadRealizadas))
          }
          let iva = this.sumaTodoServicio * (parseInt(this.datosVenta.ivaVenta )/ 100);
          this.totalSuma = this.sumaTodoServicio + iva;

      },
      async ingresarVenta(){
          try {
              this.$store.dispatch('getLoadingApp', true);
              this.loading = true;
              const token = localStorage.getItem('token_acess');
              const request = await axios({
                  method: 'POST',
                  baseURL: config.backend.baseURL,
                  url: '/presupuesto',
                  headers: {
                      ['auth-token']: token,
                  },
                  data: this.datosVenta
              });
              console.log(request)
              this.$store.dispatch('getLoadingApp', false);
              this.loading = false;
              this.$message({
                  message: request.data.mensaje,
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
