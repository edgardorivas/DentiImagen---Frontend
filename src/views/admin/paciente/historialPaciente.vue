<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-10/12 mb-12 ml-40 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Historial del Paciente
                        </h3>
                    </div>
                </div>
                <div class="mt-10 pb-5">
                    <div v-if="paciente" class="demo-image__placeholder   relative">
                        <div class="block">
                            <!-- <i class="el-icon-user-solid w-72 h-72 absolute top-9 left-20"></i> -->
                            <img src="../../../assets/avatar_masculino.svg" class="md:w-40 md:h-40 lg:w-60 lg:h-80 absolute md:top-14 md:left-32 lg:top-14 lg:left-28" alt="">
                            <el-button  v-if="estadoHistorialTratamientos" v-on:click=" estadoHistorialTratamientos = false " class=" absolute top- left-36" type="text">Historial de tratamientos</el-button>
                            <el-button v-else v-on:click="estadoHistorialTratamientos = true"  class=" absolute top-80 left-40" type="text">Odontodiagrama</el-button>

                        </div>
                    </div>
                    
                    <form v-if="paciente" @submit.prevent="false">


                        <div class=" md:w-full lg:w-9/12 w-9/12 md:ml-20 md:mt-96 lg:ml-96 lg:mt-14">
                        <!-- <div class=" w-9/12 md:ml-52 md:mt-40 lg:ml-96 lg:mt-14 "> -->

                            <el-descriptions title="Datos del Paciente" class="p-2 pb-2 ml-20"   :column="2">
                                <el-descriptions-item label="Nombres">{{ paciente.nombre_paciente }}</el-descriptions-item>
                                <el-descriptions-item label="Apellidos">{{ paciente.apellido_paciente }}</el-descriptions-item>
                                <el-descriptions-item label="Edad" >{{ paciente.edad_paciente }}</el-descriptions-item>
                                <el-descriptions-item label="Cedula"> {{ paciente.cedula_paciente }}</el-descriptions-item>
                                <el-descriptions-item label="Genero">{{ paciente.genero_paciente }}</el-descriptions-item>
                                <el-descriptions-item label="Telefono">{{ paciente.telefono_paciente }}</el-descriptions-item>
                                <el-descriptions-item label="Odontologo referido">{{ paciente.referido_por }}</el-descriptions-item>
                                <el-descriptions-item label="Profesion">{{ paciente.profecion }}</el-descriptions-item>
                                <el-descriptions-item label="Alergia a algun medicamento">{{ paciente.alergico_algun_tratamiento == "true" ? 'Si' :'No' }}</el-descriptions-item>
                                <el-descriptions-item label="Medicado">{{paciente.esta_tratamiento}}</el-descriptions-item>
                                <el-descriptions-item label="Motivo de la Consulta inicial">{{ paciente.motivo_consulta }}</el-descriptions-item>
                                <el-descriptions-item label="Correo Electronico">{{ paciente.correo_paciente }}</el-descriptions-item>
                                <el-descriptions-item label="Dirección">{{paciente.direccion_paciente}}</el-descriptions-item>
                            </el-descriptions>
                        </div>


                        <div class="mt-10 ml-5 w-11/12">
                            <el-descriptions title="Datos adicionales" class="p-2 ml-20 " direction="vertical"  :column="4" border>
                                <el-descriptions-item label="¿ Sufre de presion arterial ?">{{ paciente.suefre_presion_alterial == true ? 'Si' :'No' }}</el-descriptions-item>
                                <el-descriptions-item label="¿ Diabetico ?">{{ paciente.diabetico == true ? 'Si' :'No' }}</el-descriptions-item>
                                <el-descriptions-item label="¿ Antecedentes familiares de diabetes ?">{{ paciente.antecedentes_diabetico == true ? 'Si' :'No' }}</el-descriptions-item>
                                <el-descriptions-item label="¿ Ha sufrido de Herpes ?">{{ paciente.ha_sufrido_hepatitis == true ? 'Si' :'No' }}</el-descriptions-item>
                                <el-descriptions-item label="¿ Ha sufrido de Afecciones cardiacas  ?">{{ paciente.ha_sufrido_efecciones_cardiacas == true ? 'Si' :'No' }}</el-descriptions-item>
                                <el-descriptions-item label="¿ Problemas con la Anestecia ?">{{ paciente.ha_sufrido_con_anestecia == true ? 'Si' :'No' }}</el-descriptions-item>
                                <el-descriptions-item label="¿ Es usted propenso a las Hemorragias ?">{{ paciente.propenso_horragia == true ? 'Si' :'No' }}</el-descriptions-item>
                                <el-descriptions-item label="¿ Ha convulsionado alguna vez ?">{{ paciente.convulcion_alguna_vez == true ? 'Si' :'No' }}</el-descriptions-item>
                                <el-descriptions-item label="¿ Ha sufrido de Hepatitis ?">{{ paciente.ha_sufrido_hepatitis == true ? 'Si' :'No' }}</el-descriptions-item>
                                
                            </el-descriptions>
                        </div>

                        <!-- OdontoDiagrama -->
                        <div v-if="estadoHistorialTratamientos">
                           
                            <!-- Odonto Diagrama -->
                            <div v-if="odontodiagramaPaciente && odontodiagramaPaciente.length" class="w-11/12 ml-16 flex flex-wrap justify-around mt-5">
                                
                                <div class="w-11/12 text-gray-600">
                                    <el-divider>Odontodiagrama</el-divider>
                                </div>
    
                                <div class="w-11/12 text-center">
                                    <div class="flex flex-wrap justify-around">
                                      <h4 class="text-gray-600">Fecha: {{parseDate(odontodiagramaPaciente[posicion].fecha_registro)}}</h4>
                                      <button type="button" @click="centerDialogVisible = true" class="bg-verdiAnderson px-3 rounded-sm text-white text-lg">
                                        Abrir Estadisticas
                                      </button>
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
                                        <div class="w-full text-gray-600">
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
                                    <p class="text-center text-gray-600">Punto de Referencia <b class="text-verdiAnderson">
                                            C-{{ odontodiagramaPaciente[posicion].dientes['C-2']._index }}</b></p>
                                    <br>
                                    <div class="flex flex-wrap justify-start">
                                        <div class="w-full text-gray-600">
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
                                            <p class="text-end text-gray-600"><small><i>Sección Niños</i></small></p>
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
                                    <p class="text-center text-gray-600">Punto de Referencia <b class="text-verdiAnderson">
                                            C-{{ odontodiagramaPaciente[posicion].dientes['C-4']._index }}</b></p>
                                    <br>
                                    <div class="flex flex-wrap justify-start flex-row-reverse mt-2">
                                        <div class="w-full text-gray-600">
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
                                            <p class="text-gray-600"><small><i>Sección Adultos</i></small></p>
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
                                    <p class="text-center text-gray-600">Punto de Referencia <b class="text-verdiAnderson">
                                            C-{{ odontodiagramaPaciente[posicion].dientes['C-3']._index }}</b></p>
                                    <br>
                                    <div class="flex flex-wrap justify-start mt-2">
                                        <div class="w-full">
                                            <p class="text-end text-gray-600"><small><i>Sección Niños</i></small></p>
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
                                            <p class="text-end text-gray-600"><small><i>Sección Adultos</i></small></p>
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
                                <div class="w-11/12 text-gray-600">
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


                            <div v-if="odontodiagramaPaciente && odontodiagramaPaciente.length" class="flex flex-wrap justify-around">
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
                            <div  class="w-11/12 ml-16 flex flex-wrap justify-around mt-5">
                                <div class="w-11/12 text-gray-600">
                                    <el-divider>Historial odontologico</el-divider>
                                </div>


                                <div class="w-11/12 mb-20 text-center">
                                    <br>
                                    
                                    <div v-if="historialPaciente">

                                        <el-form  :inline="true"  label-position="top">
                                            <el-form-item class="w-72 " label="Fecha del tratamiento">
                                                <el-input v-model="filterDate" type="date" placeholder="Filtrar por fecha"></el-input>
                                            </el-form-item>

                                            <el-form-item class="w-72 ml-24"  label="Odontologo">
                                                <el-select v-model="filterName" clearable class="w-full" placeholder="odontologo">
                                                    <div v-for="item in trabajadores.data" :key="item.id_trabajador">
                                                        <el-option v-if="item.rol == 'Odontologo'"
                                                            :key="item.id_trabajador"
                                                            :label="item.nombre + ' ' + item.apellido"
                                                            :value="item.nombre">
                                                        </el-option>
                                                    </div>
                                                    
                                                </el-select>
                                            </el-form-item>
                                            
                                        </el-form>

                                        
                                        
                                        <template  >

                                            <el-table  class="mt-10" :data="historialPaciente.filter(item => item.nombre_trabajador.toLowerCase().includes(filterName.toLowerCase()) && item.fecha_registro.toLowerCase().includes(filterDate.toLowerCase()))">
                                                
                                                <el-table-column type="expand">
                                                    <template slot-scope="props">
                                                        <p> <span class="text-black"> Titulo: </span> {{ props.row.titulo_tratamiento }}</p>
                                                        <p><span class="text-black"> Descripcion: </span> {{ props.row.descripcion_tratamientio }}</p>
                                                        <p><span class="text-black"> Observacion: </span>  {{ props.row.observaciones_generales }}</p>
                                                    </template>
                                                </el-table-column>
                                                
                                                <el-table-column prop="id_historial_tratamientos" label="id" > </el-table-column>
                                                
                                                <el-table-column prop="id_trabajador" label="Odontologo">
                                                    <template slot-scope="scope">
                                                        <p class="">{{ scope.row.nombre_trabajador +" "+ scope.row.apellido_trabajador }}</p>
                                                    </template>
                                                </el-table-column>



                                                <el-table-column prop="fecha_registro" label="Fecha">
                                                    <template slot-scope="scope">
                                                        <p class="">{{ parseDate(scope.row.fecha_registro) }}</p>
                                                    </template>
                                                </el-table-column>

                                                <el-table-column prop="titulo_tratamiento" label="Titulo del tratamiento" ></el-table-column>
                                                <el-table-column prop="descripcion_tratamientio" label="Descripcion"></el-table-column>
                                                <el-table-column prop="observaciones_generales" label="Observaciones"></el-table-column>

                                            </el-table>
                                            <!-- El paginador no esta listo , preguntarle a robert -->
                                            <el-pagination class="mt-5"
                                                @size-change="handleSizeChange"
                                                @current-change="handleCurrentChange"
                                                :current-page.sync="currentPage"
                                                :page-sizes="[3,6,9]"
                                                :page-size="pageSize"
                                                layout=" prev, pager, next"
                                                :total="9">
                                            </el-pagination>
                                            
                                        </template>
                                    </div>

                                    <div v-else>
                                        <el-alert class="w-1/2 m-auto"
                                            title="El paciente no tiene un historial de tratamiendo por el momento"
                                            type="warning"
                                            :closable="false"
                                            description='
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

                        <el-alert class="w-1/2 m-auto"
                            title="No encontrado"
                            type="warning"
                            :closable="false"
                            description='
                            Este paciente no existe, o ya no se encutra en nuestra base de datos
                            '>
                        </el-alert>

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
        this.obtenerEstadisticas();

    },
    data() {
        return {
            fecha_tratamiento: '',
            estadoHistorialTratamientos:true,
            loading: false,
            diente: null,
            odontodiagrama: [],
            modal: false,
            posicion: 0,
            estadisticas: null,
            centerDialogVisible: false,

            date: '',
            filterName: '',
            filterDate: '',
            currentPage: 1,
            pageSize: 3,
            OdontologosHistorial:[],

        };
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },


        filtrarOdontologos(){
            if(this.historialPaciente){
                let historial = this.historialPaciente;
                
            }
        },
        obtenerDatosPaciente(ID) {
            this.$store.dispatch('obtenerOdontodiagramaIdPaciente', { id: ID });
            this.$store.dispatch('obtenerListaDeUsuarios');
            this.$store.dispatch("obtenerPacienteId", {id: ID,});
            this.$store.dispatch("obtenerHistorialTratamientoIdPaciente", {id: ID,});

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
     
    },
    computed: {
        
        paciente() {
            return this.$store.getters.getPaciente;
        },
        odontodiagramaPaciente(){
            return this.$store.getters.getOdontodiagramaIdPaciente;
        },
        historialPaciente(){
            console.log("this.$store.getters.getHistorialTratamiento------------",this.$store.getters.getHistorialTratamiento)
            return this.$store.getters.getHistorialTratamiento;
        },
        trabajadores(){
            return this.$store.getters.getusuarios;

        },
    },
};
</script>
