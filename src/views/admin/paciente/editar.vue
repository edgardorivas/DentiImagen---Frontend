<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Detalles del Paciente
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">

                    <el-form v-if="paciente" label-position="top" :model="paciente" :rules="rules"  ref="editarPaciente" label-width="120px" class="demo-ruleForm">
                        <div class="flex flex-wrap justify-around">
                            
                            <div class="w-11/12">
                                <el-divider>Datos del Paciente</el-divider>
                            </div>

                            
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
                                    <el-form-item prop="nombre_paciente">
                                        <el-input placeholder="Nombre del Paciente"
                                            v-model="paciente.nombre_paciente"></el-input>
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Apellido</p>
                                    <el-form-item prop="apellido_paciente">

                                        <el-input placeholder="Apellido del Paciente"
                                            v-model="paciente.apellido_paciente"></el-input>
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Edad</p>
                                    <el-form-item prop="edad_paciente">
                                        <el-input placeholder="Edad del Paciente" type="number" v-model="paciente.edad_paciente"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cedula</p>
                                    <el-form-item prop="cedula_paciente" >

                                        <el-input placeholder="Cedula del Paciente" disabled type="number"
                                            v-model="paciente.cedula_paciente"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Sexo</p>
                                    <el-form-item prop="genero_paciente">
                                        <el-select v-model="paciente.genero_paciente" style="width: 100%;" size="large"
                                            placeholder="Genero del Paciente">
                                            <el-option key="Masculino" label="Masculino" value="Masculino">
                                            </el-option>
                                            <el-option key="Femenino" label="Femenino" value="Femenino">
                                            </el-option>
                                        </el-select>

                                        <!-- <el-input placeholder="Genero del Paciente"
                                            v-model="paciente.genero_paciente"></el-input>
 -->

                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Telefono</p>
                                    <el-form-item prop="telefono_paciente">
                                        <el-input placeholder="Telefono del Paciente" type="number"
                                            v-model="paciente.telefono_paciente"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Correo Electronico</p>
                                    <el-form-item prop="correo_paciente">

                                        <el-input placeholder="Correo del Paciente" type="email"
                                            v-model="paciente.correo_paciente"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Referido por</p>
                                    <el-form-item prop="referido_por">
                                        <el-input disabled placeholder="Nombre del tipo de material"
                                            v-model="paciente.referido_por"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Motivo de la Consulta al Registrarse</p>
                                    <el-form-item prop="motivo_consulta">

                                        <el-input placeholder="Motivo de la Consulta"
                                            v-model="paciente.motivo_consulta"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Profesion</p>
                                    <el-form-item prop="profecion">

                                        <el-input placeholder="Profesion del Paciente" v-model="paciente.profecion"></el-input>
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿Posee Alergia a algun medicamento?</p>
                                    <el-form-item prop="alergico_algun_tratamiento">
                                        <el-input placeholder="Indique el nombre del medicamento"
                                        v-model="paciente.alergico_algun_tratamiento"></el-input>

                                        <!-- <el-select v-model="paciente.alergico_algun_tratamiento"
                                            placeholder="¿ Alergia a algun medicamento?" class="w-full">
                                            <el-option label="Si" :value="true"></el-option>
                                            <el-option label="No" :value="false"></el-option>
                                        </el-select> -->
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Dirección</p>
                                    <el-form-item prop="direccion_paciente">

                                        <el-input placeholder="Direccion del Paciente"
                                            v-model="paciente.direccion_paciente"></el-input>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Esta usted en tratamiento ?</p>
                                    <el-form-item prop="esta_tratamiento">

                                        <el-input placeholder="Esta en tratamiento"
                                            v-model="paciente.esta_tratamiento"></el-input>
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-11/12">
                                <el-divider>Datos Adicionales</el-divider>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Sufre de presion arterial ?</p>
                                    <el-form-item prop="suefre_presion_alterial">
                                        <el-radio-group  v-model="paciente.suefre_presion_alterial">
                                            <el-radio  :label=true>SI</el-radio>
                                            <el-radio :label=false>NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>

                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Diabetico ?</p>
                                    <el-form-item prop="diabetico">
                                        <el-radio-group  v-model="paciente.diabetico">
                                            <el-radio  :label=true>SI</el-radio>
                                            <el-radio :label=false>NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Antecedentes familiares de diabetes ?</p>
                                    <el-form-item prop="antecedentes_diabetico">
                                        <el-radio-group  v-model="paciente.antecedentes_diabetico">
                                            <el-radio  :label=true>SI</el-radio>
                                            <el-radio :label=false>NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Hepatitis ?</p>
                                    <el-form-item prop="ha_sufrido_hepatitis">
                                        <el-radio-group  v-model="paciente.ha_sufrido_hepatitis">
                                            <el-radio  :label=true>SI</el-radio>
                                            <el-radio :label=false>NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Herpes ?</p>
                                    <el-form-item prop="ha_sufrido_herpes">
                                        <el-radio-group  v-model="paciente.ha_sufrido_herpes">
                                            <el-radio  :label=true>SI</el-radio>
                                            <el-radio :label=false>NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Afecciones cardiacas ?</p>
                                    <el-form-item prop="ha_sufrido_efecciones_cardiacas">
                                        <el-radio-group  v-model="paciente.ha_sufrido_efecciones_cardiacas">
                                            <el-radio  :label=true>SI</el-radio>
                                            <el-radio :label=false>NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Problemas con la Anestecia ?</p>
                                    <el-form-item prop="ha_sufrido_con_anestecia">
                                        <el-radio-group  v-model="paciente.ha_sufrido_con_anestecia">
                                            <el-radio  :label=true>SI</el-radio>
                                            <el-radio :label=false>NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Es usted propenso a las Hemorragias ?</p>
                                    <el-form-item prop="propenso_horragia">
                                        <el-radio-group  v-model="paciente.propenso_horragia">
                                            <el-radio  :label=true>SI</el-radio>
                                            <el-radio :label=false>NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha convulsionado alguna vez ?</p>
                                    <el-form-item prop="convulcion_alguna_vez">
                                        <el-radio-group  v-model="paciente.convulcion_alguna_vez">
                                            <el-radio  :label=true>SI</el-radio>
                                            <el-radio :label=false>NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    
                                </label>
                            </div>
                        </div>
                        <br>
                        <div class="flex flex-wrap justify-around">
                            <button type="button" v-on:click="actualizacionPaciente(paciente)" :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                Guardar Cambios
                            </button>
                        </div>
                    </el-form>

                    <div v-else>
                        <div class="text-center mt-5 py-5">
                            <h1>No encontrado </h1>
                            <p>Este paciente no existe, o ya no se encutra en nuestra base de datos</p>
                        </div>
                    </div>


                    <!-- <form v-if="paciente" @submit.prevent="actualizacionPaciente(paciente)">
                        <div class="flex flex-wrap justify-around">
                            <div class="w-11/12">
                                <el-divider>Datos del Paciente</el-divider>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
                                    <el-input placeholder="Nombre del Paciente"
                                        v-model="paciente.nombre_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Apellido</p>
                                    <el-input placeholder="Apellido del Paciente"
                                        v-model="paciente.apellido_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Edad</p>
                                    <el-input placeholder="Edad del Paciente" v-model="paciente.edad_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cedula</p>
                                    <el-input placeholder="Cedula del Paciente"
                                        v-model="paciente.cedula_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Sexo</p>
                                    <el-input placeholder="Genero del Paciente"
                                        v-model="paciente.genero_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Telefono</p>
                                    <el-input placeholder="Telefono del Paciente"
                                        v-model="paciente.telefono_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Correo Electronico</p>
                                    <el-input placeholder="Correo del Paciente"
                                        v-model="paciente.correo_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Referido por</p>
                                    <el-input placeholder="Nombre del tipo de material"
                                        v-model="paciente.referido_por"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Motivo de la Consulta al Registrarse</p>
                                    <el-input placeholder="Motivo de la Consulta"
                                        v-model="paciente.motivo_consulta"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Profesion</p>
                                    <el-input placeholder="Profesion del Paciente" v-model="paciente.profecion"></el-input>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿Posee Alergia a algun medicamento?</p>
                                    <el-select v-model="paciente.alergico_algun_tratamiento"
                                        placeholder="¿ Alergia a algun medicamento?" class="w-full">
                                        <el-option label="Si" :value="true"></el-option>
                                        <el-option label="No" :value="false"></el-option>
                                    </el-select>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Dirección</p>
                                    <el-input placeholder="Direccion del Paciente"
                                        v-model="paciente.direccion_paciente"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Esta usted en tratamiento ?</p>
                                    <el-input placeholder="Esta en tratamiento"
                                        v-model="paciente.esta_tratamiento"></el-input>
                                </label>
                            </div>

                            <div class="w-11/12">
                                <el-divider>Datos Adicionales</el-divider>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Sufre de presion arterial ?</p>
                                    <el-radio v-model="paciente.suefre_presion_alterial" :label=true>SI</el-radio>
                                    <el-radio v-model="paciente.suefre_presion_alterial" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Diabetico ?</p>
                                    <el-radio v-model="paciente.diabetico" :label=true>SI</el-radio>
                                    <el-radio v-model="paciente.diabetico" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Antecedentes familiares de diabetes ?</p>
                                    <el-radio v-model="paciente.antecedentes_diabetico" :label=true>SI</el-radio>
                                    <el-radio v-model="paciente.antecedentes_diabetico" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Hepatitis ?</p>
                                    <el-radio v-model="paciente.ha_sufrido_hepatitis" :label=true>SI</el-radio>
                                    <el-radio v-model="paciente.ha_sufrido_hepatitis" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Herpes ?</p>
                                    <el-radio v-model="paciente.ha_sufrido_herpes" :label=true>SI</el-radio>
                                    <el-radio v-model="paciente.ha_sufrido_herpes" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Afecciones cardiacas ?</p>
                                    <el-radio v-model="paciente.ha_sufrido_efecciones_cardiacas" :label=true>SI</el-radio>
                                    <el-radio v-model="paciente.ha_sufrido_efecciones_cardiacas" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Problemas con la Anestecia ?</p>
                                    <el-radio v-model="paciente.ha_sufrido_con_anestecia" :label=true>SI</el-radio>
                                    <el-radio v-model="paciente.ha_sufrido_con_anestecia" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Es usted propenso a las Hemorragias ?</p>
                                    <el-radio v-model="paciente.propenso_horragia" :label=true>SI</el-radio>
                                    <el-radio v-model="paciente.propenso_horragia" :label=false>NO</el-radio>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha convulsionado alguna vez ?</p>
                                    <el-radio v-model="paciente.convulcion_alguna_vez" :label=true>SI</el-radio>
                                    <el-radio v-model="paciente.convulcion_alguna_vez" :label=false>NO</el-radio>
                                </label>
                            </div>
                        </div>
                        <br>
                        <div class="flex flex-wrap justify-around">
                            <button type="submit" :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                                Guardar Cambios
                            </button>
                        </div>
                    </form> -->
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from "../../../config";
import axios from "axios";
export default {
    name: "paciente-edit",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Detalles del Paciente",
    },
    created() {
        this.obtenerDatosPaciente(this.$route.params.ID);
    },
    data() {
        return {
            loading: false,
            rules: {
                nombre_paciente: [
                    { required: true, message: 'Es necesario ingresar los nombre del paciente', trigger: 'blur' },
                    { min: 5,  message: 'Los nombre tiene que tener mas de 5 caracteres', trigger: 'blur' }
                ],
                apellido_paciente: [
                    { required: true, message: 'Es necesario ingresar los apellido del paciente', trigger: 'blur' },
                    { min: 5,  message: 'Los apellido tiene que tener mas de 5 caracteres', trigger: 'blur' }

                ],
                edad_paciente: [
                    { required: true, message: 'Es necesario ingresar la edad del paciente', trigger: 'blur' },
                    { min: 1, max:3, message: 'La edad tiene que tener como minimo 1 digito y como maximo 3', trigger: 'blur' }
                ],
                cedula_paciente: [
                    { required: true, message: 'Es necesario ingresar la cedula del paciente', trigger: 'blur' },
                    { min: 7,  message: 'la cedula tiene que tener como minimo 7 caracteres', trigger: 'blur' }
                ],
                correo_paciente: [
                    { type: 'email', required: true, message: 'Ingrese el correo electronico del paciente', trigger: 'blur',
                }
                ],
                telefono_paciente: [
                    { type: 'string',required: true, message: 'Es obligatorio el numero de telefono ', trigger: 'blur' },
                    { length:11,  message: 'El numero telefonico tiene que contener 11 digitos', trigger: 'blur'}
                ],
                referido_por: [
                    { type: 'string',required: false, message: 'Ingrese el nombre del odontologo', trigger: 'blur' },
                    { length:5,  message: 'El nombre tiene que ser como minimo de 5 caracteres', trigger: 'blur'}
                ],
                profecion: [
                    { required: false, message: 'Ingrese su profesion ', trigger: 'bluer' },
                    { min: 2,  message: 'Como minimo se tiene que ingresar 2 caracteres', trigger: 'blur' }
                ],
                genero_paciente: [
                    { required: true, message: 'Es obligatorio indicar el genero del paciente', trigger: 'blur' },
                ],
                motivo_consulta: [
                    { required: true, message: 'Es obligato ingresar el motivo de la consulta', trigger: 'blur' },
                    { min: 5,  message: 'El motivo de la consulta tiene que tener como minimo 5 caracteres', trigger: 'blur' }
                ],
                direccion_paciente: [
                    { required: true, message: 'Ingrese la direccion del paciente', trigger: 'blur' },
                    { min: 5,  message: 'Ingrese el nombre completo del paciente', trigger: 'blur' }

                ],
                diabetico: [
                    
                    { required: true, message: 'Es obligatorio indicar si el paciente tiene diabetes', trigger: 'change' },
                ],
                antecedentes_diabetico: [
                    { required: true, message: 'Es obligatorio indicar si el paciente tiene antecedentes de diabetes', trigger: 'change' },
                ],
                ha_sufrido_hepatitis: [
                    { required: true, message: 'Es obligatorio indicar si el paciente ha tenido  hepatitis', trigger: 'change' },

                ],
                ha_sufrido_herpes: [
                    { required: true, message: 'Es obligatorio indicar si el paciente ha tenido  herpes', trigger: 'change' },

                ],
                ha_sufrido_efecciones_cardiacas: [
                    { required: true, message: 'Es obligatorio indicar si el paciente ha tenido afecciones cardiacas', trigger: 'change' },

                ],
                ha_sufrido_con_anestecia: [
                    { required: true, message: 'Es obligatorio indicar si el paciente tiene problema con la anestecia', trigger: 'change' },
                ],
                propenso_horragia: [
                    { required: true, message: 'Es obligatorio indicar si el paciente es propenso a hemorragias', trigger: 'change' },

                ],
                convulcion_alguna_vez: [
                    { required: true, message: 'Es obligatorio indicar si el paciente ha tenido convulciones', trigger: 'change' },

                ],
                esta_tratamiento: [
                    { required: true, message: 'Es obligatorio indicar si el paciente esta en tratamiento ', trigger: 'change' },

                ],
                alergico_algun_tratamiento: [
                    { required: true, message: 'Es obligatorio indicar si el paciente tiene alguna alergia ala medicina', trigger: 'change' },

                ],
                suefre_presion_alterial: [
                    { required: true, message: 'Es obligatorio indicar si el paciente es propenso a la tension alta', trigger: 'change' },

                ],
                trabajadorOdontologo: [
                    { required: true, message: 'Es obligatorio indicar el odontologo', trigger: 'change' },

                ],
            },
        };
    },
    methods: {
        async actualizacionPaciente(pacienteDatos) {
            console.log("data----------------------",pacienteDatos)
            this.$refs['editarPaciente'].validate(async (valid) => {
                if(valid){
                    try {
                        this.$store.dispatch("getLoadingApp", true);
                        this.loading = true;
                        const token = localStorage.getItem("token_acess");
    
                        const request = await axios({
                            method: "PATCH",
                            baseURL: config.backend.baseURL,
                            url: "/paciente/" + pacienteDatos.id_paciente,
                            headers: {
                                ["auth-token"]: token,
                            },
                            data: pacienteDatos,
                        });
    
                        this.$store.dispatch("getLoadingApp", false);
                        this.loading = false;
                        this.$message({
                            message: "Actualizado Exitosamente",
                            type: "success",
                        });
                        this.$router.push({ path: "/admin/paciente/lista" });
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
                        // console.clear();
                    }
                }
            });

        },
        obtenerDatosPaciente(ID) {
            this.$store.dispatch("obtenerPacienteId", {
                id: ID,
            });
        }
    },
    computed: {
        paciente() {
            return this.$store.getters.getPaciente;
        }
    },
};
</script>
