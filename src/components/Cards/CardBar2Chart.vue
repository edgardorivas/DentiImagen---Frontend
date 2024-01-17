<template>
	<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
		<div class="rounded-t mb-0 pr-6 px-4 pt-9 bg-transparent">
			<div class="flex flex-wrap items-center">
				<div class="relative w-full max-w-full flex-grow flex-1">
					<h2 class="text-blueGray-700 text-xl font-semibold">
						Presupuesto
					</h2>
				</div>
			</div>
		</div>
		<div class="p-3 flex-auto h-11/12">
			<div class="relative  h-80">
				<canvas id="bar-chart2"></canvas>
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
			let config = {
				type: "bar",
				data: {
					labels: [
						"January",
						"February",
						"March",
						"April",
						"May",
						"June",
						"July",
						"March",
						"April",
						"May",
						"June",
						"July",
					],
					datasets: [
						{
							label: new Date().getFullYear(),
							backgroundColor: "#2fc6a6",
							borderColor: "#63b3ed",
							data: [30, 78, 56, 34, 100, 45, 13, 56, 34, 100, 45, 13],
							barThickness: 50,
						}
					],
				},
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
			};
			let ctx = document.getElementById("bar-chart2").getContext("2d");
			window.myBar = new Chart(ctx, this.config);
		});
	},
};
</script>
