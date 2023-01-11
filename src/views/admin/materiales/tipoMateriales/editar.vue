<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 xl:mb-0 px-4">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="flex justify-center">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <h3 v-if="TipoMateriales && TipoMateriales.data" class="font-semibold text-xl text-blueGray-700 uppercase">
              Editando Tipo Material <i class="text-verdiAnderson font-extrabold">@{{TipoMateriales.data[0].nombre_tipo_recurso}}</i>
            </h3>
          </div>
        </div>
        <div class="mt-5 pb-5">
          <div v-if="TipoMateriales && TipoMateriales.data">
            <form @submit.prevent="modificarTipoMaterial(TipoMateriales.data[0])">
              <div class="flex flex-wrap justify-around">
                <div class="w-11/12">
                  <el-divider>Datos DEl Tipo Material</el-divider>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Nombre</p>
                    <el-input placeholder="Nombres del tipo de material" type="text"  auto-complete="name" v-model="TipoMateriales.data[0].nombre_tipo_recurso"></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Descripcion</p>
                    <el-input placeholder="Descripcion del tipo de material" type="text" auto-complete="family-name" v-model="TipoMateriales.data[0].descripcion_tipo_recurso"></el-input>
                  </label>
                </div>    
              </div>
              <br>
              <div class="flex flex-wrap justify-around">
                <el-popconfirm
                  confirm-button-text='Si, Eliminar'
                  confirm-button-type="danger"
                  cancel-button-text='No, Cancelar'
                  icon="el-icon-info"
                  icon-color="red"
                  :title="`Estas seguro de eliminar el material ${TipoMateriales.data[0].nombre_tipo_recurso}?`"
                  class="w-full md:w-1/3"
                  @confirm="eliminarTipoMaterial(TipoMateriales.data[0])"
                >
                  <button slot="reference" :disabled="loading" class="w-full bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md" type="button">Eliminar</button>
                </el-popconfirm>
                <button :disabled="loading" class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md" type="submit">Guardar</button>
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
    name: "typeproduct-update",
    metaInfo: {
      title: config.frontend.title,
      titleTemplate: "%s | Editar Tipo Material",
    },
    created() {
      this.$store.dispatch('obtenerDetalleTipoProducto', { id: this.$route.params.ID });
    },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      async modificarTipoMaterial(payload) {
        try {
          this.$store.dispatch('getLoadingApp', true);
          this.loading = true;
          const token = localStorage.getItem('token_acess');
          const request = await axios({
            method: 'PATCH',
            baseURL: config.backend.baseURL,
            url: '/tipo-recurso/'+ payload.id_recurso,
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
      async eliminarTipoMaterial(payload) {
        console.log(payload.id_tipo_recurso)
        
        try {
          this.$store.dispatch('getLoadingApp', true);
          this.loading = true;
          const token = localStorage.getItem('token_acess');
          const request = await axios({
            method: 'DELETE',
            baseURL: config.backend.baseURL,
            url: '/tipo-recurso/'+ payload.id_tipo_recurso,
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
    },
    computed: {
      TipoMateriales () {
        return this.$store.getters.getDetalleTipoProductoId;
      },
    }
  };
</script>
<style lang="scss">
  .el-button--danger {
    background-color: #dc2626;
  }
</style>
