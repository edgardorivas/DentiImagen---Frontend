<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 xl:mb-0 px-4">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-base text-blueGray-700">
                Lista de Presupuestos de Venta
              </h3>
            </div>
            <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <router-link to="/admin/presupuesto/venta/agregar" class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Agregar nuevo
              </router-link>
            </div>
          </div>
        </div>
        <!-- <div class="px-5 mt-3 flex justify-start">
          <button @click="modal = true" class="bg-verdiAnderson text-white py-2 px-3 rounded-md uppercase">
            Busqueda Avanzada
          </button>
        </div> -->
        <div class="mt-5">
          <div v-if="presupuestos && presupuestos.length">
            <el-table :data="presupuestos" class="w-full">
              <el-table-column fixed prop="paciente" label="Paciente" width="190">
                <template slot-scope="scope">
                  <router-link :to="`/admin/paciente/id/${scope.row.id_pacinte}`" class="uppercase text-verdiAnderson">
                    @{{ scope.row.paciente }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="apellidos" label="Apellido"></el-table-column>
              <el-table-column prop="cedula" label="Cedula"></el-table-column>
              <el-table-column prop="trabajador" label="Odontologo"></el-table-column>
              <el-table-column prop="total_bs" label="Total Bs"></el-table-column>
              <el-table-column prop="total_dolares" label="Total $"></el-table-column>
              <el-table-column prop="precio_impuesto" label="Precio Impuesto"></el-table-column>
              <el-table-column prop="precio_unitario" label="Presio Unitario"></el-table-column>
              <el-table-column prop="iva" label="Iva"></el-table-column>
              <el-table-column prop="pago" label="Tipo de pago"></el-table-column>
              <el-table-column prop="fecha" label="Creado">
                <template slot-scope="scope">
                  <p class="">{{ parseDate(scope.row.fecha) }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else>
            <div class="text-center py-10">
              <p>Aun no tienes Presupuestos creados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import config from "../../../../config";
  export default {
    name: "presupuesto-listar",
    metaInfo: {
      title: config.frontend.title,
      titleTemplate: "%s | Lista de Presupuestos",
    },
    created() {},
    data() {
      return {
        modal: false,
        search: {},
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
        this.$store.dispatch('getListaPresupuestos', this.search);
      }
    },
    computed: {
      presupuestos() {
        return this.$store.getters.getListaPresupuestos;
      }
    },
  };
</script>
