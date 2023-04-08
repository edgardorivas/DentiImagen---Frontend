<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 v-if="materialDetalles && materialDetalles.data"
                            class="font-semibold text-xl text-blueGray-700 uppercase">
                            Editando Material <i
                                class="text-verdiAnderson font-extrabold">@{{ materialDetalles.data[0].nombre }}</i>
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">

                    <div v-if="materialDetalles && materialDetalles.data">
                        <form @submit.prevent="modificarMaterial(materialDetalles.data[0])">
                            <div class="flex flex-wrap justify-around">
                                <div class="w-11/12">
                                    <el-divider>Datos de la materia</el-divider>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Nombres</p>
                                        <el-input placeholder="Nombres de la materia" type="text" auto-complete="name"
                                            v-model="materialDetalles.data[0].nombre"></el-input>
                                    </label>
                                </div>
                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Descripcion</p>
                                        <el-input placeholder="Descripcion del material" type="text"
                                            auto-complete="family-name"
                                            v-model="materialDetalles.data[0].descripcion"></el-input>
                                    </label>
                                </div>

                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Cantidad disponible</p>
                                        <el-input placeholder="Cantidad disponible del material" type="number"
                                            auto-complete="family-name"
                                            v-model="materialDetalles.data[0].disponible"></el-input>
                                    </label>
                                </div>

                                <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">cantidad minima</p>
                                        <el-input placeholder="cantidad minima del material" type="number"
                                            auto-complete="family-name"
                                            v-model="materialDetalles.data[0].minimo"></el-input>
                                    </label>
                                </div>

                                <div v-if="tipoMaterial && tipoMaterial.data"
                                    class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Tipo</p>
                                        <el-select v-model="materialDetalles.data[0].tipo_recurso"
                                            placeholder="Tipo de materia" class="w-full">
                                            <el-option
                                                :selected="materialDetalles.data[0].id_tipo_recurso === item.id_tipo_recurso"
                                                v-for="item in tipoMaterial.data" :key="item.id_tipo_recurso"
                                                :label="item.nombre_tipo_recurso" :value="item.id_tipo_recurso"></el-option>
                                        </el-select>
                                    </label>
                                </div>
                                <div v-else>
                                    <h3 class="mb-3 ml-3">No existen tipos de materiales</h3>
                                </div>

                                <div v-if="materialDetalles.data[0].tipo_recurso === 1"
                                    class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                    <label>
                                        <p class="ml-1">Costo</p>
                                        <el-input placeholder="Costo del servicio" type="number"
                                            v-model="materialDetalles.data[0].costo"></el-input>
                                    </label>
                                </div>


                                <!--
                  <div v-if="nivelesUsuario && nivelesUsuario.data" class="w-full md:w-1/2 lg:w-3/12 px-2 mb-3 py-1">
                    <label>
                      <p class="ml-1">Nivel / Rol</p>
                      <el-select v-model="usuarioDetalle.data[0].nivel" placeholder="Nivel del trabajador" class="w-full">
                        <el-option v-for="item in nivelesUsuario.data" :key="item.id_nivel_usuario" :label="item.nombre_nivel_usuario" :value="item.id_nivel_usuario"></el-option>
                      </el-select>
                    </label>
                  </div>
                -->

                            </div>
                            <br>
                            <div class="flex flex-wrap justify-around">
                                <el-popconfirm confirm-button-text='Si, Eliminar' confirm-button-type="danger"
                                    cancel-button-text='No, Cancelar' icon="el-icon-info" icon-color="red"
                                    :title="`Estas seguro de eliminar el material ${materialDetalles.data[0].nombre_recurso}?`"
                                    class="w-full md:w-1/3" @confirm="eliminarMaterial(materialDetalles.data[0])">
                                    <button slot="reference" :disabled="loading"
                                        class="w-full bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                        type="button">Eliminar</button>
                                </el-popconfirm>
                                <button :disabled="loading"
                                    class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                    type="submit">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from "../../../config";
import axios from "axios";
export default {
    name: "produc-update",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Editar Material",
    },
    created() {
        this.$store.dispatch('obtenerDetalleProducto', { id: this.$route.params.ID });
    },
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        async modificarMaterial(payload) {
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'PATCH',
                    baseURL: config.backend.baseURL,
                    url: '/recurso/' + payload.id_recurso,
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload
                });
                this.$store.dispatch('getLoadingApp', false);
                this.loading = false;
                this.$message({
                    message: 'Modificado Exitosamente',
                    type: 'success',
                });
                this.$router.push({ path: '/admin/materiales' });
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
        },
        async eliminarMaterial(payload) {
            console.log(payload.id)
            try {
                this.$store.dispatch('getLoadingApp', true);
                this.loading = true;
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'DELETE',
                    baseURL: config.backend.baseURL,
                    url: '/recurso/' + payload.id_recurso,
                    headers: {
                        ['auth-token']: token,
                    },
                });
                this.$store.dispatch('getLoadingApp', false);
                this.loading = false;
                this.$message({
                    message: 'Eliminado Exitosamente',
                    type: 'success',
                });
                this.$router.push({ path: '/admin/materiales' });
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
        },
    },
    computed: {
        materialDetalles() {
            return this.$store.getters.getDetalleProductoId;
        },
        tipoMaterial() {
            return this.$store.getters.getTipoMaterial;
        }
    }
};
</script>
<style lang="scss">.el-button--danger {
    background-color: #dc2626;
}</style>
  