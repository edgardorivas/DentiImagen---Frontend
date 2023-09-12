<template>
  <div class="flex flex-wrap mt-4 ">
    <div class="w-full mb-12 xl:mb-0 px-4">
      <div v-if="estadisticaPresupuestos && estadisticaPresupuestos.length && estadisticaCompras && estadisticaCompras.length && estadisticaPacientes && estadisticaPacientes.length" class="relative flex flex-col min-w-0 w-full">
        <div class="flex flex-wrap justify-around px-3">
          <!-- {{ estadisticaPacientes }} -->

          <!-- <div v-if="estadisticaPresupuestos && estadisticaPresupuestos.length"
            class="w-full sm:w-full md:w-3/6 mx-1 mb-3 shadow-lg rounded bg-white p-1">
            <highcharts :options="returnEstadisticaPresupuestos(estadisticaPresupuestos)"></highcharts>
          </div>

          <div v-if="estadisticaCompras && estadisticaCompras.length"
            class="w-full sm:w-full md:w-2/5 mx-1 mb-3 shadow-lg rounded bg-white p-1">
            <highcharts :options="returnEstadisticaCompras(estadisticaCompras)"></highcharts>
          </div> -->

          <!-- Pacientes -->
          <!-- <div v-if="estadisticaPacientes && estadisticaPacientes.length"
            class="w-full sm:w-full md:w-2/5 mx-1 mb-3 shadow-lg rounded bg-white p-1">>
            <highcharts :options="returnEstadisticaPacientes(estadisticaPacientes)"></highcharts>
          </div> -->

          <!-- Paciente -->
          <div class="rounded w-6/12 h-11/12 ">
            <CardBarChartVue class="w-11/12 h-11/12"></CardBarChartVue>
          </div>

          <!-- Presupuesto -->
          <div class="rounded w-6/12 h-11/12">
            <CardBar2Chart class="w-11/12 h-11/12"></CardBar2Chart>
          </div>

          <!-- Compra -->


          <!-- Ventas -->
          <!-- <div v-if="estadisticaVentas && estadisticaVentas.length"
            class="w-full sm:w-full md:w-3/6 mx-1 mb-3 shadow-lg rounded bg-white p-1">
            <highcharts :options="returnEstadisticaVentas(estadisticaVentas)"></highcharts>
          </div> -->

          <!-- Ventas -->
          <div v-if="estadisticaVentas && estadisticaVentas.length" class="rounded w-7/12 h-11/12">
            <CardLineChart class="w-full h-11/12"></CardLineChart>
          </div>

          <div class=" rounded w-5/12 h-11/12">
            <CarBar3yChart class="w-5/12 h-11/12"></CarBar3yChart>
          </div>





        </div>
      </div>
      <div v-else class="flex flex-wrap mt-4 ">
        <div class="w-full mb-12 xl:mb-0 px-4">
          <div class="relative  flex  flex-col min-w-0 break-words w-50 mb-6">
            <img src="../../assets/img/dashboard.svg" style="display: block;margin-left: auto;margin-right: auto; "
              alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import CardLineChart from '@/components/Cards/CardLineChart.vue';
import CardBarChartVue from '@/components/Cards/CardBarChart.vue';
import CardBar2Chart from '@/components/Cards/CardBar2Chart.vue';
import CarBar3yChart from '@/components/Cards/CarBar3yChart.vue';
import config from './../../config';

export default {
  name: "dashboard-page",
  metaInfo: {
    title: config.frontend.title,
    titleTemplate: '%s | Inicio',
  },
  components: {
    CardLineChart,
    CardBarChartVue,
    CardBar2Chart,
    CarBar3yChart
  },


  created() {
    this.obtenerEstadisticas()
  },
  data() {
    return {
      payloadSearch: {
        fechaInicio: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        fechaFinal: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
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
        credits: false,
        plotOptions: {
          line: {
            dataLabels: { enabled: true },
            enableMouseTracking: true,
          },
        },
        xAxis: {
          categories: ['Pacientes por fecha'],
        },
        series: [
          {
            data: [0],
            name: "Promedios de pacientes",
            label: "Actual"
          },
        ],
      };
      for (const estadistica of payload) {
        const objetoSeries = {
          name: `${estadistica.fecha_creacion}`,
          data: [0, Number(estadistica.count)]
        };
        resultado.series.push(objetoSeries);
      }
      return resultado;
    },
    returnEstadisticaVentas(payload) {
      const resultado = {
        title: { text: `Registro de ventas por fecha ${this.payloadSearch.fechaInicio} al ${this.payloadSearch.fechaFinal}` },
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
          name: `${estadistica.nombre_servicio}`,
          data: [0, Number(estadistica.cantidad_vendida)]
        };
        resultado.series.push(objetoSeries);
      }
      return resultado;
    },
    returnEstadisticaPresupuestos(payload) {
      const resultado = {
        title: { text: `Registro de presupuestos por fecha ${this.payloadSearch.fechaInicio} al ${this.payloadSearch.fechaFinal}` },
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
          categories: ['Presupuestos por fecha'],
        },
        series: [
          {
            data: [0],
            name: "Promedios de presupuestos",
            label: "Actual"
          },
        ],
      };
      for (const estadistica of payload) {
        const objetoSeries = {
          name: `${estadistica.estado_compra}`,
          data: [0, Number(estadistica.count)]
        };
        resultado.series.push(objetoSeries);
      }
      return resultado;
    },
    returnEstadisticaCompras(payload) {
      const resultado = {
        title: { text: `Registro de compras por fecha ${this.payloadSearch.fechaInicio} al ${this.payloadSearch.fechaFinal}` },
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
          categories: ['Compras por fecha'],
        },
        series: [
          {
            data: [0],
            name: "Promedios de compras",
            label: "Actual"
          },
        ],
      };
      for (const estadistica of payload) {
        const objetoSeries = {
          name: `${estadistica.fecha_compra.slice(0, 10)}`,
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
