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
          <div v-if="usuarioDetalle && usuarioDetalle.data">
            <form @submit.prevent="modificarUsuario(usuarioDetalle.data[0])">
              <div class="flex flex-wrap justify-around">
                <div class="w-11/12">
                  <el-divider>Datos del Trabajador</el-divider>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Nombres</p>
                    <el-input placeholder="Nombres del trabajador" auto-complete="name" v-model="usuarioDetalle.data[0].nombre"></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Apellidos</p>
                    <el-input placeholder="Apellidos del trabajador" auto-complete="family-name" v-model="usuarioDetalle.data[0].apellido"></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Correo</p>
                    <el-input placeholder="Correo del trabajador" type="email" auto-complete="email" v-model="usuarioDetalle.data[0].correo"></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Telefono</p>
                    <el-input placeholder="Telefono del trabajador" type="tel" auto-complete="tel" v-model="usuarioDetalle.data[0].telefono"></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Especialización</p>
                    <el-input placeholder="Especialización del trabajador" v-model="usuarioDetalle.data[0].especializacion"></el-input>
                  </label>
                </div>
                <div class="w-11/12">
                  <el-divider>Datos de Autenticación</el-divider>
                </div>
                <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Nueva Contraseña</p>
                    <el-input type="password" placeholder="Contraseña del trabajador" auto-complete="new-password" v-model="usuarioDetalle.data[0].clave" show-password></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Confirmar Contraseña</p>
                    <el-input type="password" placeholder="Contraseña del trabajador" auto-complete="confirm-password" v-model="usuarioDetalle.data[0].claveRecuperacion" show-password></el-input>
                  </label>
                </div>
                <div v-if="nivelesUsuario && nivelesUsuario.data" class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Nivel / Rol</p>
                    <el-select v-model="usuarioDetalle.data[0].nivel" placeholder="Nivel del trabajador" class="w-full">
                      <el-option v-for="item in nivelesUsuario.data" :key="item.id_nivel_usuario" :label="item.nombre_nivel_usuario" :value="item.id_nivel_usuario"></el-option>
                    </el-select>
                  </label>
                </div>
                <div class="w-11/12">
                  <el-divider>Preguntas de Seguridad</el-divider>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Pregunta</p>
                    <el-input placeholder="Pregunta de Seguridad" v-model="usuarioDetalle.data[0].pregunta1"></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Respuesta</p>
                    <el-input placeholder="Respuesta de Seguridad" v-model="usuarioDetalle.data[0].respuesta1"></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Pregunta</p>
                    <el-input placeholder="Pregunta de Seguridad" v-model="usuarioDetalle.data[0].pregunta2"></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Respuesta</p>
                    <el-input placeholder="Respuesta de Seguridad" v-model="usuarioDetalle.data[0].respuesta2"></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Pregunta</p>
                    <el-input placeholder="Pregunta de Seguridad" v-model="usuarioDetalle.data[0].pregunta3"></el-input>
                  </label>
                </div>
                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                  <label>
                    <p class="ml-1">Respuesta</p>
                    <el-input placeholder="Respuesta de Seguridad" v-model="usuarioDetalle.data[0].respuesta3"></el-input>
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
  </div>
</template>
<script>
  import config from "../../../config";
  import axios from "axios";
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
        loading: false,
      }
    },
    methods: {
      async modificarUsuario(payload) {
        try {
          this.$store.dispatch('getLoadingApp', true);
          this.loading = true;
          const token = localStorage.getItem('token_acess');
          const request = await axios({
            method: 'PATCH',
            baseURL: config.backend.baseURL,
            url: '/usuario/' + payload.id,
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
          this.$router.push({ path: '/admin/usuarios' });
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
      async eliminarUsuario() {
        this.$message({
          message: 'Eliminado Correctamente',
          type: 'success'
        });
      },
    },
    computed: {
      usuarioDetalle () {
        return this.$store.getters.getdetalleUsuarioId;
      },
      nivelesUsuario () {
        return this.$store.getters.getnivelesUsuarios;
      }
    }
  };
</script>
