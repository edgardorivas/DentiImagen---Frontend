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
        <div class="mt-5">
          <div v-if="usuarios && usuarios.data">
            <el-table :data="usuarios.data" class="w-full">
              <el-table-column fixed prop="usuario" label="Usuario" width="190">
                <template slot-scope="scope">
                  <router-link :to="`/admin/usuarios/${scope.row.id}`" class="uppercase text-verdiAnderson">
                    @{{scope.row.usuario}}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="nombre" label="Nombres"></el-table-column>
              <el-table-column prop="apellido" label="Apellidos"></el-table-column>
              <el-table-column prop="correo" label="Correo Electronico"></el-table-column>
              <el-table-column prop="nivel" label="Rango" width="190">
                <template slot-scope="scope">
                  <p class="text-verdiAnderson uppercase">{{scope.row.nivel}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="especializacion" label="Especializacion" width="190">
                <template slot-scope="scope">
                  <p class="text-verdiAnderson uppercase">{{scope.row.especializacion}}</p>
                </template>
              </el-table-column>
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
                    <router-link :to="`/admin/usuarios/${scope.row.id}`" class="text-verdiAnderson text-xs w-full">
                      Editar
                    </router-link>
                  </p>
                </template>
              </el-table-column>
            </el-table>
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
