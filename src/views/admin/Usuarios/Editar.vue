<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 xl:mb-0 px-4">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="flex justify-center">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <h3 v-if="usuarioDetalle && usuarioDetalle.data" class="font-semibold text-xl text-blueGray-700 uppercase">
              Editando el usuario <i class="text-verdiAnderson font-extrabold">@{{usuarioDetalle.data[0].usuario}}</i>
            </h3>
          </div>
        </div>
        <div class="mt-5 pb-5">
          {{usuarioDetalle}}
          <form @submit.prevent="modificarUsuario">
            <div class="flex flex-wrap justify-around">
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Nombres</p>
                  <el-input placeholder="Nombres del trabajador" v-model="usuarioDetalle.data[0].nombre"></el-input>
                </label>
              </div>
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Apellidos</p>
                  <el-input placeholder="Apellidos del trabajador" v-model="usuarioDetalle.data[0].apellido"></el-input>
                </label>
              </div>
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Especialización</p>
                  <el-input placeholder="Especialización del trabajador" v-model="usuarioDetalle.data[0].especializacion"></el-input>
                </label>
              </div>
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Nivel / Rol</p>
                  <el-input placeholder="Nivel del trabajador" v-model="usuarioDetalle.data[0].nivel"></el-input>
                </label>
              </div>
            </div>
            <br>
            <div class="flex flex-wrap justify-around">
              <button class="w-full md:w-1/3 bg-red-500 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Eliminar</button>
              <button class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import config from "../../../config";
  export default {
    name: "users-add",
    metaInfo: {
      title: config.frontend.title,
      titleTemplate: "%s | Editar Usuario",
    },
    created() {
      this.$store.dispatch('obtenerDetalleUsuario', this.$route.params.ID);
    },
    data() {
      return {
        usuario: {},
      }
    },
    methods: {
      async modificarUsuario() {
        this.$message({
          message: 'Modificado Correctamente',
          type: 'success'
        });
      },
      async eliminarUsuario() {
        this.$message({
          message: 'Eliminado Correctamente',
          type: 'success'
        });
      },
    },
    computed: {
      usuarioDetalle(){
        return this.$store.getters.getdetalleUsuarioId;
      }
    }
  };
</script>
