<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0 text-center">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Registro de Odontodiagrama
                        </h3>
                        <p><small>Importante: es recomendable llenar el odontodiagrama en una PC de escritorio</small></p>
                    </div>
                </div>
                <div id="formulario">
                    <form @submit.prevent="registroOdontodiagrama" class="py-2 px-3">
                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Paciente</el-divider>
                            </div>
                            <div class="w-full md:w-2/2 lg:w-2/5 px-2 mb-3 py-1">

                                <label class="md:w-1/2">
                                    <p v-if="!odontodiagrama.paciente" class="ml-1">Paciente | <small>No esta registrado? <router-link
                                                class="text-verdiAnderson" to="/admin/paciente/agregar">Registrar
                                                Paciente</router-link></small> </p>

                                    <p v-else class="ml-1">Paciente | <el-button type="text" v-on:click="modalHistorialTratamientos(odontodiagrama.paciente)">Agregar historial de tratamiento</el-button> </p>

                                    <el-select v-model="odontodiagrama.paciente" filterable @change="actualizarUltimoOdontodiagrama"
                                        placeholder="Seleccione el paciente" class="w-full">
                                        <el-option v-for="paciente in pacientesData.data" :key="paciente.id_paciente"
                                            :label="paciente.nombre_paciente + ' ' + paciente.apellido_paciente"
                                            :value="paciente.id_paciente"></el-option>
                                    </el-select>

                                </label>



                            </div>

                            <div class="w-full md:w-2/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label class="">
                                    <p class="ml-1">Fecha del Odontodiagrama: <small class="">{{
                                        parseDate(odontodiagrama.fechaRegistron) }}</small> </p>
                                    <el-date-picker v-model="odontodiagrama.fechaRegistron" type="datetime" size="large"
                                        :clearable="false" placeholder="Por favor seleccione la fecha">
                                    </el-date-picker>

                                </label>
                            </div>

                            <div class="w-11/12 md:mt-10">
                                <el-divider>Odontodiagrama</el-divider>
                            </div>
                            <!-- c-1 -->
                            <div
                                class="w-full md:w-1/2 lg:w-6/12 px-2 mb-3 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200">
                                <p class="text-center">Punto de Referencia <b class="text-verdiAnderson">
                                        C-{{ odontodiagrama.dientes['C-1']._index }}</b></p>
                                <br>
                                <div class="flex flex-wrap justify-start flex-row-reverse">
                                    <div class="w-full">
                                        <p><small><i>Sección Adultos</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagrama.dientes['C-1'].adulto"
                                        :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">
                                        <button @click="abrirModal(diente)" type="button"
                                            class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                            :class="!diente.sano ? 'border-red-500' : ''">
                                            <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                            <i class="fa-solid fa-tooth text-3xl"></i>
                                            <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                            <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex flex-wrap justify-start flex-row-reverse mt-2">
                                    <div class="w-full">
                                        <p><small><i>Sección Niños</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagrama.dientes['C-1'].nino"
                                        :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">
                                        <button @click="abrirModal(diente)" type="button"
                                            class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                            :class="!diente.sano ? 'border-red-500' : ''">
                                            <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                            <i class="fa-solid fa-tooth text-2xl"></i>
                                            <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                            <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- c-2 -->
                            <div
                                class="w-full md:w-1/2 lg:w-6/12 px-2 mb-3 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200">
                                <p class="text-center">Punto de Referencia <b class="text-verdiAnderson">
                                        C-{{ odontodiagrama.dientes['C-2']._index }}</b></p>
                                <br>
                                <div class="flex flex-wrap justify-start">
                                    <div class="w-full">
                                        <p class="text-end"><small><i>Sección Adultos</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagrama.dientes['C-2'].adulto"
                                        :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">
                                        <button @click="abrirModal(diente)" type="button"
                                            class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                            :class="!diente.sano ? 'border-red-500' : ''">
                                            <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                            <i class="fa-solid fa-tooth text-3xl"></i>
                                            <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                            <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex flex-wrap justify-start mt-2">
                                    <div class="w-full">
                                        <p class="text-end"><small><i>Sección Niños</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagrama.dientes['C-2'].nino"
                                        :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">
                                        <button @click="abrirModal(diente)" type="button"
                                            class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                            :class="!diente.sano ? 'border-red-500' : ''">
                                            <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                            <i class="fa-solid fa-tooth text-2xl"></i>
                                            <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                            <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- c-4 -->
                            <div
                                class="w-full md:w-1/2 lg:w-6/12 px-2 mb-3 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200">
                                <p class="text-center">Punto de Referencia <b class="text-verdiAnderson">
                                        C-{{ odontodiagrama.dientes['C-4']._index }}</b></p>
                                <br>
                                <div class="flex flex-wrap justify-start flex-row-reverse mt-2">
                                    <div class="w-full">
                                        <p class=""><small><i>Sección Niños</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagrama.dientes['C-4'].nino"
                                        :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">
                                        <button @click="abrirModal(diente)" type="button"
                                            class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                            :class="!diente.sano ? 'border-red-500' : ''">
                                            <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                            <i class="fa-solid fa-tooth text-2xl"></i>
                                            <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                            <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex flex-wrap justify-start flex-row-reverse">
                                    <div class="w-full">
                                        <p class=""><small><i>Sección Adultos</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagrama.dientes['C-4'].adulto"
                                        :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">
                                        <button @click="abrirModal(diente)" type="button"
                                            class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                            :class="!diente.sano ? 'border-red-500' : ''">
                                            <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                            <i class="fa-solid fa-tooth text-3xl"></i>
                                            <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                            <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- c-3 -->
                            <div
                                class="w-full md:w-1/2 lg:w-6/12 px-2 mb-3 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200">
                                <p class="text-center">Punto de Referencia <b class="text-verdiAnderson">
                                        C-{{ odontodiagrama.dientes['C-3']._index }}</b></p>
                                <br>
                                <div class="flex flex-wrap justify-start mt-2">
                                    <div class="w-full">
                                        <p class="text-end"><small><i>Sección Niños</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagrama.dientes['C-3'].nino"
                                        :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">
                                        <button @click="abrirModal(diente)" type="button"
                                            class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                            :class="!diente.sano ? 'border-red-500' : ''">
                                            <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                            <i class="fa-solid fa-tooth text-2xl"></i>
                                            <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                            <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex flex-wrap justify-start">
                                    <div class="w-full">
                                        <p class="text-end"><small><i>Sección Adultos</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagrama.dientes['C-3'].adulto"
                                        :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">
                                        <button @click="abrirModal(diente)" type="button"
                                            class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                            :class="!diente.sano ? 'border-red-500' : ''">
                                            <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                            <i class="fa-solid fa-tooth text-3xl"></i>
                                            <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                            <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <br>
                        <div class="flex flex-wrap justify-around">
                            <button type="submit"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Guardar</button>
                        </div>
                    </form>
                </div>
                <div id="Drawer">
                    <!-- Modal Editor de Dientes -->
                    <el-drawer title="Estado del Diente" :visible.sync="modal" direction="rtl">
                        <div class="h-full" v-if="diente">
                            <div class="flex flex-col content-between justify-between h-full">
                                <div class="flex flex-col overflow-y-auto">
                                    <div class="w-full px-2 mb-3 py-1">
                                        <label>
                                            <p class="ml-1 mb-1">Diente Sano / Finalizado?</p>
                                            <el-switch class="ml-3" v-model="diente.sano" active-color="#13ce66"
                                                inactive-color="#ff4949"></el-switch>
                                        </label>
                                    </div>
                                    <div class="w-full px-2 mb-3 py-1">
                                        <label>
                                            <p class="ml-1 mb-1">Diente Ausente?</p>
                                            <el-switch class="ml-3" v-model="diente.ausente" active-color="#13ce66"
                                                inactive-color="#ff4949"></el-switch>
                                        </label>
                                    </div>
                                    <div class="w-full px-2 mb-3 py-1">
                                        <label>
                                            <p class="ml-1 mb-1">Afecciones / Problematica del Diente</p>
                                            <button @click="diente.afecciones.unshift(getNewAfeccion())"
                                                class="px-2 py-1 uppercase border border-verdiAnderson bg-verdiAnderson text-white rounded-sm">+
                                                Agregar Afección</button>
                                        </label>
                                    </div>
                                    <div v-for="(afeccion, index) of diente.afecciones" :key="index"
                                        class="w-full px-2 mb-3 py-1 bg-slate-100 transition-all delay-150 duration-300">
                                        <div class="mb-2">
                                            <label>
                                                <p class="ml-1 mb-1">Afección: <small>{{ afeccion.nombre || 'Sin Titulo'
                                                }}</small></p>
                                                <el-input placeholder="Nombre de la afeccion"
                                                    v-model="afeccion.nombre"></el-input>
                                            </label>
                                        </div>
                                        <div class="mb-2">
                                            <label>
                                                <p class="ml-1 mb-1">Descripción</p>
                                                <el-input type="textarea" :rows="2"
                                                    placeholder="Informacion relevante sobre el diente que estas analizando"
                                                    v-model="afeccion.descripcion">
                                                </el-input>
                                            </label>
                                        </div>
                                        <div class="mb-2">
                                            <label>
                                                <p class="ml-1 mb-1">Completado</p>
                                                <el-switch class="ml-3" v-model="afeccion.completado" active-color="#13ce66"
                                                    active-text="SI" inactive-color="#ff4949"
                                                    inactive-text="NO"></el-switch>
                                            </label>
                                        </div>
                                        <div class="flex justify-end">
                                            <button class="text-red-500 uppercase"
                                                @click="eliminarAfeccion(diente.afecciones, index)"> <i
                                                    class="fa-solid fa-xmark"></i> Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button @click="modal = false"
                                        class="w-full bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2"
                                        type="button">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </el-drawer>
                </div>
            </div>
        </div>

        <!-- cambiar el precio del dolar -->
        <el-dialog title="Agregar informacion de tratamientos del paciente" :visible.sync="centerDialogVisibleHistorial" width="30%" center>
            <div class="flex flex-wrap justify-around">
                <el-form label-position="top" class="w-96" :model="formHistorialTratamiento" :rules="rules" ref="registrarhistorialTratamientos">

                    <label>
                        <p class="ml-1">Nombre</p>
                        <el-form-item prop="titulo">
                            <el-input
                                placeholder="Ingrese el titulo del tratamiento"
                                v-model="formHistorialTratamiento.titulo">
                            </el-input>
                        </el-form-item>
                    </label>

                    <div class="my-6"></div>

                    <label>
                        <p class="ml-1">Descripcion</p>
                        <el-form-item prop="descripcion">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="Ingrese la descripcion del tratamiento"
                                v-model="formHistorialTratamiento.descripcion">
                            </el-input>
                        </el-form-item>
                    </label>

                    <label v-if="estatusObservacion">
                        <p class="ml-1">Observacion</p>
                        <el-form-item prop="observacion">
                            <el-input
                                type="textarea"
                                placeholder="Ingrese la descripcion del tratamiento"
                                v-model="formHistorialTratamiento.observacion"
                                maxlength="250"
                                show-word-limit>
                            </el-input>
                        </el-form-item>

                        <el-button type="text" @click="observacionesEstado">Quitar observacion</el-button>
                        
                    </label>
                    <el-button type="text" v-if="!estatusObservacion" @click="estatusObservacion = true">Agregar observacion</el-button>

                </el-form>
            </div>

            <div slot="footer" class="dialog-footer flex flex-wrap justify-around">
                <button slot="reference" :disabled="loading"
                    class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                    @click="centerDialogVisibleHistorial = false" type="button">
                    Cerrar
                </button>
                <button slot="reference" :disabled="loading"
                    class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                    type="button" v-on:click="ingresarHistorialTratamiento(formHistorialTratamiento)">
                    Ingresar
                </button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import config from "../../../config";
import axios from "axios";
export default {
    name: 'odontodiagrama-registro',
    created() {
        this.getPacientes(this.search);
        this.$store.dispatch('obtenerListaDePacientes');
    },
    data() {
        return {
            centerDialogVisibleHistorial: false,
            formHistorialTratamiento:{
                titulo:'',
                descripcion:'',
                observacion:''
            },
            odontodiagrama: this.getObjectOdontodiagrama(),
            modal: false,
            diente: null,
            search: {
                cedula: '',
            },
            rules: {
                titulo: [
                    { required: true, message: 'Es necesario ingresar el nombre del tratamiento', trigger: 'change' },
                    { min: 2,  message: 'El titulo del tratamiento tiene que tener como minimo 2 caracteres', trigger: 'change' }
                ],
                descripcion: [
                    { required: true, message: 'Es necesario ingresar la descripcion del tratamiento', trigger: 'change' },
                    { min: 5,  message: 'La descripcion tiene que ser mayor a  5 caracteres', trigger: 'change' }
                ],
                observacion: [
                    { min: 2, max:250, message: 'La observacion general tiene que tener como minimo 2 caracteres y como maximo 250 ', trigger: 'change' }
                ],
            },
            estatusObservacion:false,
            pacientes: [],
            loading:false
        }
    },
    methods: {
        async ingresarHistorialTratamiento(historialTratamiento){
            this.$refs['registrarhistorialTratamientos'].validate(async (valid) => {
                if(valid){
                    try {
                        this.$store.dispatch('getLoadingApp', true);
                        const token = localStorage.getItem('token_acess');
                        const request = await axios({
                            method: 'POST',
                            baseURL: config.backend.baseURL,
                            url: `/historial-tratamiento/${this.odontodiagrama.paciente}`,
                            headers: {
                                ['auth-token']: token,
                            },
                            data: historialTratamiento,
                        });
                        this.$store.dispatch('getLoadingApp', false);

                        this.formHistorialTratamiento={
                            titulo:'',
                            descripcion:'',
                            observacion:''
                        },
                        this.centerDialogVisibleHistorial= false;

                        this.$message({
                            message: 'Se reistro el nuevo tratamiendo al historial del paciente',
                            type: 'success',
                        });


                    } catch (error) {
                        if (error.response) {
                            this.$message({
                              message: error.response.data.mensaje || 'Sin mensaje del servidor',
                              type: 'error',
                            });
                            this.$store.dispatch('getLoadingApp', false);

                            return false
                        } else {
                            this.$message({
                                message: 'No estas conectado a internet.',
                                type: 'error'
                            });
                        }
                        this.$store.dispatch('getLoadingApp', false);
                        console.clear()
                    }
                }
            });
        },
        modalHistorialTratamientos(paciente) {
            this.centerDialogVisibleHistorial = true;
        },
        observacionesEstado() {
            this.formHistorialTratamiento.observacion = '';
            this.estatusObservacion=false;
        },
        getObjectOdontodiagrama() {
            return {
                paciente: null,
                fechaRegistron: new Date(),
                dientes: {
                    'C-1': {
                        _index: 1,
                        adulto: {
                            11: this.getObjectDiente(),
                            12: this.getObjectDiente(),
                            13: this.getObjectDiente(),
                            14: this.getObjectDiente(),
                            15: this.getObjectDiente(),
                            16: this.getObjectDiente(),
                            17: this.getObjectDiente(),
                            18: this.getObjectDiente(),
                        },
                        nino: {
                            51: this.getObjectDiente(),
                            52: this.getObjectDiente(),
                            53: this.getObjectDiente(),
                            54: this.getObjectDiente(),
                            55: this.getObjectDiente(),
                        },
                    },
                    'C-2': {
                        _index: 2,
                        adulto: {
                            21: this.getObjectDiente(),
                            22: this.getObjectDiente(),
                            23: this.getObjectDiente(),
                            24: this.getObjectDiente(),
                            25: this.getObjectDiente(),
                            26: this.getObjectDiente(),
                            27: this.getObjectDiente(),
                            28: this.getObjectDiente(),
                        },
                        nino: {
                            61: this.getObjectDiente(),
                            62: this.getObjectDiente(),
                            63: this.getObjectDiente(),
                            64: this.getObjectDiente(),
                            65: this.getObjectDiente(),
                        },
                    },
                    'C-3': {
                        _index: 3,
                        adulto: {
                            31: this.getObjectDiente(),
                            32: this.getObjectDiente(),
                            33: this.getObjectDiente(),
                            34: this.getObjectDiente(),
                            35: this.getObjectDiente(),
                            36: this.getObjectDiente(),
                            37: this.getObjectDiente(),
                            38: this.getObjectDiente(),
                        },
                        nino: {
                            71: this.getObjectDiente(),
                            72: this.getObjectDiente(),
                            73: this.getObjectDiente(),
                            74: this.getObjectDiente(),
                            75: this.getObjectDiente(),
                        },
                    },
                    'C-4': {
                        _index: 4,
                        adulto: {
                            41: this.getObjectDiente(),
                            42: this.getObjectDiente(),
                            43: this.getObjectDiente(),
                            44: this.getObjectDiente(),
                            45: this.getObjectDiente(),
                            46: this.getObjectDiente(),
                            47: this.getObjectDiente(),
                            48: this.getObjectDiente(),
                        },
                        nino: {
                            81: this.getObjectDiente(),
                            82: this.getObjectDiente(),
                            83: this.getObjectDiente(),
                            84: this.getObjectDiente(),
                            85: this.getObjectDiente(),
                        },
                    },
                },
            };
        },
        getObjectDiente() {
            return {
                afecciones: [],
                sano: true,
                ausente: false,
            };
        },
        getNewAfeccion() {
            return {
                nombre: null,
                completado: false,
                descripcion: null,
            };
        },
        eliminarAfeccion(value, index) {
            value = value.splice(index, 1);
            this.$message({
                message: 'Eliminado',
                type: 'success',
            });
        },
        abrirModal(value) {
            this.modal = true;
            this.diente = value;
        },
        parseDate(date) {
            return new Date(date).toLocaleString();
        },
        async getPacientes(search) {
            try {
                this.$store.dispatch('getLoadingApp', true);
                const token = localStorage.getItem('token_acess');
                const request = await axios({
                    method: 'POST',
                    baseURL: config.backend.baseURL,
                    url: '/paciente/filtro',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: search,
                });
                this.$store.dispatch('getLoadingApp', false);
                this.pacientes = request.data.data;
            } catch (error) {
                if (error.response) {
                    // this.$message({
                    //   message: error.response.data.mensaje || 'Sin mensaje del servidor',
                    //   type: 'error',
                    // });
                    this.$store.dispatch('getLoadingApp', false);

                    return false
                } else {
                    this.$message({
                        message: 'No estas conectado a internet.',
                        type: 'error'
                    });
                }
                this.$store.dispatch('getLoadingApp', false);
                console.clear()
            }
        },
        async registroOdontodiagrama() {
            try {
                if (!this.odontodiagrama.paciente) {
                    throw new Error('No puedes crear un odontodiagrama sin asignarle un paciente')
                }
                this.$store.dispatch('getLoadingApp', true);
                const token = localStorage.getItem('token_acess');
                await axios({
                    method: 'POST',
                    baseURL: config.backend.baseURL,
                    url: '/odontodiagrama',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: {
                        id: this.odontodiagrama.paciente,
                        dientes: this.odontodiagrama.dientes,
                        fecha: this.odontodiagrama.fechaRegistron
                    },
                });
                this.$store.dispatch('getLoadingApp', false);
                this.$message({
                    message: 'Registrado exitosamente!',
                    type: 'success',
                });
                this.odontodiagrama = this.getObjectOdontodiagrama();
            } catch (error) {
                console.log(error)
                if (error.response) {
                    this.$message({
                        message: error.response.data.mensaje || 'Sin mensaje del servidor',
                        type: 'error',
                    });
                } else if (error && error.message) {
                    this.$message({
                        message: error.message || 'Sin mensaje de la web',
                        type: 'error',
                    });
                } else {
                    this.$message({
                        message: 'No estas conectado a internet.',
                        type: 'error'
                    });
                }
                this.$store.dispatch('getLoadingApp', false);
                console.clear()
            }
        },
        async actualizarUltimoOdontodiagrama(evento) {
          try {
            this.$store.dispatch('getLoadingApp', true);
            const token = localStorage.getItem('token_acess');
            const resultado = await axios({
                method: 'GET',
                baseURL: config.backend.baseURL,
                url: '/odontodiagrama/paciente/ultimo/' + evento,
                headers: {
                    ['auth-token']: token,
                }
            });
            if (resultado.data.data) {
              resultado.data.data.paciente = resultado.data.data.fk_historial_paciente;
              resultado.data.data.fechaRegistron = new Date();
              this.odontodiagrama = resultado.data.data;
            }
          } catch (error) {
            console.log(error)
          }
          this.$store.dispatch('getLoadingApp', false);
        }
    },
    computed: {
        // usuarios () {
        //   return this.$store.getters.getusuarios;
        // },
        pacientesData() {
            return this.$store.getters.getPacientes;
        },
    }
}
</script>
