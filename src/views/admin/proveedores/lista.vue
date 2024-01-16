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

							<button v-on:click="modalProveedor"
								class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
								Agregar nuevo
							</button>
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
							:data="proveedores.data.filter(data => !search || data.nombre_proveedor.toLowerCase().includes(search.toLowerCase()))"
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
				<!-- modal del nuevo proveedor -->
				<el-dialog title="Nuevo proveedor" :visible.sync="centerDialogVisibleProveedor" width="30%" center>
					<div class="flex flex-wrap justify-around">
						<el-form label-position="top" class="w-96" :model="nuevoProveedor" :rules="rules"
							ref="registrarProvedor">

							<label>
								<p class="ml-1">Nombre</p>
								<el-form-item prop="nombre">
									<el-input placeholder="Nombre del proveedor" v-model="nuevoProveedor.nombre"></el-input>
								</el-form-item>
							</label>
							<label>
								<p class="ml-1">Email</p>
								<el-form-item prop="correo">
									<el-input placeholder="Correo del proveedor" type="email"
										v-model="nuevoProveedor.correo"></el-input>
								</el-form-item>
							</label>
							<label>
								<p class="ml-1">Numero telefonico</p>
								<el-form-item prop="telefono">
									<el-input placeholder="Telefono del proveedor" type="number"
										v-model="nuevoProveedor.telefono"></el-input>
								</el-form-item>
							</label>
							<label>
								<p class="ml-1">RIF</p>
								<el-form-item prop="rif">
									<el-input placeholder="RIF del proveedor" v-model="nuevoProveedor.rif"></el-input>
								</el-form-item>
							</label>
							<label v-if="materiales && materiales.data">
								<p class="ml-1">Insumos</p>
								<el-form-item prop="recursos">
									<el-select v-model="nuevoProveedor.recursos" multiple placeholder="Materiales"
										class="w-full">
										<el-option v-for="item in materiales.data" :key="item.id" :label="item.nombre"
											:value="item.id"></el-option>
									</el-select>
								</el-form-item>
							</label>
							<label v-else class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
								<el-alert title="No existen insumos guardados" type="error" :closable=false
									description="Registre los insumos existentes">
								</el-alert>
							</label>
						</el-form>
					</div>

					<div slot="footer" class="dialog-footer flex flex-wrap justify-around">
						<button slot="reference" :disabled="loading"
							class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
							@click="centerDialogVisibleProveedor = false" type="button">
							Cerrar
						</button>
						<button slot="reference" :disabled="loading"
							class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
							v-on:click="registrarProveedor" type="button">
							Ingresar
						</button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>
<script>
import config from "../../../config";
import axios from "axios";

export default {
	name: "proveedores-list",
	metaInfo: {
		title: config.frontend.title,
		titleTemplate: "%s | Lista de Proveedores",
	},
	created() {
		this.$store.dispatch("obtenerListaDeProveedores");
		this.$store.dispatch('obtenerListaDeproducto');
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
			centerDialogVisibleProveedor: false,
			nuevoProveedor: {
				nombre: null,
				correo: null,
				telefono: null,
				rif: null,
				recursos: [],
			},
			rules: {
				nombre: [
					{ required: true, message: 'Es necesario ingresar el nombre del proveedor', trigger: 'change' },
					{ min: 2, message: 'El nombre del proveedor tiene que ser como minimo 2 caracteres', trigger: 'change' }
				],
				correo: [
					{ type: "email", required: true, message: 'Es necesario ingresar el correo electronico del proveedor', trigger: 'change' },
				],
				telefono: [
					{ required: true, message: 'Es necesario ingresar el numero telefonico del proveedor', trigger: 'change' },
					{ length: 11, message: 'Se tiene que escribir los 11 digitos de un numero celular', trigger: 'change' }
				],
				rif: [
					{ required: true, message: 'Es necesario ingresar el RIF del proveedor', trigger: 'change' },
					{ length: 10, message: 'Se tiene que escribir los 10 digitos del RIF', trigger: 'change' }
				],
				recursos: [
					{ type: 'array', required: true, message: 'Es necesario ingresar los materiales que maneja este proveedor', trigger: 'change' },
				],
			},
			loading: false,

		};
	},
	methods: {
		modalProveedor() {
			this.centerDialogVisibleProveedor = true;
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		async registrarProveedor() {
			this.$refs['registrarProvedor'].validate(async (valid) => {
				if (valid) {
					try {
						this.$store.dispatch('getLoadingApp', true);
						this.loading = true;
						const token = localStorage.getItem('token_acess');
						const request = await axios({
							method: 'POST',
							baseURL: config.backend.baseURL,
							url: '/provedor',
							headers: {
								['auth-token']: token,
							},
							data: this.nuevoProveedor
						});
						this.$store.dispatch('getLoadingApp', false);
						this.loading = false;
						this.$message({
							message: 'Registrado Exitosamente',
							type: 'success',
						});
						this.$store.dispatch("obtenerListaDeProveedores")
						this.centerDialogVisibleProveedor = false
						this.resetForm("registrarProvedor")
					} catch (error) {
						if (error.response) {
							this.$message({
								message: error.response.data.mensaje || 'Sin mensaje del servidor',
								type: 'error',
							});
						} else {
							this.$message({
								message: 'No estas conectado a internet.',
								type: 'error'
							});
						}
						this.$store.dispatch('getLoadingApp', false);
						this.loading = false;
						console.clear()
					}
				}
			});
		},
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
		materiales() {
			return this.$store.getters.getproducto;
		}
	},
};
</script>
<style lang="scss">
.el-date-editor {
	width: 100% !important;
}
</style>
