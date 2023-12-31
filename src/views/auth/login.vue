<template>
  <div class="mt-14 mb-8 bg-white md:mx-48" id="login">
    <div class="text-center mb-3">
      <h1 class="font-extrabold text-2xl">¡Bienvenido!</h1>
      <p>Por favor ingrese sus datos de acceso</p>
    </div>
    <br />
    <form class="flex flex-wrap mx-5"  @submit.prevent="loginUsuario">
      <div class="w-full mb-3">
        <input class="block w-full px-3  py-2.5 rounded-lg border" required v-model="auth.usuario" type="text" placeholder="Usuario" >
      </div>
      <div class="w-full">
        <input class="block w-full px-3 py-2.5 rounded-lg border" required v-model="auth.contrasena" type="password" placeholder="Contraseña">
      </div>
      <br />
      <div class="w-full mt-12">
        <button  class="block w-full py-3 rounded-lg bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100">Iniciar sesión</button>
      </div>
    </form>
    <br />
    <br />
    <p class="text-center w-full">
      ¿Olvidaste tu contraseña?
      <router-link to="/auth/recuperar" class="text-blue-600">Recuperar ahora</router-link>
    </p>
  </div>
</template>
<script>
  import axios from 'axios';
  import config from './../../config';
  export default {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete // Docs para autocompletar
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'login',
    metaInfo: {
      title: config.frontend.title,
      titleTemplate: '%s | Login',
    },
    data () {
      return {
        // Se almacenan las variables que usaras en la vista
        auth: {
          usuario: null,
          contrasena: null ,
        },
        loading: false,
      }
    },
    methods: {
      async loginUsuario() {
        try {
          const { usuario, contrasena } = this.auth;
          this.$store.dispatch('getLoadingApp', true);

          const request = await axios({
            method: 'POST',
            baseURL: config.backend.baseURL,
            url: '/login',
            data: {
              usuario,
              clave: contrasena,
            }
          });
          //aqui se guarda el token de acceso
          localStorage.setItem('token_acess', request.data.data.token);
          //console.log(localStorage.getItem('token_acess'));
          this.$message({
            message: 'Iniciaste sesion de forma correcta',
            type: 'success'
          });

          this.$store.dispatch('getLoadingApp', false);
          this.$router.push({ path: '/admin/dashboard' });
          return request
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
          console.clear()
        }
      }
    }
  }
</script>
<style type="scss" scoped>
  p {
    line-height: 24px;
    color: #3f3f3f;
  }
</style>
