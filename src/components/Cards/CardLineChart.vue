<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h2 class="text-blueGray-700 text-xl font-semibold">
            Ventas
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto w-full h-11/12">
      <!-- Chart -->
      <div class="relative h-80 w-full">
        <canvas class="w-full" id="line-chart"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    config: {
      type: Object,
      require: true
    }
  },
  mounted: function () {

    this.$nextTick(function () {
      var config = {
        type: "line",
        data: {
          labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: [65, 78, 66, 44, 56, 67, 75, 65, 78, 66, 44, 56, 67, 75, 65, 78, 66, 44, 56, 67, 75],
              fill: false,
            },
          ],
        },
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
      };
      var ctx = document.getElementById("line-chart").getContext("2d");
      window.myLine = new Chart(ctx, this.config);
    });
  },
};
</script>
