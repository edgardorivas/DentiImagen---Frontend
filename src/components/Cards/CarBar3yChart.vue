<template>
    <div class="relative ml-10 flex flex-col min-w-0 break-words bg-white w-5/12 mb-6 shadow-lg rounded">
        <div class="rounded-t mb-0 pr-6 px-4 pt-9 bg-transparent">
            <div class="flex flex-wrap items-center">
                <div class="relative w-full max-w-full flex-grow flex-1">
                    <h2 class="text-blueGray-700 text-xl font-semibold">
                        Compra
                    </h2>
                </div>
            </div>
        </div>
        <div class="p-3 flex-auto h-full">
            <div class="relative  h-80">
                <canvas id="bar-chart3"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
import Chart from 'chart.js/auto';
export default {
    mounted: function () {
        this.$nextTick(function () {
            let config = {
                type: 'doughnut',
                data: {
                    labels: [
                        'Venta',
                        'Presupuesto',
                        'Compra'
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                },
            };
            let ctx = document.getElementById("bar-chart3").getContext("2d");
            window.myBar = new Chart(ctx, config);
        });
    },
};
</script>
