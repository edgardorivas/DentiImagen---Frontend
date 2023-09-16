<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Historial del Paciente
                        </h3>
                    </div>
                </div>
                <div class="mt-10 pb-5">
                    <section v-if="paciente" class="flex flex-wrap break-words m-0 py-0 px-5 justify-around">
                        <div class="w-full sm:w-full md:w-1/5 mb-3 text-center" v-if="url">
                            <img v-if="paciente.url_imagen != null"
                                :src="`http://localhost:3000/paciente/img/${paciente.url_imagen}`" class="w-full" alt="">
                            <img v-else src="../../../assets/avatar_masculino.svg" class="w-full" alt="">
                            <br>

                            <el-button class="border-0 mb-2 hover:bg-violet-100 bg-violet-200 text-violet-700"
                                v-on:click="centerDialogVisibleImagen = true" round>Cambiar imagen</el-button>


                            <button v-if="estadoHistorialTratamientos" v-on:click=" estadoHistorialTratamientos = false"
                                class="w-full text-blue-500 text-sm">Historial de tratamientos</button>
                            <button v-else v-on:click="estadoHistorialTratamientos = true"
                                class="w-full text-blue-500 text-sm">Odontodiagrama</button>
                        </div>
                        <div class="w-full sm:w-full md:w-3/5 mb-3 text-gray-600 text-sm">
                            <h2 class="text-center">Datos del Paciente</h2>
                            <div class="flex flex-wrap w-full mt-10 justify-between">
                                <div class="w-5/12 mb-3">
                                    <p><span>Nombres: {{ paciente.nombre_paciente }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Apellidos: {{ paciente.apellido_paciente }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Edad: {{ paciente.edad_paciente }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Cedula: {{ paciente.cedula_paciente }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Genero: {{ paciente.genero_paciente }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Telefono: {{ paciente.telefono_paciente }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Odontologo Referido: {{ paciente.referido_por }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Profesion: {{ paciente.profecion }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Alergia a algun medicamento: {{ paciente.alergico_algun_tratamiento == "true" ?
                                        'Si' : 'No' }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Medicado: {{ paciente.esta_tratamiento }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Motivo de la Consulta inicial: <br> {{ paciente.motivo_consulta }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Correo Electronico: <br> {{ paciente.correo_paciente }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>Dirección: {{ paciente.direccion_paciente }}</span></p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section v-if="paciente" class="w-full m-0 py-0 px-5">
                        <h2 class="text-center">Datos adicionales</h2>
                        <div class="w-10/12 ml-80  mb-3 text-gray-600 text-sm">
                            <div class="flex flex-wrap w-full mt-10 justify-between">
                                <div class="w-5/12 mb-3">
                                    <p><span>¿ Sufre de presion arterial ?: {{ paciente.suefre_presion_alterial == true ?
                                        'Si' : 'No' }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>¿ Diabetico ?: {{ paciente.diabetico == true ? 'Si' : 'No' }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>¿ Antecedentes familiares de diabetes ?: {{ paciente.edad_paciente }}</span>
                                    </p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>¿ Ha sufrido de Herpes ?: {{ paciente.cedula_paciente }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>¿ Ha sufrido de Afecciones cardiacas ?: {{
                                        paciente.ha_sufrido_efecciones_cardiacas == true ? 'Si' : 'No' }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>¿ Problemas con la Anestesia ?: {{ paciente.ha_sufrido_con_anestecia == true ?
                                        'Si' : 'No' }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>¿ Es usted propenso a las Hemorragias ?: {{ paciente.propenso_horragia == true
                                        ? 'Si' : 'No' }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>¿ Ha convulsionado alguna vez ?: {{ paciente.convulcion_alguna_vez == true ?
                                        'Si' : 'No' }}</span></p>
                                </div>
                                <div class="w-5/12 mb-3">
                                    <p><span>¿ Ha sufrido de Hepatitis ?: {{ paciente.ha_sufrido_hepatitis == true ? 'Si'
                                        : 'No' }}</span></p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <form v-if="paciente" @submit.prevent="false" class="w-full">
                        <!-- OdontoDiagrama -->
                        <div v-if="estadoHistorialTratamientos">

                            <!-- Odonto Diagrama -->
                            <div v-if="odontodiagramaPaciente && odontodiagramaPaciente.length"
                                class="w-full flex flex-wrap justify-around">

                                <div class="w-11/12 text-gray-600">
                                    <el-divider>Odontodiagrama</el-divider>
                                </div>

                                <div class="w-11/12 text-center">

                                    <div class="flex flex-wrap justify-around">

                                        <h4 class="text-gray-600">Fecha:
                                            {{ parseDate(odontodiagramaPaciente[posicion].fecha_registro) }}</h4>
                                        <!-- <button type="button" @click="centerDialogVisible = true"
                                            class="bg-verdiAnderson px-3 rounded-sm text-white text-lg">
                                            Abrir Estadisticas
                                        </button> -->

                                        <el-button class="border-0 mb-2 bg-violet-200 text-violet-700 hover:bg-violet-100"
                                            @click="centerDialogVisible = true" round> Estadisticas</el-button>

                                    </div>

                                    <br>
                                    <br><br>
                                </div>
                                <!-- c-1 -->
                                <div
                                    class="w-full md:w-1/2 lg:w-6/12 px-2 mb-3 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200">
                                    <p class="text-center text-gray-600">Punto de Referencia <b class="text-verdiAnderson">
                                            C-{{ odontodiagramaPaciente[posicion].dientes['C-1']._index }}</b></p>
                                    <br>
                                    <div class="flex flex-wrap justify-start flex-row-reverse">
                                        <div class="w-full text-gray-600">
                                            <p><small><i>Sección Adultos</i></small></p>
                                        </div>
                                        <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-1'].adulto"
                                            :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">
                                            <el-popover placement="top-start" title="Datos" trigger="hover">
                                                <div v-show="statusMensajeDiente">
                                                    <ul v-for="(mensaje, index) of mensajeDiente" :key="index">
                                                        <li>
                                                            {{ mensaje }}
                                                        </li>
                                                    </ul>
                                                </div>

                                                <button @click="abrirModal(diente)" type="button"
                                                    @mouseover="datosDientesMensaje(diente)" slot="reference"
                                                    class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                                    :class="!diente.sano ? 'border-red-500 hover:bg-red-400' : '' || diente.ausente ? 'border-blue-700 hover:bg-blue-500' : ''">
                                                    <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                                    <i class="fa-solid fa-tooth text-3xl"></i>
                                                    <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                                    <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                                </button>
                                            </el-popover>


                                        </div>
                                    </div>
                                    <div class="flex flex-wrap justify-start flex-row-reverse mt-2">
                                        <div class="w-full text-gray-600">
                                            <p><small><i>Sección Niños</i></small></p>
                                        </div>
                                        <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-1'].nino"
                                            :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">


                                            <el-popover placement="top-start" title="Datos" trigger="hover">
                                                <div v-show="statusMensajeDiente">

                                                    <ul v-for="(mensaje, index) of mensajeDiente" :key="index">
                                                        <li>
                                                            {{ mensaje }}
                                                        </li>
                                                    </ul>
                                                </div>

                                                <button @click="abrirModal(diente)" type="button"
                                                    @mouseover="datosDientesMensaje(diente)" slot="reference"
                                                    class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                                    :class="!diente.sano ? 'border-red-500 hover:bg-red-400' : '' || diente.ausente ? 'border-blue-700 hover:bg-blue-500' : ''">
                                                    <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                                    <i class="fa-solid fa-tooth text-2xl"></i>
                                                    <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                                    <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                                </button>
                                            </el-popover>


                                        </div>
                                    </div>
                                </div>

                                <!-- c-2 -->
                                <div
                                    class="w-full md:w-1/2 lg:w-6/12 px-2 mb-3 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200">
                                    <p class="text-center text-gray-600">Punto de Referencia <b class="text-verdiAnderson">
                                            C-{{ odontodiagramaPaciente[posicion].dientes['C-2']._index }}</b></p>
                                    <br>
                                    <div class="flex flex-wrap justify-start">
                                        <div class="w-full text-gray-600">
                                            <p class="text-end"><small><i>Sección Adultos</i></small></p>
                                        </div>
                                        <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-2'].adulto"
                                            :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">

                                            <el-popover placement="top-start" title="Datos" trigger="hover">
                                                <div v-show="statusMensajeDiente">
                                                    <ul v-for="(mensaje, index) of mensajeDiente" :key="index">
                                                        <li>
                                                            {{ mensaje }}
                                                        </li>
                                                    </ul>
                                                </div>

                                                <button @click="abrirModal(diente)" type="button"
                                                    @mouseover="datosDientesMensaje(diente)" slot="reference"
                                                    class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                                    :class="!diente.sano ? 'border-red-500 hover:bg-red-400' : '' || diente.ausente ? 'border-blue-700 hover:bg-blue-500' : ''">
                                                    <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                                    <i class="fa-solid fa-tooth text-3xl"></i>
                                                    <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                                    <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                                </button>
                                            </el-popover>


                                        </div>
                                    </div>
                                    <div class="flex flex-wrap justify-start mt-2">
                                        <div class="w-full">
                                            <p class="text-end text-gray-600"><small><i>Sección Niños</i></small></p>
                                        </div>
                                        <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-2'].nino"
                                            :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">

                                            <el-popover placement="top-start" title="Datos" trigger="hover">
                                                <div v-show="statusMensajeDiente">
                                                    <ul v-for="(mensaje, index) of mensajeDiente" :key="index">
                                                        <li>
                                                            {{ mensaje }}
                                                        </li>
                                                    </ul>
                                                </div>

                                                <button @click="abrirModal(diente)" type="button"
                                                    @mouseover="datosDientesMensaje(diente)" slot="reference"
                                                    class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                                    :class="!diente.sano ? 'border-red-500 hover:bg-red-400' : '' || diente.ausente ? 'border-blue-700 hover:bg-blue-500' : ''">
                                                    <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                                    <i class="fa-solid fa-tooth text-2xl"></i>
                                                    <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                                    <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                                </button>
                                            </el-popover>


                                        </div>
                                    </div>
                                </div>

                                <!-- c-4 -->
                                <div
                                    class="w-full md:w-1/2 lg:w-6/12 px-2 mb-3 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200">
                                    <p class="text-center text-gray-600">Punto de Referencia <b class="text-verdiAnderson">
                                            C-{{ odontodiagramaPaciente[posicion].dientes['C-4']._index }}</b></p>
                                    <br>
                                    <div class="flex flex-wrap justify-start flex-row-reverse mt-2">
                                        <div class="w-full text-gray-600">
                                            <p class=""><small><i>Sección Niños</i></small></p>
                                        </div>
                                        <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-4'].nino"
                                            :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">

                                            <el-popover placement="top-start" title="Datos" trigger="hover">
                                                <div v-show="statusMensajeDiente">
                                                    <ul v-for="(mensaje, index) of mensajeDiente" :key="index">
                                                        <li>
                                                            {{ mensaje }}
                                                        </li>
                                                    </ul>
                                                </div>

                                                <button @click="abrirModal(diente)" type="button"
                                                    @mouseover="datosDientesMensaje(diente)" slot="reference"
                                                    class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                                    :class="!diente.sano ? 'border-red-500 hover:bg-red-400' : '' || diente.ausente ? 'border-blue-700 hover:bg-blue-500' : ''">
                                                    <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                                    <i class="fa-solid fa-tooth text-2xl"></i>
                                                    <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                                    <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                                </button>
                                            </el-popover>


                                        </div>
                                    </div>
                                    <div class="flex flex-wrap justify-start flex-row-reverse">
                                        <div class="w-full">
                                            <p class="text-gray-600"><small><i>Sección Adultos</i></small></p>
                                        </div>
                                        <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-4'].adulto"
                                            :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">


                                            <el-popover placement="top-start" title="Datos" trigger="hover">
                                                <div v-show="statusMensajeDiente">
                                                    <ul v-for="(mensaje, index) of mensajeDiente" :key="index">
                                                        <li>
                                                            {{ mensaje }}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <button @click="abrirModal(diente)" type="button"
                                                    @mouseover="datosDientesMensaje(diente)" slot="reference"
                                                    class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                                    :class="!diente.sano ? 'border-red-500 hover:bg-red-400' : '' || diente.ausente ? 'border-blue-700 hover:bg-blue-500' : ''">
                                                    <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                                    <i class="fa-solid fa-tooth text-3xl"></i>
                                                    <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                                    <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                                </button>
                                            </el-popover>

                                        </div>
                                    </div>
                                </div>

                                <!-- c-3 -->
                                <div
                                    class="w-full md:w-1/2 lg:w-6/12 px-2 mb-3 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200">
                                    <p class="text-center text-gray-600">Punto de Referencia <b class="text-verdiAnderson">
                                            C-{{ odontodiagramaPaciente[posicion].dientes['C-3']._index }}</b></p>
                                    <br>
                                    <div class="flex flex-wrap justify-start mt-2">
                                        <div class="w-full">
                                            <p class="text-end text-gray-600"><small><i>Sección Niños</i></small></p>
                                        </div>
                                        <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-3'].nino"
                                            :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">


                                            <el-popover placement="top-start" title="Datos" trigger="hover">
                                                <div v-show="statusMensajeDiente">
                                                    <ul v-for="(mensaje, index) of mensajeDiente" :key="index">
                                                        <li>
                                                            {{ mensaje }}
                                                        </li>
                                                    </ul>
                                                </div>

                                                <button @click="abrirModal(diente)" type="button"
                                                    @mouseover="datosDientesMensaje(diente)" slot="reference"
                                                    class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                                    :class="!diente.sano ? 'border-red-500 hover:bg-red-400' : '' || diente.ausente ? 'border-blue-700 hover:bg-blue-500' : ''">
                                                    <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                                    <i class="fa-solid fa-tooth text-2xl"></i>
                                                    <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                                    <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                                </button>
                                            </el-popover>

                                        </div>
                                    </div>
                                    <div class="flex flex-wrap justify-start">
                                        <div class="w-full">
                                            <p class="text-end text-gray-600"><small><i>Sección Adultos</i></small></p>
                                        </div>
                                        <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-3'].adulto"
                                            :key="key_diente" class="w-1/4 md:w-1/6 lg:w-1/12 m-1">

                                            <el-popover placement="top-start" title="Datos" trigger="hover">
                                                <div v-show="statusMensajeDiente">
                                                    <ul v-for="(mensaje, index) of mensajeDiente" :key="index">
                                                        <li>
                                                            {{ mensaje }}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <button @click="abrirModal(diente)" type="button"
                                                    @mouseover="datosDientesMensaje(diente)" slot="reference"
                                                    class="w-full border border-verdiAnderson rounded-md hover:bg-verdiAnderson"
                                                    :class="!diente.sano ? 'border-red-500 hover:bg-red-400' : '' || diente.ausente ? 'border-blue-700 hover:bg-blue-500' : ''">
                                                    <p class="text-center"><small><i>{{ key_diente }}</i></small></p>
                                                    <i class="fa-solid fa-tooth text-3xl"></i>
                                                    <i v-if="diente.ausente" class="fa-solid fa-xmark"></i>
                                                    <i v-if="diente.afecciones.length" class="fa-solid fa-exclamation"></i>
                                                </button>
                                            </el-popover>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-wrap justify-around" v-else>
                                <div class="w-11/12 text-gray-600">
                                    <el-divider>Odontodiagrama</el-divider>
                                </div>
                                <div class="w-1/2">
                                    <el-alert :closable="false" title="Sin odontodiagrama " type="warning"
                                        description="Aun no se registra el odontodiagrama del paciente" show-icon />
                                </div>
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
                                                        <el-switch class="ml-3" v-model="diente.ausente"
                                                            active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                                                    </label>
                                                </div>
                                                <div class=" mb-2">
                                                    <label>
                                                        <p class="ml-1 mb-1">Observacion general</p>
                                                        <el-input type="textarea" :rows="2"
                                                            placeholder="Observacion del diente"
                                                            v-model="diente.observacionGeneral">
                                                        </el-input>
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
                                                            <p class="ml-1 mb-1">Afección: <small>{{ afeccion.nombre || `Sin
                                                                    Titulo`
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
                                                            <el-switch class="ml-3" v-model="afeccion.completado"
                                                                active-color="#13ce66" active-text="SI"
                                                                inactive-color="#ff4949" inactive-text="NO"></el-switch>
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
                            <br>
                            <br>

                            <div v-if="odontodiagramaPaciente && odontodiagramaPaciente.length"
                                class="flex flex-wrap justify-around">
                                <button type="button" @click="anterior"
                                    class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                    Anterior
                                </button>
                                <p class="py-1 px-0 m-0">Pagina {{ posicion + 1 }}</p>
                                <button type="button" @click="siguiente"
                                    class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                    Siguiente
                                </button>
                            </div>

                            <br><br>

                            <el-dialog title="Estadisticas" :visible.sync="centerDialogVisible" width="80%" center>
                                <div v-if="estadisticas && estadisticas.datos.length">
                                    <highcharts :options="returnEstadisticasPaciente(estadisticas)"></highcharts>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="centerDialogVisible = false">Cerrar</el-button>
                                </span>
                            </el-dialog>
                        </div>

                        <!-- historial de tratamientos -->
                        <div v-else>
                            <!-- historial de tratamientos -->
                            <div class="w-11/12 ml-16 flex flex-wrap justify-around mt-5">
                                <div class="w-11/12 text-gray-600">
                                    <el-divider>Historial odontologico</el-divider>
                                </div>


                                <div class="w-11/12 mb-20 text-center">
                                    <br>

                                    <div v-if="historialPaciente">

                                        <el-form :inline="true" label-position="top">
                                            <el-form-item class="w-72 " label="Fecha del tratamiento">
                                                <el-input v-model="filterDate" type="date"
                                                    placeholder="Filtrar por fecha"></el-input>
                                            </el-form-item>

                                            <el-form-item class="w-72 ml-24" label="Odontologo">
                                                <el-select v-model="filterName" clearable class="w-full"
                                                    placeholder="odontologo">
                                                    <div v-for="item in trabajadores.data" :key="item.id_trabajador">
                                                        <el-option v-if="item.rol == 'Odontologo'" :key="item.id_trabajador"
                                                            :label="item.nombre + ' ' + item.apellido" :value="item.nombre">
                                                        </el-option>
                                                    </div>

                                                </el-select>
                                            </el-form-item>

                                        </el-form>



                                        <template>
                                            <el-table class="mt-10"
                                                :data="historialPaciente.filter(item => item.nombre_trabajador.toLowerCase().includes(filterName.toLowerCase()) && item.fecha_registro.toLowerCase().includes(filterDate.toLowerCase()))">
                                                <el-table-column type="expand">
                                                    <template slot-scope="props">
                                                        <p> <span class="text-black"> Titulo: </span> {{
                                                            props.row.titulo_tratamiento }}</p>
                                                        <p><span class="text-black"> Descripcion: </span> {{
                                                            props.row.descripcion_tratamientio }}</p>
                                                        <p><span class="text-black"> Observacion: </span> {{
                                                            props.row.observaciones_generales }}</p>
                                                    </template>
                                                </el-table-column>

                                                <el-table-column prop="id_historial_tratamientos" label="id">
                                                </el-table-column>

                                                <el-table-column prop="id_trabajador" label="Odontologo">
                                                    <template slot-scope="scope">
                                                        <p class="">{{ scope.row.nombre_trabajador + " " +
                                                            scope.row.apellido_trabajador }}</p>
                                                    </template>
                                                </el-table-column>



                                                <el-table-column prop="fecha_registro" label="Fecha">
                                                    <template slot-scope="scope">
                                                        <p class="">{{ parseDate(scope.row.fecha_registro) }}</p>
                                                    </template>
                                                </el-table-column>

                                                <el-table-column prop="titulo_tratamiento"
                                                    label="Titulo del tratamiento"></el-table-column>
                                                <el-table-column prop="descripcion_tratamientio"
                                                    label="Descripcion"></el-table-column>
                                                <el-table-column prop="observaciones_generales"
                                                    label="Observaciones"></el-table-column>

                                            </el-table>
                                            <!-- El paginador no esta listo , preguntarle a robert -->
                                            <el-pagination class="mt-5" @size-change="handleSizeChange"
                                                @current-change="handleCurrentChange" :current-page.sync="currentPage"
                                                :page-sizes="[3, 6, 9]" :page-size="pageSize" layout=" prev, pager, next"
                                                :total="9">
                                            </el-pagination>

                                        </template>
                                    </div>

                                    <div v-else>
                                        <el-alert class="w-1/2 m-auto"
                                            title="El paciente no tiene un historial de tratamiendo por el momento"
                                            type="warning" :closable="false" description='
                                            El historial de tratamiento se visualizara cuando el odontologo
                                            registre el tratamiento que realizo sobre el paciente
                                            '>
                                        </el-alert>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </form>

                    <div v-else>

                        <el-alert class="w-1/2 m-auto" title="No encontrado" type="warning" :closable="false" description='
                            Este paciente no existe, o ya no se encutra en nuestra base de datos
                            '>
                        </el-alert>

                    </div>


                    <!-- modal para aceptar la imagen -->
                    <el-dialog title="Agregar la imagen del paciente" :visible.sync="centerDialogVisibleImagen" width="30%"
                        center>
                        <p class="px-2 mb-4 text-center">Imagen del paciente</p>


                        <div class="demo-fit ml-24">
                            <div class="block" key="none">
                                <img src="../../../assets/avatar_masculino.svg" v-if="!imagePreview" class="w-10/12 h-5/6">
                                <img :src="imagePreview" v-else class="w-10/12 h-5/6">

                            </div>
                        </div>

                        <div class="ml-56 mb-3 mt-3">
                            <input type="file" @change="previewImage" class="block w-full text-sm text-white
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              " />
                        </div>

                        <div slot="footer" class="dialog-footer flex flex-wrap justify-around">
                            <button slot="reference" :disabled="loading2"
                                class="w-full md:w-1/3 bg-red-600 text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                @click="centerDialogVisibleImagen = false" type="button">Cerrar</button>

                            <button :disabled="loading2"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md"
                                type="button" @click="guardarImagen()">Guardar</button>
                        </div>

                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from "../../../config";
import axios from "axios";
export default {
    name: "paciente-historic",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | historial del paciente",
    },
    created() {
        this.obtenerDatosPaciente(this.$route.params.ID);
        this.obtenerEstadisticas();

    },
    data() {
        return {
            statusMensajeDiente: false,
            mensajeDiente: [],
            url: 'http://localhost:3000/paciente/img/',
            imagenFile: null,
            imagePreview: false,
            fecha_tratamiento: '',
            estadoHistorialTratamientos: true,
            loading: false,
            diente: null,
            odontodiagrama: [],
            modal: false,
            posicion: 0,
            estadisticas: null,
            centerDialogVisible: false,
            centerDialogVisibleImagen: false,
            loading2: false,
            date: '',
            filterName: '',
            filterDate: '',
            currentPage: 1,
            pageSize: 3,
            OdontologosHistorial: [],

        };
    },
    methods: {
        previewImage(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
            };
            reader.readAsDataURL(file);
            this.imagenFile = file
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        filtrarOdontologos() {
            if (this.historialPaciente) {
                let historial = this.historialPaciente;

            }
        },
        obtenerDatosPaciente(ID) {
            this.$store.dispatch('obtenerOdontodiagramaIdPaciente', { id: ID });
            this.$store.dispatch('obtenerListaDeUsuarios');
            this.$store.dispatch("obtenerPacienteId", { id: ID, });
            this.$store.dispatch("obtenerHistorialTratamientoIdPaciente", { id: ID, });

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
        abrirModal(value) {
            this.modal = true;
            this.diente = value;
        },
        parseDate(date) {
            return new Date(date).toLocaleString();
        },
        siguiente() {
            const copiaDatos = this.odontodiagramaPaciente;
            if (copiaDatos.length == 0) {
                this.$message({
                    message: 'No puedes dar siguiente a un elemento sin datos',
                    type: 'error'
                });
                return false;
            }
            if (this.posicion == (copiaDatos.length - 1)) {
                this.$message({
                    message: 'Final de la pagina',
                    type: 'warning'
                });
                return false;
            }
            this.posicion++;
        },
        anterior() {
            const copiaDatos = this.odontodiagramaPaciente;
            if (copiaDatos.length == 0) {
                this.$message({
                    message: 'No puedes dar anterior a un elemento sin datos',
                    type: 'error'
                });
                return false;
            }
            if (this.posicion == 0) {
                this.$message({
                    message: 'Ya estas al inicio de la pagina',
                    type: 'warning'
                });
                return false;
            }
            this.posicion--;
        },
        async obtenerEstadisticas() {
            try {
                this.$store.dispatch("getLoadingApp", true);
                const token = localStorage.getItem("token_acess");
                const request = await axios({
                    method: "GET",
                    baseURL: config.backend.baseURL,
                    url: "/odontodiagrama/paciente/estadisticas/" + this.$route.params.ID,
                    headers: {
                        ["auth-token"]: token,
                    },
                });

                this.$store.dispatch("getLoadingApp", false);
                this.estadisticas = request.data.data;
            } catch (error) {
                if (error.response) {
                    this.$message({
                        message: error.response.data.mensaje || "Sin mensaje del servidor",
                        type: "error",
                    });
                } else {
                    this.$message({
                        message: "No estas conectado a internet.",
                        type: "error",
                    });
                }
                this.$store.dispatch("getLoadingApp", false);
                this.loading = false;
                console.clear();
            }
        },
        returnEstadisticasPaciente(payload) {
            const resultado = {
                title: { text: `Promedio de Estadisticas del Paciente` },
                legend: {
                    enabled: true,
                },
                credits: { enabled: true },
                plotOptions: {
                    line: {
                        dataLabels: { enabled: true },
                        enableMouseTracking: true,
                    },
                },
                xAxis: {
                    categories: ['Afecciones Curadas', 'Afecciones NO Curadas', 'Sanos', 'NO Sanos', 'Ausentes', 'NO Ausentes'],
                },
                series: [
                    {
                        data: [payload.afeccionesCuradas, payload.afeccionesNoCuradas, payload.sanos, payload.noSanos, payload.ausentes, payload.noAusentes],
                        name: "Promedios Actuales",
                        label: "Actual"
                    },
                ],
            };
            for (const odontoviejo of payload.datos) {
                if (odontoviejo.dientes.sanos) {
                    const objetoSeries = {
                        name: `Estadistica #${odontoviejo.fecha_registro.split('T')[0]}`,
                        data: [odontoviejo.dientes.afeccionesCuradas, odontoviejo.dientes.afeccionesNoCuradas, odontoviejo.dientes.sanos, odontoviejo.dientes.noSanos, odontoviejo.dientes.ausentes, odontoviejo.dientes.noAusentes],
                    }
                    resultado.series.push(objetoSeries);
                }
            }
            return resultado;
        },
        async guardarImagen() {
            console.log("dataImagen============>", this.imagenFile)
            const formData = new FormData();
            formData.append('imagenPaciente', this.imagenFile);
            try {
                this.$store.dispatch("getLoadingApp", true);
                const token = localStorage.getItem("token_acess");
                const request = await axios({
                    method: "PATCH",
                    baseURL: config.backend.baseURL,
                    url: "/paciente/imagen/" + this.$route.params.ID,
                    headers: {
                        ["auth-token"]: token,
                        'Content-Type': 'multipart/form-data'
                    },
                    data: formData
                });

                this.$store.dispatch("getLoadingApp", false);


                this.centerDialogVisibleImagen = false;
                this.$message({
                    message: 'Imagen Guardada',
                    type: 'success',
                });
                this.$router.push({ path: '/admin/paciente/lista' });
            } catch (error) {
                if (error.response) {
                    this.$message({
                        message: error.response.data.mensaje || "Sin mensaje del servidor",
                        type: "error",
                    });
                } else {
                    this.$message({
                        message: "No estas conectado a internet.",
                        type: "error",
                    });
                }
                this.$store.dispatch("getLoadingApp", false);
                this.loading = false;
                console.clear();
            }
        },
        datosDientesMensaje(datos) {
            this.statusMensajeDiente = false;
            let mensaje
            if (!datos.sano) {
                this.mensajeDiente = datos.afecciones.map((afeccion) => {
                    return `${afeccion.nombre} - ${afeccion.completado ? 'completo' : 'incompleto'}`
                })

            } else {
                this.mensajeDiente = datos.ausente ? ['El diente esta ausente'] : ['El diente esta sano']
            }
            this.statusMensajeDiente = true;

        }

    },
    computed: {

        paciente() {
            return this.$store.getters.getPaciente;
        },
        odontodiagramaPaciente() {
            return this.$store.getters.getOdontodiagramaIdPaciente;
        },
        historialPaciente() {
            return this.$store.getters.getHistorialTratamiento;
        },
        trabajadores() {
            return this.$store.getters.getusuarios;

        },
    },
};
</script>
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
