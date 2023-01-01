<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 xl:mb-0 px-4">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-base text-blueGray-700">
                Lista de Usuarios
              </h3>
            </div>
            <div
              class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
            >
              <router-link to="/admin/usuario/agregar" class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ">
                Agregar nuevo
              </router-link>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <!-- Projects table -->
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Nombres
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Usuario
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Especializacion
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Nivel
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Creado
                </th>
              </tr>
            </thead>
            <tbody v-if="(usuarios && usuarios.data)">
              <tr v-for="datos in usuarios.data" :key="datos.id">
                <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left "
                >
                  <router-link :to="'/admin/usuarios/'+datos.id" class="text-emerald-500 hover:text-emerald-600" >
                    {{datos.nombre}} {{datos.apellido}}
                  </router-link>
                </td>
                <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                >
                  <router-link :to="'/admin/usuarios/'+datos.id" class="text-emerald-500 hover:text-emerald-600" >
                    @{{datos.usuario}}
                  </router-link>
                </td>
                <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left uppercase"
                >
                  {{datos.especializacion}}
                </td>
                <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left uppercase"
                >
                  {{datos.nivel}}
                </td>
                <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left uppercase"
                >
                  {{parseDate(datos.fecha)}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import config from '../../../config';
  export default {
    name: 'users-list',
    metaInfo: {
      title: config.frontend.title,
      titleTemplate: '%s | Lista de Usuarios',
    },
    created() {
      this.$store.dispatch('obtenerListaDeUsuarios')
    },
    methods: {
      parseDate(date) {
        return new Date(date).toLocaleString();
      },
    },
    computed: {
      usuarios(){
        return this.$store.getters.getusuarios;
      }
    }
  }
</script>
