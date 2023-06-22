<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 xl:mb-0 px-4">
      <div class="relative flex flex-col min-w-0 w-full">
        <div class="flex flex-wrap justify-around px-3">
          <div v-if="estadisticaPacientes && estadisticaPacientes.length" class="w-full md:w-2/5 mx-1 mb-3 shadow-lg rounded bg-white p-1">
            <highcharts :options="returnEstadisticaPacientes(estadisticaPacientes)"></highcharts>
          </div>
          <div class="w-full md:w-2/5 mx-1 mb-3 shadow-lg rounded bg-white p-1">
            <highcharts :options="{}"></highcharts>
          </div>
          <div class="w-full md:w-2/5 mx-1 mb-3 shadow-lg rounded bg-white p-1">
            <highcharts :options="{}"></highcharts>
          </div>
          <div class="w-full md:w-2/5 mx-1 mb-3 shadow-lg rounded bg-white p-1">
            <highcharts :options="{}"></highcharts>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap mt-4 ">
        <div class="w-full mb-12 xl:mb-0 px-4">
          <div class="relative  flex  flex-col min-w-0 break-words w-50 mb-6">
            <img src="../../assets/img/dashboard.svg" style="display: block;margin-left: auto;margin-right: auto; " alt="">
          </div>
        </div>
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
          fechaInicio: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
          fechaFinal: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        }
      }
    },
    methods: {
      obtenerEstadisticas() {
        this.$store.dispatch('actionEstadisticas', this.payloadSearch);
      },
      returnEstadisticaPacientes(payload) {
        const resultado = {
          title: { text: `Registro de pacientes por fecha ${this.payloadSearch.fechaInicio} al ${this.payloadSearch.fechaFinal}` },
          legend: {
            enabled: true,
          },
          credits: { enabled: true },
          plotOptions: {
            line: {
              dataLabels: { enabled: true },
              enableMouseTracking: true,
            },
          },
          xAxis: {
            categories: ['Ventas por fecha'],
          },
          series: [
            {
              data: [0],
              name: "Promedios de ventas",
              label: "Actual"
            },
          ],
        };
        for (const estadistica of payload) {
          const objetoSeries = {
            name: `${estadistica.fecha_creacion.slice(0, 10)}`,
            data: [0, Number(estadistica.count)]
          };
          resultado.series.push(objetoSeries);
        }
        return resultado;
      },
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
