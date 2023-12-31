<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                    <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 class="font-semibold  text-blueGray-700">
                                Lista de Servicios
                            </h3>
                        </div>
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <router-link to="/admin/servicios/agregar"
                                class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                Agregar nuevo
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <div v-if="servicios && servicios.data">

                        <template class="relative h-32 w-6/12 ">
                            <el-input v-model="search" class="h-1/6 w-2/12 ml-10" placeholder="Buscar" />
                        </template>

                        <el-table :data="servicios.data.filter(data => !search ||
                            data.nombre_servicio.toLowerCase().includes(search.toLowerCase()))" class="w-full p-10">

                            <el-table-column prop="nombre_servicio" label="Servicio">
                                <template slot-scope="scope">
                                    <router-link :to="`/admin/servicios/${scope.row.id_servicio}`"
                                        class=" text-verdiAnderson">
                                        {{ scope.row.nombre_servicio }}
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="descripcion" label="Descripcion"></el-table-column>
                            <el-table-column prop="costo_dolares" label="Presio"></el-table-column>

                            <el-table-column label="Operaciones">
                                <template slot-scope="scope">
                                    <p class="text-left ml-8">
                                        <router-link :to="`/admin/servicios/${scope.row.id_servicio}`"
                                            class="text-verdiAnderson  w-full">
                                            Editar
                                        </router-link>
                                    </p>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else>
                        <h3> No Exisiten servicios registrados</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from "../../../config";
export default {
    name: "listar-servicios",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Lista de Pacientes",
    },
    created() {
        this.$store.dispatch("obtenerServicios");

    },
    data() {
        return {
            modal: false,
            search: "",
        };
    },
    methods: {


    },
    computed: {
        servicios() {
            return this.$store.getters.getServicios;
        },
    },
};
</script>
<style lang="scss">
.el-date-editor {
    width: 100% !important;
}

th {
    --tw-text-opacity: 1;
    color: rgb(0 200 165 / var(--tw-text-opacity));
}
</style>
