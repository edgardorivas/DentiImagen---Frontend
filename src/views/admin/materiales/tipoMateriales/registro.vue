<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 xl:mb-0 px-4">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div class="flex justify-center">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                Registro de Tipo Materiales
              </h3>
            </div>
          </div>
          <div class="mt-5 pb-5">
            <form @submit.prevent="registroMaterial">
              <div class="flex flex-wrap justify-around">
                <div class="w-11/12">
                  <el-divider>Datos del tipo de materia</el-divider>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Nombre</p>
                    <el-input placeholder="Nombre del tipo de material" auto-complete="name" v-model="nuevoTipoMaterial.nombre"></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Descripcion</p>
                    <el-input placeholder="Descripcion del tipo material" auto-complete="family-name" v-model="nuevoTipoMaterial.descripcion"></el-input>
                  </label>
                </div>
              </div>
              <br>
              <div class="flex flex-wrap justify-around">
                <button :disabled="loading" class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Guardar</button>
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
      name: "typeProduct-add",
      metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Agregar nuevo material",
      },
      created() {
        console.log("que paso")
      },
      data() {
        return {
          nuevoTipoMaterial: {
            nombre: null,
            descripcion: null,
          },
          loading: false,
        }
      },
      methods: {
        async registroMaterial() {
          try {
            this.$store.dispatch('getLoadingApp', true);
            this.loading = true;
            const token = localStorage.getItem('token_acess');
            const request = await axios({
              method: 'POST',
              baseURL: config.backend.baseURL,
              url: '/tipo-recurso',
              headers: {
                ['auth-token']: token,
              },
              data: this.nuevoTipoMaterial
            });
            this.$store.dispatch('getLoadingApp', false);
            this.loading = false;
            this.$message({
              message: 'Registrado Exitosamente',
              type: 'success',
            });
            this.$router.push({ path: '/admin/tipo-materiales' });
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
      }
    };
  </script>
  