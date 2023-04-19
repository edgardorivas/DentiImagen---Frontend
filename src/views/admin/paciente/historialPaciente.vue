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
                <div class="mt-5 pb-5">
                    <form v-if="paciente" @submit.prevent="false">
                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Datos del Paciente</el-divider>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
                                    <el-input disabled placeholder="Nombre del Paciente"
                                        v-model="paciente.nombre_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Apellido</p>
                                    <el-input placeholder="Apellido del Paciente" disabled
                                        v-model="paciente.apellido_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Edad</p>
                                    <el-input placeholder="Edad del Paciente" disabled v-model="paciente.edad_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cedula</p>
                                    <el-input placeholder="Cedula del Paciente" disabled
                                        v-model="paciente.cedula_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Sexo</p>
                                    <el-input placeholder="Genero del Paciente" disabled
                                        v-model="paciente.genero_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Telefono</p>
                                    <el-input placeholder="Telefono del Paciente" disabled
                                        v-model="paciente.telefono_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Correo Electronico</p>
                                    <el-input placeholder="Correo del Paciente" disabled
                                        v-model="paciente.correo_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Referido por</p>
                                    <el-input placeholder="Nombre del tipo de material" disabled
                                        v-model="paciente.referido_por"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Motivo de la Consulta al Registrarse</p>
                                    <el-input placeholder="Motivo de la Consulta" disabled
                                        v-model="paciente.motivo_consulta"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Profesion</p>
                                    <el-input placeholder="Profesion del Paciente"  disabled v-model="paciente.profecion"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿Posee Alergia a algun medicamento?</p>
                                    <el-select v-model="paciente.alergico_algun_tratamiento" disabled
                                        placeholder="¿ Alergia a algun medicamento?" class="w-full">
                                        <el-option label="Si" :value="true"></el-option>
                                        <el-option label="No" :value="false"></el-option>
                                    </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Dirección</p>
                                    <el-input placeholder="Direccion del Paciente" disabled
                                        v-model="paciente.direccion_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Esta usted en tratamiento ?</p>
                                    <el-input placeholder="Esta en tratamiento" disabled
                                        v-model="paciente.esta_tratamiento"></el-input>
                                </label>
                            </div>

                            <div class="w-11/12">
                                <el-divider>Datos Adicionales</el-divider>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Sufre de presion arterial ?</p>
                                    <el-radio disabled v-model="paciente.suefre_presion_alterial" :label=true>SI</el-radio>
                                    <el-radio disabled v-model="paciente.suefre_presion_alterial" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Diabetico ?</p>
                                    <el-radio disabled v-model="paciente.diabetico" :label=true>SI</el-radio>
                                    <el-radio disabled v-model="paciente.diabetico" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Antecedentes familiares de diabetes ?</p>
                                    <el-radio disabled v-model="paciente.antecedentes_diabetico" :label=true>SI</el-radio>
                                    <el-radio disabled v-model="paciente.antecedentes_diabetico" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Hepatitis ?</p>
                                    <el-radio disabled v-model="paciente.ha_sufrido_hepatitis" :label=true>SI</el-radio>
                                    <el-radio disabled v-model="paciente.ha_sufrido_hepatitis" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Herpes ?</p>
                                    <el-radio disabled v-model="paciente.ha_sufrido_herpes" :label=true>SI</el-radio>
                                    <el-radio disabled v-model="paciente.ha_sufrido_herpes" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Afecciones cardiacas ?</p>
                                    <el-radio disabled v-model="paciente.ha_sufrido_efecciones_cardiacas" :label=true>SI</el-radio>
                                    <el-radio disabled v-model="paciente.ha_sufrido_efecciones_cardiacas" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Problemas con la Anestecia ?</p>
                                    <el-radio disabled v-model="paciente.ha_sufrido_con_anestecia" :label=true>SI</el-radio>
                                    <el-radio disabled v-model="paciente.ha_sufrido_con_anestecia" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Es usted propenso a las Hemorragias ?</p>
                                    <el-radio disabled v-model="paciente.propenso_horragia" :label=true>SI</el-radio>
                                    <el-radio  disabled v-model="paciente.propenso_horragia" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha convulsionado alguna vez ?</p>
                                    <el-radio disabled v-model="paciente.convulcion_alguna_vez" :label=true>SI</el-radio>
                                    <el-radio disabled v-model="paciente.convulcion_alguna_vez" :label=false>NO</el-radio>
                                </label>
                            </div>
                        </div>
                        <div v-if="odontodiagramaPaciente && odontodiagramaPaciente.length" class="flex flex-wrap justify-around mt-5">
                            <div class="w-11/12">
                                <el-divider>Odontodiagrama</el-divider>
                            </div>
                            <div class="w-11/12 text-center">
                                <br>
                                <h3>Fecha: {{parseDate(odontodiagramaPaciente[posicion].fecha_registro)}}</h3>
                                <br><br>
                            </div>
                            <!-- c-1 -->
                            <div
                                class="w-full md:w-1/2 lg:w-6/12 px-2 mb-3 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200">
                                <p class="text-center">Punto de Referencia <b class="text-verdiAnderson">
                                        C-{{ odontodiagramaPaciente[posicion].dientes['C-1']._index }}</b></p>
                                <br>
                                <div class="flex flex-wrap justify-start flex-row-reverse">
                                    <div class="w-full">
                                        <p><small><i>Sección Adultos</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-1'].adulto"
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
                                    <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-1'].nino"
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
                                        C-{{ odontodiagramaPaciente[posicion].dientes['C-2']._index }}</b></p>
                                <br>
                                <div class="flex flex-wrap justify-start">
                                    <div class="w-full">
                                        <p class="text-end"><small><i>Sección Adultos</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-2'].adulto"
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
                                    <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-2'].nino"
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
                                        C-{{ odontodiagramaPaciente[posicion].dientes['C-4']._index }}</b></p>
                                <br>
                                <div class="flex flex-wrap justify-start flex-row-reverse mt-2">
                                    <div class="w-full">
                                        <p class=""><small><i>Sección Niños</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-4'].nino"
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
                                    <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-4'].adulto"
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
                                        C-{{ odontodiagramaPaciente[posicion].dientes['C-3']._index }}</b></p>
                                <br>
                                <div class="flex flex-wrap justify-start mt-2">
                                    <div class="w-full">
                                        <p class="text-end"><small><i>Sección Niños</i></small></p>
                                    </div>
                                    <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-3'].nino"
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
                                    <div v-for="(diente, key_diente) of odontodiagramaPaciente[posicion].dientes['C-3'].adulto"
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
                        <div class="flex flex-wrap justify-around" v-else>
                            <div class="w-11/12">
                                <el-divider>Odontodiagrama</el-divider>
                            </div>
                            <div class="w-1/2">
                                <el-alert
                                    :closable="false"
                                    title="Sin odontodiagrama "
                                    type="warning"
                                    description="Aun no se registra el odontodiagrama del paciente"
                                    show-icon
                                />
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
                        <br>
                        <br>
                        <div class="flex flex-wrap justify-around">
                            <button type="button" @click="anterior"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                Anterior
                            </button>
                            <p class="py-1 px-0 m-0">Pagina {{posicion + 1}}</p>
                            <button type="button" @click="siguiente"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                Siguiente
                            </button>
                        </div>
                        <br><br>
                    </form>
                    <div v-else>
                        <div class="text-center mt-5 py-5">
                            <h1>No encontrado </h1>
                            <p>Este paciente no existe, o ya no se encutra en nuestra base de datos</p>
                        </div>
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
    name: "paciente-historic",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | historial del paciente",
    },
    created() {
        this.obtenerDatosPaciente(this.$route.params.ID);
    },
    data() {
        return {
            loading: false,
            diente: null,
            odontodiagrama: [],
            modal: false,
            posicion: 0,
        };
    },
    methods: {
        obtenerDatosPaciente(ID) {
            this.$store.dispatch('obtenerOdontodiagramaIdPaciente', { id: ID });
            this.$store.dispatch("obtenerPacienteId", {id: ID,});
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
        }
    },
    computed: {
        paciente() {
            return this.$store.getters.getPaciente;
        },
        odontodiagramaPaciente(){
            return this.$store.getters.getOdontodiagramaIdPaciente;
        }
    },
};
</script>
