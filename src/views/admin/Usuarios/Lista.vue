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
              <button v-on:click="openNewTab" class="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                  PDF
              </button>
              <router-link to="/admin/usuario/agregar" class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ">
                Agregar nuevo
              </router-link>

            </div>
          </div>
        </div>
        <div class="px-5 mt-3 flex justify-start">

          <button @click="modal = true" class="bg-verdiAnderson text-white py-2 px-3 rounded-md uppercase">
            Busqueda Avanzada
          </button>
        </div>
        <div class="mt-5">0
          <div v-if="usuarios && usuarios.data">
            <el-table :data="usuarios.data" class="w-full">
              <el-table-column fixed prop="usuario" label="Usuario" width="190">
                <template slot-scope="scope">
                  <router-link :to="`/admin/usuarios/${scope.row.id_usuario}`" class="uppercase text-verdiAnderson">
                    @{{scope.row.usuario}}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="nombre" label="Nombres"></el-table-column>
              <el-table-column prop="apellido" label="Apellidos"></el-table-column>
              <el-table-column prop="correo" label="Correo Electronico"></el-table-column>
              
              <el-table-column prop="rol" label="Rango">
                <template slot-scope="scope">
                  <p class="text-verdiAnderson uppercase">{{scope.row.rol}}</p>
                </template>
              </el-table-column>

              <el-table-column prop="especializacion" label="Especializacion"></el-table-column>

              <el-table-column prop="fecha" label="Creado">
                <template slot-scope="scope">
                  <p class="">{{parseDate(scope.row.fecha)}}</p>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="Operaciones"
                width="170">
                <template slot-scope="scope">
                  <p class="text-center">
                    <router-link :to="`/admin/usuarios/${scope.row.id_usuario}`" class="text-verdiAnderson text-xs w-full">
                      Editar
                    </router-link>
                  </p>
                </template>
              </el-table-column>
            </el-table>
            <!-- Modales de busqueda -->
            <el-drawer title="Busqueda Avanzada" :visible.sync="modal" direction="rtl" :before-close="handleClose">
              <form class="h-full" @submit.prevent="aplicarFiltro">
                <div class="flex flex-col content-between justify-between h-full">
                  <div class="flex flex-col">
                    <!-- Contenido -->
                    <div class="w-full px-2 mb-3 py-1">
                      <label>
                        <p class="ml-1 mb-1">Nombre</p>
                        <el-input placeholder="Nombre del Trabajador" v-model="search.nombre"></el-input>
                      </label>
                    </div>
                    <div class="w-full px-2 mb-3 py-1">
                      <label>
                        <p class="ml-1 mb-1">Usuario</p>
                        <el-input placeholder="Usuario del Trabajador" v-model="search.usuario"></el-input>
                      </label>
                    </div>
                    <div class="w-full px-2 mb-3 py-1">
                      <label>
                        <p class="ml-1 mb-1">Especializacion</p>
                        <el-input placeholder="Especializacion del Trabajador" v-model="search.especializacion"></el-input>
                      </label>
                    </div>
                    <div class="w-full px-2 mb-3 py-1">
                      <label>
                        <p class="ml-1 mb-1">Fecha</p>
                        <el-date-picker v-model="search.fecha" type="date" placeholder="Selecciona una fecha"></el-date-picker>
                      </label>
                    </div>
                    <div v-if="nivelesUsuario && nivelesUsuario.data" class="w-full px-2 mb-3 py-1">
                      <label>
                        <p class="ml-1">Nivel / Rol</p>
                        <el-select v-model="search.nivel" placeholder="Nivel del trabajador" class="w-full">
                          <el-option label="Ninguno" :value="null"></el-option>
                          <el-option v-for="item in nivelesUsuario.data" :key="item.id_nivel_usuario" :label="item.nombre_nivel_usuario" :value="item.id_nivel_usuario"></el-option>
                        </el-select>
                      </label>
                    </div>
                    <!-- Fin del contenido -->
                  </div>
                  <div>
                    <button class="w-full bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2" type="submit">Buscar</button>
                  </div>
                </div>
              </form>
            </el-drawer>
          </div>
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
      // this.$store.dispatch('obtenerListaDeUsuarios')
      this.aplicarFiltro();
    },
    data() {
      return {
        modal: false,
        search: {
          nombre: "",
          usuario: "",
          fecha: "",
          especializacion: "",
          nivel: "",
        },
        url:`http://localhost:3000/pdf/trabajadores`,

      }
    },
    methods: {
      parseDate(date) {
        return new Date(date).toLocaleString();
      },
      handleClose() {
        this.modal = false;
      },
      aplicarFiltro() {
        this.$store.dispatch('obtenerDetalleUsuario', this.search);
      },
      openNewTab() {
          window.open(this.url, '_blank');
      }
    },
    computed: {
      // usuarios () {
      //   return this.$store.getters.getusuarios;
      // },
      usuarios () {
        return this.$store.getters.getdetalleUsuarioId;
      },
      nivelesUsuario () {
        return this.$store.getters.getnivelesUsuarios;
      },
    }
  }
</script>
<style lang="scss">
  .el-date-editor {
    width: 100% !important;
  }
</style>
