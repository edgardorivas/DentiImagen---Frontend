<template>
  <div class="bg-white md:mx-48 mt-14 mb-8">
    <div class="text-center mb-3 p-2">
      <h1 class="font-extrabold text-lg">Recuperar contraseña</h1>
      <p class="mt-2">
        No te preocupes, puedes recuperar tú <br />
        contraseña a continuación
      </p>
    </div>
    <br />
<!--formulario para la busqueda del correo-->
    <form @submit.prevent="buscarEmail"  class="flex flex-wrap mx-5" v-if="!siguiente" >
      <div  class="w-full">
        <div class="w-full mb-3">
          <input type="email" class="w-full px-3 py-2.5 rounded-lg border" v-model="correo" id="input-email" placeholder="email"/>
          <!--pequeño mensaje de error: <p class="text-red-500 text-sm italic mt-1">Please choose a password.</p>-->
        </div>
        <div class="w-full mt-2">
          <button  class=" block w-full py-3 rounded-lg bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100">Siguiente >></button>
        </div>
      </div>
    </form>

    <!--formulario para responder las preguntas de seguridad-->
    <form  class="flex flex-wrap mx-5" @submit.prevent="validarPreguntas" v-else-if="siguiente==true">
      <div  class="w-full"  >
        <div class="w-full mb-3">
          <input type="text"  class="w-full px-3 py-2.5 rounded-lg border" v-model="pregunta.respuesta1" v-bind:placeholder="datos.pregunta_uno" />
        </div>
        <div class="w-full mb-3">
          <input type="text"  class="w-full px-3 py-2.5 rounded-lg border" v-model="pregunta.respuesta2" v-bind:placeholder="datos.pregunta_dos" />
        </div>
        <div class="w-full mb-3">
          <input type="text"  class="w-full px-3 py-2.5 rounded-lg border" v-model="pregunta.respuesta3" v-bind:placeholder="datos.pregunta_tres" />
        </div>
        <div class="w-full mt-2">
          <button class=" block w-full py-3 rounded-lg bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100">Continuar</button>
        </div>
      </div>
    </form>

    <!--formulario para actualizar la contraseña-->
    <form   class="flex flex-wrap mx-5" @submit.prevent="nuevaClave" v-if="siguiente == 'clave'" >
      <div  class="w-full">
        <div class="w-full mb-3">
          <input type="password"  class="w-full px-3 py-2.5 rounded-lg border" v-model="claveNueva" placeholder="clave nueva"/>
        </div>
        <div class="w-full mb-3">
          <input type="password"  class="w-full px-3 py-2.5 rounded-lg border" v-model="claveRepetida"  placeholder="repite la clave nueva"/>
        </div>
        <div class="w-full mt-2">
          <button  class=" block w-full py-3 rounded-lg bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100">Siguiente >></button>
        </div>
        <div class="w-full mt-2">
          <button v-on:click="regresar" class=" block w-full py-3 rounded-lg bg-blue-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100"> Regresar</button>
        </div>
      </div>
    </form>
    <!-- falta crear la funcion en el methos para pasar la nueva contraseña y redirigir a al login-->

	<br>
    <div class="text-center">
		<img alt="Vue logo" width="20px" src="@/assets/flechaRegreso.png" class="inline pl-1">
		<router-link to="/auth/login" class="text-blue-600 mt-7">  Ir a inicio de sesión</router-link>
	</div>
  </div>
</template>
<script>
	import axios from 'axios';
  import config from './../../config';
	export default {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete // Docs para autocompletar
    // eslint-disable-next-line vue/multi-word-component-names
    name: "recuperar-auth",
    data() {
      return {
        pregunta:{
          respuesta1: null,
          respuesta2: null,
          respuesta3: null
        },
        claveNueva: null,
        claveRepetida: null,
        loading: false,
        correo: null,
        siguiente: false,
        datos: null,
      }
    },
    methods: {
      async buscarEmail(){
        try {
          this.$store.dispatch('getLoadingApp', true);
          const request = await axios({
            method: 'POST',
            baseURL: config.backend.baseURL,
            url: '/login/recuperacion',
            data:{
              email: this.correo,
            }

          });
          this.$message({
            message: 'correo encontrado',
            type: 'success'
          });
          this.datos = request.data.data[0]
          this.$store.dispatch('getLoadingApp', false);
          this.siguiente = !this.siguiente;
          return request;
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
      },

      async validarPreguntas(){
        try {
          this.$store.dispatch('getLoadingApp', true);
          const request = await axios({
            method: 'POST',
            baseURL: config.backend.baseURL,
            url: '/login/comparar',
            data:{
              preguntas: this.pregunta,
              respuestas: this.datos
            }
          });
          this.$message({
            message: request.data.mensaje,
            type: 'success'
          });
          this.siguiente='clave';
          this.$store.dispatch('getLoadingApp', false);

        } catch (error) {
          console.log(error)
          this.$message({
            message: error.response.data.mensaje,
            type: 'error'
          });
          this.$store.dispatch('getLoadingApp', false);
          //console.clear();
        }
      },

      async nuevaClave(){
        try {
          this.$store.dispatch('getLoadingApp', true);
          const request = await axios({
            method: 'PATCH',
            baseURL: config.backend.baseURL,
            url: '/usuario/'+this.datos.id,
            data:{
              clave: this.claveNueva,
              claveRecuperacion: this.claveRepetida,
            }
          });
          this.$router.push({ path: 'login' })
          this.$message({
            message: request.data.mensaje,
            type: 'success'
          });
          this.$store.dispatch('getLoadingApp', false);


        } catch (error) {
          if (error.response) {
            this.$message({
              message: error.response.data.mensaje || 'Sin mensaje del servidor',
              type: 'error',
            });
          } else {
            this.$message({
              message: 'No esta conectado a interned',
              type: 'error'
            });
          }
          this.$store.dispatch('getLoadingApp', false);
          console.clear()
        }
      },
      regresar: function() {
        this.correo = null;
        this.pregunta.respuesta1 = null;
        this.pregunta.respuesta2 = null;
        this.pregunta.respuesta3 = null;
        this.siguiente = false;
      },
    }
  }
</script>
