<template>
	<div class="flex flex-wrap mt-4">
		<div class="w-full mb-12 xl:mb-0 px-4">
			<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
				<div class="rounded-t mb-0 px-4 py-3 border-0">
					<div class="flex flex-wrap items-center">
						<div class="relative w-full px-4 max-w-full flex-grow flex-1">
							<h3 class="font-semibold text-base text-blueGray-700">
								Lista de Pacientes
							</h3>
						</div>
						<div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
							<router-link to="/admin/paciente/agregar"
								class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
								Agregar nuevo
							</router-link>
						</div>
					</div>
				</div>
						<!--
				<div class="px-5 mt-3 flex justify-start">
					<button @click="modal = true" class="bg-verdiAnderson text-white py-2 px-3 rounded-md uppercase">
					Busqueda Avanzada
					</button>
				</div>
				-->
				<div class="mt-5">
					<div v-if="pacientes && pacientes.data">
						<el-table :data="pacientes.data" class="w-full">
							<el-table-column fixed prop="nombre_paciente" label="Nombre del paciente" width="200">
								<template slot-scope="scope">
									<router-link :to="`/admin/paciente/id/${scope.row.id_paciente}`"
										class="uppercase text-verdiAnderson">
										{{ scope.row.nombre_paciente }}
									</router-link>
								</template>
							</el-table-column>
							<el-table-column prop="apellido_paciente" label="Apellido" width="200"></el-table-column>
							<el-table-column prop="edad_paciente" label="Edad" width="80"></el-table-column>
							<el-table-column prop="cedula_paciente" label="Cedula"></el-table-column>
							<el-table-column prop="telefono_paciente" label="Telefono celular"></el-table-column>
							<el-table-column prop="correo_paciente" label="Correo Electronico"
								width="250"></el-table-column>
							<el-table-column prop="genero_paciente" label="Genero"></el-table-column>

							<el-table-column prop="genero_paciente" label="Genero">
                                <template slot-scope="scope">
                                    <el-tag
                                        class="text-sm p-2 pb-2"
                                        :type="scope.row.genero_paciente == 'Masculino' ? 'warning' : 'success'"
                                        disable-transitions>{{scope.row.genero_paciente}}
                                    </el-tag>
                                </template>
                            </el-table-column>



							<el-table-column prop="fecha_creacion" label="Creado" width="200">
								<template slot-scope="scope">
									<p class="">{{ parseDate(scope.row.fecha_creacion) }}</p>
								</template>
							</el-table-column>
							<el-table-column label="Operaciones" width="170">
								<template slot-scope="scope">
									<p class="text-center">
										<router-link :to="`/admin/paciente/id/${scope.row.id_paciente}`"
											class="text-verdiAnderson text-xs w-full">
											Editar
										</router-link>
									</p>
									<p class="text-center">
										<router-link :to="`/admin/paciente/historial/${scope.row.id_paciente}`"
											class="text-indigo-600 text-xs w-full">
											Historial
										</router-link>
									</p>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<!-- mensaje de alert cuando no se encuentre ningun registro -->
					<div v-else class=" w-1/2 sm:ml-32 md:ml-36 lg:ml-96 mb-20">
						<div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
							role="warning">
							<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
								viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clip-rule="evenodd"></path>
							</svg>
							<span class="sr-only">warning</span>
							<div>
								<span class="font-medium">No se ha registrado ningun paciente</span>
								<ul class="mt-1.5 ml-4 list-disc list-inside">
									<li>Se recomienda al usuario ingresar los pacientes con odontodigramas</li>
									<li>Se recomienda que a los pacientes nuevos se les cree un odontodiagrama despues de hacer su resgistro basico</li>
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
	name: "paciente-list",
	metaInfo: {
		title: config.frontend.title,
		titleTemplate: "%s | Lista de Pacientes",
	},
	created() {
		this.$store.dispatch("obtenerListaDePacientes");

	},
	data() {
		return {
			modal: false,
			search: {
				nombre: "",
			},
		};
	},
	methods: {
		parseDate(date) {
			return new Date(date).toLocaleString();
		},
		handleClose() {
			this.modal = false;
		},

	},
	computed: {
		pacientes() {
			return this.$store.getters.getPacientes;
		},
	},
};
</script>
<style lang="scss">.el-date-editor {
	width: 100% !important;
}</style>
