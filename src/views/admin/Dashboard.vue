<template>
  <div>
    <div class="">
      <div class="flex flex-wrap mt-4 ">
        <div class="w-full mb-12 xl:mb-0 px-4">
          <div class="relative  flex  flex-col min-w-0 break-words w-50 mb-6">
            <img src="../../assets/img/dashboard.svg" style="display: block;margin-left: auto;margin-right: auto; " alt="">
          </div>
        </div>
        {{estadisticaPacientes}}
        {{estadisticaVentas}}
        {{estadisticaPresupuestos}}
        {{estadisticaCompras}}
      </div>
    </div>
  </div>
</template>
<script>
  import config from './../../config';
  export default {
    name: "dashboard-page",
    metaInfo: {
      title: config.frontend.title,
      titleTemplate: '%s | Inicio',
    },
    created() {
      this.obtenerEstadisticas()
    },
    data() {
      return {
        payloadSearch: {
          fechaInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          fechaFinal: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        }
      }
    },
    methods: {
      obtenerEstadisticas() {
        this.$store.dispatch('actionEstadisticas', this.payloadSearch);
      }
    },
    computed: {
      estadisticaPacientes() {
        return this.$store.getters.getEstadisticaPaciente;
      },
      estadisticaVentas() {
        return this.$store.getters.getEstadisticaVenta;
      },
      estadisticaPresupuestos() {
        return this.$store.getters.getEstadisticaPresupuesto;
      },
      estadisticaCompras() {
        return this.$store.getters.getEstadisticaCompra;
      },
    },
  };
</script>
