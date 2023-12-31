<template>
	<div class="flex flex-wrap mt-4">
		<div class="w-full mb-12 xl:mb-0 px-4">
			<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
				<div class="rounded-t mb-0 px-4 py-3 border-0">
					<div class="flex flex-wrap items-center">
						<div class="relative w-full px-4 max-w-full flex-grow flex-1">
							<h3 class="font-semibold text-base text-blueGray-700">
								Lista de Proveedores
							</h3>
						</div>
						<div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">

							<button v-on:click="openNewTab"
								class="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
								type="button">
								PDF
							</button>

							<router-link to="/admin/proveedores/agregar"
								class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
								Agregar nuevo
							</router-link>
						</div>
					</div>
				</div>

				<div class="mt-5 ">
          <div v-if="proveedores && proveedores.data">
						<!--tabla-->
						<template class="relative h-32 w-32 ">
							<el-input v-model="search" class="h-1/6 w-2/12 ml-10" placeholder="Buscar" />
						</template>

						<el-table
							:data="   proveedores.data.filter(data => !search || data.nombre_proveedor.toLowerCase().includes(search.toLowerCase()))"
							class="w-full p-10">
							<el-table-column prop="nombre_proveedor" label="Nombre">
								<template slot-scope="scope">
									<router-link :to="`/admin/proveedores/${scope.row.id_provedor}`"
										class="uppercase text-verdiAnderson">
										@{{ scope.row.nombre_proveedor }}
									</router-link>
								</template>
							</el-table-column>
							<el-table-column prop="correo_proveedor" label="Correo Electronico"></el-table-column>
							<el-table-column prop="telefono_proveedor" label="Telefon"></el-table-column>
							<el-table-column prop="rif_provedor" label="RIF"></el-table-column>
							<el-table-column label="Operaciones">
								<template slot-scope="scope">
									<p class="text-left pl-10">
										<router-link :to="`/admin/proveedores/${scope.row.id_provedor}`"
											class="text-verdiAnderson text-xs">
											Editar
										</router-link>
									</p>
								</template>
							</el-table-column>
						</el-table>


						<!-- Modales de busqueda-->
						<el-drawer title="Busqueda Avanzada" :visible.sync="modal" direction="rtl"
							:before-close="handleClose">
							<form class="h-full" @submit.prevent="aplicarFiltro">
								<div class="flex flex-col content-between justify-between h-full">
									<div class="flex flex-col">
										<!--  Contenido -->
										<div class="w-full px-2 mb-3 py-1">
											<label>
												<p class="ml-1 mb-1">Nombre</p>
												<el-input placeholder="Nombre del Trabajador"
													v-model="search.nombre"></el-input>
											</label>
										</div>
										<div class="w-full px-2 mb-3 py-1">
											<label>
												<p class="ml-1 mb-1">Usuario</p>
												<el-input placeholder="Usuario del Trabajador"
													v-model="search.usuario"></el-input>
											</label>
										</div>
										<div class="w-full px-2 mb-3 py-1">
											<label>
												<p class="ml-1 mb-1">Especializacion</p>
												<el-input placeholder="Especializacion del Trabajador"
													v-model="search.especializacion"></el-input>
											</label>
										</div>
										<div class="w-full px-2 mb-3 py-1">
											<label>
												<p class="ml-1 mb-1">Fecha</p>
												<el-date-picker v-model="search.fecha" type="date"
													placeholder="Selecciona una fecha"></el-date-picker>
											</label>
										</div>
										<div v-if="nivelesUsuario && nivelesUsuario.data" class="w-full px-2 mb-3 py-1">
											<label>
												<p class="ml-1">Nivel / Rol</p>
												<el-select v-model="search.nivel" placeholder="Nivel del trabajador"
													class="w-full">
													<el-option label="Ninguno" :value="null"></el-option>
													<el-option v-for="item in nivelesUsuario.data"
														:key="item.id_nivel_usuario" :label="item.nombre_nivel_usuario"
														:value="item.id_nivel_usuario"></el-option>
												</el-select>
											</label>
										</div>
										<!-- Fin del contenido -->
									</div>
									<div>
										<button
											class="w-full bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2"
											type="submit">
											Buscar
										</button>
									</div>
								</div>
							</form>
						</el-drawer>

					</div>
					<div v-else class=" w-1/2 sm:ml-32 md:ml-36 lg:ml-64 mb-20">
						<div class=" flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="warning">
							<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
								viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clip-rule="evenodd"></path>
							</svg>
							<span class="sr-only">warning</span>
							<div>
								<span class="font-medium">No se ha registrado ningun proveedor</span>
								<ul class="mt-1.5 ml-4 list-disc list-inside">
									<li>Se recomienda tener registrado los materiales que posee y necesita la clinica
										odontologica</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import config from "../../../config";
export default {
	name: "proveedores-list",
	metaInfo: {
		title: config.frontend.title,
		titleTemplate: "%s | Lista de Proveedores",
	},
	created() {
		this.$store.dispatch("obtenerListaDeProveedores");
		// this.handleSizeChange(this.proveedores.data)
		//this.aplicarFiltro();
	},
	data() {
		return {

			tableData: [],
			currentPage: 1,
			totalRegistroPagina: 10,
			pageSize: 1,
			total: 0,
			modal: false,
			search: "",
			url: `http://localhost:3000/pdf/proveedor`,
		};
	},
	methods: {
		totalRegistro() {
			this.total = this.proveedores.data.length / this.totalRegistroPagina;
		},
		handleSizeChange(val) {
			this.pageSize = val;
			this.actualizarDatosTabla();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.actualizarDatosTabla();
		},
		actualizarDatosTabla() {
      this.$store.dispatch('getLoadingApp', true);
      this.tableData = [];
      let startIndex = (this.currentPage - 1) * this.totalRegistroPagina;
      const endIndex = startIndex + this.totalRegistroPagina;
      this.tableData = this.proveedores.data.slice().slice(startIndex, endIndex);
      this.$store.dispatch('getLoadingApp', false);
    },
		parseDate(date) {
			return new Date(date).toLocaleString();
		},
		handleClose() {
			this.modal = false;
		},
		aplicarFiltro() {
			this.$store.dispatch("obtenerDetalleProveedor", this.search);
		},
		openNewTab() {
			window.open(this.url, '_blank');
		}
	},
	computed: {
		nivelesUsuario() {
			return this.$store.getters.getnivelesUsuarios;
		},
    proveedores() {
			return this.$store.getters.getProveedores;
		},
	},
};
</script>
<style lang="scss">
.el-date-editor {
	width: 100% !important;
}
</style>
