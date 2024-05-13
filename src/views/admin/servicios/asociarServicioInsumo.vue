<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Asociar insumos al servicio
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">
                <el-form label-position="top" :model="nuevoServicio" :rules="rules"  ref="registrarServicio" label-width="120px" class="demo-ruleForm">
                    <div class="flex flex-wrap justify-around">
                        <div class="w-11/12">
                            <el-divider>Datos del Servicio y de los insumos</el-divider>
                        </div>
                      <!--
                        <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                            <label>
                                <p class="ml-1">Nombre</p>
                                  <el-form-item prop="nombre">
                                    <el-input placeholder="Nombre del servicio"
                                        v-model="nuevoServicio.nombre"></el-input>
                                    </el-form-item>
                            </label>
                        </div>
                      -->

                        <div v-if="servicios && servicios.data" class="w-2/5  py-1">
                            <label>
                                <p class="ml-1">Servicios</p>
                                <el-form-item prop="servicio">
                                    <el-select v-model="asociacionServicio.servicioId" placeholder="Servicio"

                                        class="w-full">
                                        <el-option v-for="item in servicios.data" :key="item.id_servicio" :disabled="item.insumosasociados" :label="item.nombre_servicio"
                                            :value="item.id_servicio">
                                          </el-option>
                                    </el-select>


                                </el-form-item>

                            </label>
                        </div>
                        <div v-if="inventario && inventario.data" class="w-2/5  py-1">
                            <label>
                                <p class="ml-1">Insumos</p>
                                <el-form-item prop="servicio">
                                    <el-select v-model="dataInsumo.idRecurso" placeholder="Inventario"
                                        class="w-full">
                                        <el-option v-for="item in inventario.data" :key="item.id_recurso" :label="item.nombre"
                                            :value="item.id_recurso"></el-option>
                                    </el-select>
                                </el-form-item>
                            </label>
                        </div>

                        <div style="margin-top: 15px;" v-if="(dataInsumo.idRecurso && asociacionServicio.servicioId) || asociacionServicio.insumo.length ">
                          <p class="ml-1">unidades</p>

                          <el-input placeholder="Cantidad a consumir" v-model="dataInsumo.montoConsumible" class="input-with-select w-96">
                            <el-button class="w-20" @click="agregarInsumo(dataInsumo)"  slot="append" icon="el-icon-check"></el-button>
                          </el-input>
                        </div>

                        <div class=" mb-10 mt-10 w-10/12 m-0 p-0" v-if="(dataInsumo.idRecurso && asociacionServicio.servicioId) || asociacionServicio.insumo.length ">
                          <el-table :data="asociacionServicio.insumo" class="w-full">
                              <!-- {{ scope.$index, tableData}} -->
                              <el-table-column prop="idRecurso" label="Id"></el-table-column>
                              <el-table-column prop="nombre" label="Insumo"></el-table-column>
                              <el-table-column prop="montoConsumible" label="utilizar"></el-table-column>
                              <el-table-column fixed="right" label="Operaciones" width="170">
                                  <template slot-scope="scope">
                                    <button slot="reference" :disabled="loading"
                                              class="w-full  text-red-600 bg-none uppercase py-2 " @click="eliminarAsociacion(scope.row.idRecurso)"
                                              type="button" >Borrar</button>
                                  </template>
                              </el-table-column>
                          </el-table>
                      </div>



                        <div v-else  class=" w-2/5 ml-14 mb-10">
                          <div class=" flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="warning">
                              <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                      clip-rule="evenodd"></path>
                              </svg>
                              <span class="sr-only">warning</span>
                              <div>
                                  <span class="font-medium">Antes de iniciar con la asociacion del servicio y los insumos tome en cuenta lo siguiten:</span>
                                  <ul class="mt-1.5 ml-4 list-disc list-inside">
                                      <li>Antes tuvo que a ver registrado por lo mismo un servicio</li>
                                      <li>Antes tuvo que a ver registrado por lo mismo un insumo</li>
                                  </ul>
                              </div>
                          </div>
                      </div>

                    </div>
                    <br />
                    <div class="flex flex-wrap justify-around">
                        <button :disabled="loading" type="button" v-on:click="registrarServicio"
                            class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                            Asociar
                        </button>
                    </div>
                </el-form>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from "../../../config";
import axios from "axios";
export default {
    name: "product-add",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Agregar nuevo Servicio",
    },
    created() {
      this.$store.dispatch('obtenerInventario');
      this.$store.dispatch("obtenerServicios");
    },
    data() {
        return {
          asociacionServicio:{
            servicioId:0,
            insumo:[]
          },
          dataInsumo:{
            idRecurso:0,
            nombre:'',
            montoConsumible:null,
          },
          nuevoServicio: {
              nombre: '',
              descripcion: '',
              costo: '',
          },
          rules: {
              nombre: [
                  { required: true, message: 'Es necesario ingresar el nombre del servicio', trigger: 'change' },
                  { min: 2,  message: 'El nombre del servicio tiene que ser como minimo 2 caracteres', trigger: 'change' }
              ],
              descripcion: [
                  { required: true, message: 'Es necesario ingresar la descripcion del servicio', trigger: 'change' },
                  { min: 5,  message: 'La descripcion tiene que ser mayor a  5 caracteres', trigger: 'change' }
              ],
              costo: [
                  { required: true, message: 'Es necesario ingresar el costo del servicio', trigger: 'change' },
                  { min: 1,  message: 'El costo del servicio tiene que ser como minimo 1 digito', trigger: 'change' }
              ],
          },
          loading: false,
        };
    },
    methods: {
      eliminarAsociacion(id){
        this.asociacionServicio.insumo=this.asociacionServicio.insumo.filter((value)=> value.idRecurso != id)
      },
      agregarInsumo(data){

        this.inventario.data.forEach((value) => {
          if(value.id_recurso === data.idRecurso){
            data.nombre = value.nombre
          }
        })

        this.inventario.data= this.inventario.data.filter((value) => {
          if(value.id_recurso != data.idRecurso){
            return value
          }
        })
        this.asociacionServicio.insumo.push(data);
        this.dataInsumo={
          idRecurso:0,
          nombre:'',
          montoConsumible:null,
        }
      },
      async registrarServicio() {
          this.$refs['registrarServicio'].validate(async (valid) => {
              if(valid){
                  try {
                      this.$store.dispatch("getLoadingApp", true);
                      this.loading = true;
                      const token = localStorage.getItem("token_acess");
                      const request = await axios({
                          method: "POST",
                          baseURL: config.backend.baseURL,
                          url: "/servicios-recurso/registrar",
                          headers: {
                              ["auth-token"]: token,
                          },
                          data: this.asociacionServicio,
                      });
                      this.$store.dispatch("getLoadingApp", false);
                      this.loading = false;
                      this.$message({
                          message: "Registrado Exitosamente",
                          type: "success",
                      });
                      this.$router.push({ path: "/admin/servicios" });
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
                      console.clear();
                  }
              }
    });

      },
    },
    computed: {
        inventario() {
            return this.$store.getters.getInventario;
        },
        servicios() {
            return this.$store.getters.getServicios;
        },

    }
};
</script>
