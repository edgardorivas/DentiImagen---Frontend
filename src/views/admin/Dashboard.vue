<template>
  <div class="flex flex-wrap mt-4 ">
    <div class="w-full mb-12 xl:mb-0 px-4">
      <div
        v-if="estadisticaVentas && estadisticaVentas.length && estadisticaPresupuestos && estadisticaPresupuestos.length && estadisticaPacientes && estadisticaPacientes.length"
        class="relative flex flex-col min-w-0 w-full">
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


          <!-- Paciente -->
          <div v-if="estadisticaPacientes && estadisticaPacientes.length" class="rounded w-6/12 h-11/12 ">
            <CardBarChartVue :config="returnEstadisticaPacientes(estadisticaPacientes)" class="w-11/12 h-11/12">
            </CardBarChartVue>
          </div>

          <!-- Presupuesto -->
          <div v-if="estadisticaPresupuestos && estadisticaPresupuestos.length" class="rounded w-6/12 h-11/12">
            <CardBar2Chart :config="returnEstadisticaPresupuestos(estadisticaPresupuestos)" class="w-11/12 h-11/12">
            </CardBar2Chart>
          </div>

          <!-- Compra -->
          <!-- {{ estadisticaCompras }}
          <div v-if="estadisticaCompras && estadisticaCompras.length" class=" rounded w-5/12 h-11/12">
            <CardLineChart :config="returnEstadisticaPresupuestos(estadisticaCompras)" class="w-5/12 h-11/12">
            </CardLineChart>
          </div> -->

          <!-- Ventas -->
          <!-- <div v-if="estadisticaVentas && estadisticaVentas.length"
            class="w-full sm:w-full md:w-3/6 mx-1 mb-3 shadow-lg rounded bg-white p-1">
            <highcharts :options="returnEstadisticaVentas(estadisticaVentas)"></highcharts>
          </div> -->

          <!-- Ventas -->
          <div v-if="estadisticaVentas && estadisticaVentas.length" class="rounded   w-full h-full">
            <CardLineChart :config="returnEstadisticaVentas(estadisticaVentas)" class="w-full h-full"></CardLineChart>
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
// import CarBar3yChart from '@/components/Cards/CarBar3yChart.vue';
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
    // CarBar3yChart
  },


  created() {
    this.$store.dispatch('actionEstadisticas', this.payloadSearch);

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
    returnEstadisticaPacientes(payload) {
      const resultado = {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#ed64a6",
              borderColor: "#ed64a6",
              data: [],
              barThickness: 50,
            }
          ],
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Venta Y presupuesto",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            legend: {
              labels: {
                fontColor: "rgba(0,0,0,.4)",
              },
              align: "end",
              position: "bottom",
            },
            scales: {
              yAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }],
              xAxes: [{
                gridLines: {
                  display: false
                }
              }]
            }
          },
        }
      };
      for (const estadistica of payload) {

        resultado.data.labels.push(estadistica.fecha_creacion);
        resultado.data.datasets[0].data.push(estadistica.count);
      }
      return resultado;
    },
    returnEstadisticaVentas(payload) {
      const resultado = {
        type: "line",
        data: {
          labels: ["inicio"],
          datasets: [
            {
              label: "Servicios",
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: [0],
              fill: false,
            },
          ],
          // options: {
          //   maintainAspectRatio: false,
          //   responsive: true,
          //   title: {
          //     display: false,
          //     text: "Sales Charts",
          //     fontColor: "white",
          //   },
          //   legend: {
          //     labels: {
          //       fontColor: "white",
          //     },
          //     align: "end",
          //     position: "bottom",
          //   },
          //   tooltips: {
          //     mode: "index",
          //     intersect: false,
          //   },
          //   hover: {
          //     mode: "nearest",
          //     intersect: true,
          //   },
          //   scales: {
          //     xAxes: [
          //       {
          //         ticks: {
          //           fontColor: "rgba(255,255,255,.7)",
          //         },
          //         display: true,
          //         scaleLabel: {
          //           display: false,
          //           labelString: "Month",
          //           fontColor: "white",
          //         },
          //         gridLines: {
          //           display: false,
          //           borderDash: [2],
          //           borderDashOffset: [2],
          //           color: "rgba(33, 37, 41, 0.3)",
          //           zeroLineColor: "rgba(0, 0, 0, 0)",
          //           zeroLineBorderDash: [2],
          //           zeroLineBorderDashOffset: [2],
          //         },
          //       },
          //     ],
          //     yAxes: [
          //       {
          //         ticks: {
          //           fontColor: "rgba(255,255,255,.7)",
          //         },
          //         display: true,
          //         scaleLabel: {
          //           display: false,
          //           labelString: "Value",
          //           fontColor: "white",
          //         },
          //         gridLines: {
          //           borderDash: [3],
          //           borderDashOffset: [3],
          //           drawBorder: false,
          //           color: "rgba(255, 255, 255, 0.15)",
          //           zeroLineColor: "rgba(33, 37, 41, 0)",
          //           zeroLineBorderDash: [2],
          //           zeroLineBorderDashOffset: [2],
          //         },
          //       },
          //     ],
          //   },
          // },
        }
      };
      for (const estadistica of payload) {
        resultado.data.labels.push(estadistica.nombre_servicio)
        resultado.data.datasets[0].data.push(estadistica.cantidad_vendida)
      }
      return resultado;
    },
    returnEstadisticaPresupuestos(payload) {
      const resultado = {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "Estatus",
              backgroundColor: "#2fc6a6",
              borderColor: "#63b3ed",
              data: [],
            },
          ],
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Venta Y presupuesto",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            legend: {
              labels: {
                fontColor: "rgba(0,0,0,.4)",
              },
              align: "end",
              position: "bottom",
            },
            scales: {
              yAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }],
              xAxes: [{
                gridLines: {
                  display: false
                }
              }]
            }
          },
        }
      };
      // for (const estadistica of payload) {
      //   // const objetoSeries = {
      //   //   name: `${estadistica.estado_compra}`,
      //   //   data: [0, Number(estadistica.count)]
      //   // };
      //   resultado.data.datasets.push(

      //   )
      // }
      for (const estadistica of payload) {
        resultado.data.labels.push(estadistica.estado_compra)
        resultado.data.datasets[0].data.push(Number(estadistica.count))
      }
      return resultado;
    },
    returnEstadisticaCompras(payload) {

      const resultado = {
        type: "line",
        data: {
          labels: ["inicio"],
          datasets: [
            {
              label: "Compras",
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: [0],
              fill: false,
            },
          ],
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Sales Charts",
              fontColor: "white",
            },
            legend: {
              labels: {
                fontColor: "white",
              },
              align: "end",
              position: "bottom",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            // scales: {
            //   xAxes: [
            //     {
            //       ticks: {
            //         fontColor: "rgba(255,255,255,.7)",
            //       },
            //       display: true,
            //       scaleLabel: {
            //         display: false,
            //         labelString: "Month",
            //         fontColor: "white",
            //       },
            //       gridLines: {
            //         display: false,
            //         borderDash: [2],
            //         borderDashOffset: [2],
            //         color: "rgba(33, 37, 41, 0.3)",
            //         zeroLineColor: "rgba(0, 0, 0, 0)",
            //         zeroLineBorderDash: [2],
            //         zeroLineBorderDashOffset: [2],
            //       },
            //     },
            //   ],
            //   yAxes: [
            //     {
            //       ticks: {
            //         fontColor: "rgba(255,255,255,.7)",
            //       },
            //       display: true,
            //       scaleLabel: {
            //         display: false,
            //         labelString: "Value",
            //         fontColor: "white",
            //       },
            //       gridLines: {
            //         borderDash: [3],
            //         borderDashOffset: [3],
            //         drawBorder: false,
            //         color: "rgba(255, 255, 255, 0.15)",
            //         zeroLineColor: "rgba(33, 37, 41, 0)",
            //         zeroLineBorderDash: [2],
            //         zeroLineBorderDashOffset: [2],
            //       },
            //     },
            //   ],
            // },
          },
        }
      }



      // for (const estadistica of payload) {
      //   const objetoSeries = {
      //     name: `${estadistica.fecha_compra.slice(0, 10)}`,
      //     data: [0, Number(estadistica.count)]
      //   };
      //   resultado.series.push(objetoSeries);
      // }
      for (const estadistica of payload) {
        resultado.data.labels.push(estadistica.fecha_compra)
        resultado.data.datasets[0].data.push(Number(estadistica.count))
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
