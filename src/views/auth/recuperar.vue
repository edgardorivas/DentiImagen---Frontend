<template>
  <div class="bg-white w-10/12 mx-36 mt-14 mb-8 flex flex-wrap ">
    <div class="text-center mb-3 p-2">
        <h1 class="font-extrabold text-lg">Recuperar contraseña</h1>
        <p class="mt-2">
          No te preocupes, puedes recuperar tú <br />
          contraseña a continuación
        </p>



        <!--formulario para la busqueda del correo-->
        <form @submit.prevent="buscarEmail"  class="flex flex-wrap mt-10 mx-5" v-if="!siguiente" >
          <div  class="w-full">
            <div class="w-full mb-3">
              <input type="number" class="w-full px-3 py-2.5 rounded-lg border" v-model="telefono" id="input-number" placeholder="telefono"/>
              <!--pequeño mensaje de error: <p class="text-red-500 text-sm italic mt-1">Please choose a password.</p>-->
            </div>
            <div class="w-full mt-2">
              <button  class=" block w-full py-3 rounded-lg bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100">Siguiente >></button>
            </div>
          </div>
        </form>

        <!--formulario para responder las preguntas de seguridad-->
        <form  class="flex flex-wrap mx-5 mt-10" @submit.prevent="validarPreguntas" v-else-if="siguiente==true">
          <div  class="w-full"  >

            <div class="w-full mb-3">
              <label for="price" class="block text-sm text-left font-medium leading-6 text-gray-900">¿ {{ DatosPregunta.pregunta_seguriada }} ?</label>
              <input type="text"  class="w-full px-3 py-2.5 rounded-lg border" v-model="pregunta.respuesta1" v-bind:placeholder="datos.pregunta_uno" />
            </div>

            <div class="w-full mb-3">
              <label for="price" class="block text-sm text-left font-medium leading-6 text-gray-900">¿ {{ DatosPregunta.pregunta_seguriada_dos }} ?</label>
              <input type="text"  class="w-full px-3 py-2.5 rounded-lg border" v-model="pregunta.respuesta2" v-bind:placeholder="datos.pregunta_dos" />
            </div>

            <div class="w-full mb-3">
              <label for="price" class="block text-sm text-left font-medium leading-6 text-gray-900">¿ {{ DatosPregunta.pregunta_seguriada_tercero }} ?</label>
              <input type="text"  class="w-full px-3 py-2.5 rounded-lg border" v-model="pregunta.respuesta3" v-bind:placeholder="datos.pregunta_tres" />
            </div>

            <div class="w-full mt-2">
              <button class=" block w-full py-3 rounded-lg bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100">Continuar</button>
            </div>
          </div>
        </form>


        <!-- <el-form  v-else-if="siguiente==true" status-icon @submit.prevent="validarPreguntas" label-width="120px" class="demo-ruleForm">
        <el-form-item :label="DatosPregunta.pregunta_seguriada" >
          <el-input type="text" v-model="pregunta.respuesta1" v-bind:placeholder="datos.pregunta_uno" ></el-input>
        </el-form-item>

        <el-form-item :label="DatosPregunta.pregunta_seguriada_dos" >
          <el-input type="text" v-model="pregunta.respuesta2" v-bind:placeholder="datos.pregunta_dos"></el-input>
        </el-form-item>

        <el-form-item :label="DatosPregunta.pregunta_seguriada_tercero">
          <el-input v-model="pregunta.respuesta3" v-bind:placeholder="datos.pregunta_tres"></el-input>
        </el-form-item>

        </el-form>

        <div class="w-full mt-2">
          <button class=" block w-full py-3 rounded-lg bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100">Continuar</button>
        </div>
        </div> -->




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

        <br />

        <br>
        <div class="text-center">
          <img alt="Vue logo" width="20px" src="@/assets/flechaRegreso.png" class="inline pl-1">
          <router-link to="/auth/login" class="text-blue-600 mt-7">  Ir a inicio de sesión</router-link>
        </div>
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
        telefono: null,
        siguiente: false,
        datos: null,
        informacionPreguntas:null,
        DatosPregunta: null,
      }
    },
    methods: {
      async buscarEmail(){
        try {
          this.$store.dispatch('getLoadingApp', true);
          const request = await axios({
            method: 'get',
            baseURL: config.backend.baseURL,
            url: `telefono/recuperar?telefonoUsuario=${this.telefono}`,
          });
          this.datos = request.data.data[0]
          this.$store.dispatch('getLoadingApp', false);
          // this.informacionPreguntas =request
          console.log("================data")
          console.log({idUser:request.data.data[0].id_usuario})
          await this.buscarPreguntas(request.data.data[0].id_usuario)


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
        }
      },

      async buscarPreguntas(idUser){
        try {
          console.log("================data")
          console.log({idUser})
          this.$store.dispatch('getLoadingApp', true);
          const request = await axios({
            method: 'get',
            baseURL: config.backend.baseURL,
            url: `preguntas-seguridad/recuperar?idUser=${idUser}`,
          });
          this.$message({
            message: 'Se verifico tu numero de telefono',
            type: 'success'
          });
          this.$store.dispatch('getLoadingApp', false);
          this.DatosPregunta =request.data.data[0]

          this.datos ={
            respuesta_uno:request.data.data[0].respuesta_seguridad,
            respuesta_dos:request.data.data[0].respuesta_seguridad_dos,
            respuesta_tres:request.data.data[0].respuesta_seguridad_tercero
          }


          this.siguiente = !this.siguiente;
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
            url: `/usuario/${this.DatosPregunta.fk_usuario}/recuperacion`,
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
        }
      },
      regresar: function() {
        this.telefono = null;
        this.pregunta.respuesta1 = null;
        this.pregunta.respuesta2 = null;
        this.pregunta.respuesta3 = null;
        this.siguiente = false;
      },
    }
  }
</script>
