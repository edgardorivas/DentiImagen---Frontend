<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="flex justify-center">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 class="font-semibold text-xl text-blueGray-700 uppercase">
                            Registro de un nuevo Paciente
                        </h3>
                    </div>
                </div>
                <div class="mt-5 pb-5">


                    <el-form label-position="top" :model="nuevoHistorialPaciente" :rules="rules"  ref="registrarPaciente" label-width="120px" class="demo-ruleForm">
                        <div class="flex flex-wrap justify-around">
    
                            <div class="w-11/12">
                                <el-divider>Datos del Paciente</el-divider>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 ml-2 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
                                    <el-form-item prop="nombre">
                                        <el-input placeholder="Nombre del Paciente"
                                            v-model="nuevoHistorialPaciente.nombre"></el-input>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Apellido</p>
                                    <el-form-item prop="apellido">
                                        <el-input placeholder="Apellido del Paciente"
                                            v-model="nuevoHistorialPaciente.apellido"></el-input>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Edad</p>
                                    <el-form-item prop="edad">
                                        <el-input placeholder="Edad del Paciente" type="number"
                                            v-model="nuevoHistorialPaciente.edad"></el-input>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cedula</p>
                                    <el-form-item prop="cedula">
                                        <el-input placeholder="Cedula del Paciente" type="number"
                                            v-model="nuevoHistorialPaciente.cedula"></el-input>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Sexo</p>
                                    <el-form-item prop="genero">
                                        <el-select v-model="nuevoHistorialPaciente.genero" style="width: 100%;" size="large"
                                            placeholder="Genero del Paciente">
                                            <el-option key="Masculino" label="Masculino" value="Masculino">
                                            </el-option>
                                            <el-option key="Femenino" label="Femenino" value="Femenino">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </label>
                            </div>


                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Telefono</p>
                                    <el-form-item prop="telefono">
                                        <el-input placeholder="Telefono del Paciente" type="number"
                                            v-model="nuevoHistorialPaciente.telefono"></el-input>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Correo Electronico</p>
                                    <el-form-item prop="correo">
                                        <el-input placeholder="Correo del Paciente" type="email"
                                            v-model="nuevoHistorialPaciente.correo"></el-input>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Motivo de la Consulta</p>
                                    <el-form-item prop="motivoConsulta">
                                        <el-input placeholder="Motivo de la Consulta"
                                            v-model="nuevoHistorialPaciente.motivoConsulta"></el-input>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Profesion </p>
                                    <el-form-item prop="profecion">
                                        <el-input placeholder="Profesion del Paciente"
                                            v-model="nuevoHistorialPaciente.profecion"></el-input>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Direccion </p>
                                    <el-form-item prop="direccion">
                                        <el-input placeholder="Direccion del Paciente"
                                            v-model="nuevoHistorialPaciente.direccion"></el-input>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Alergia a algun medicamento?</p>
                                    <el-form-item prop="alergicoAlgunMedicamento">
                                        <el-input placeholder="Indique el nombre del medicamento"
                                            v-model="nuevoHistorialPaciente.alergicoAlgunMedicamento"></el-input>
                                    </el-form-item>
                                </label>
                            </div>



                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label v-if="trabajadoresOdontologicos">
                                    <p class="ml-1">Odontologo Asignado</p>
                                    <el-form-item prop="trabajadorOdontologo">
                                        <el-select v-model="nuevoHistorialPaciente.trabajadorOdontologo" style="width: 100%;"
                                            size="large" placeholder="Genero del Paciente">
                                            <el-option v-for=" trabajador in trabajadoresOdontologicos"
                                                :key="trabajador.id_trabajador"
                                                :label="trabajador.nombre + ' - ' + trabajador.especializacion"
                                                :value="trabajador.id_trabajador">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </label>
                                <label v-else>
                                    <h4>No hay odontologos registrados</h4>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Odontologo Referido</p>
                                    <el-form-item prop="referidoPor">
                                        <el-input placeholder="Indique el nombre del doctor referido"
                                            v-model="nuevoHistorialPaciente.referidoPor"></el-input>
                                    </el-form-item>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Esta usted en tratamiento ?</p>
                                    <el-form-item prop="estaTratamiento">
                                        <el-input placeholder="E paciente esta en tratamiento"
                                            v-model="nuevoHistorialPaciente.estaTratamiento"></el-input>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-11/12">
                                <el-divider>Datos historicos de padecimientos</el-divider>
                            </div>
                            <!--Se muestra los selects-->


                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Sufre de presion arterial ?</p>
                                    <el-form-item prop="sufreTensionAlterial">
                                        <el-radio-group v-model="nuevoHistorialPaciente.sufreTensionAlterial" >
                                            <el-radio label="1">SI</el-radio>
                                            <el-radio label="0">NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Diabetico ?</p>
                                    <el-form-item prop="diabetico">
                                        <el-radio-group v-model="nuevoHistorialPaciente.diabetico">
                                            <el-radio  label="1">SI</el-radio>
                                            <el-radio  label="0">NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Antecedentes familiares de diabetes ?</p>
                                    <el-form-item prop="antecedentesDiabetico">
                                        <el-radio-group v-model="nuevoHistorialPaciente.antecedentesDiabetico">
                                            <el-radio  label="1">SI</el-radio>
                                            <el-radio  label="0">NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Hepatitis ?</p>
                                    <el-form-item prop="antecedentesDiabetico">
                                        <el-radio-group v-model="nuevoHistorialPaciente.sufridoHepatitis">
                                            <el-radio  label="1">SI</el-radio>
                                            <el-radio  label="0">NO</el-radio>
                                        </el-radio-group>
                                        
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Herpes ?</p>
                                    <el-form-item prop="sufridoHerpes">
                                        <el-radio-group v-model="nuevoHistorialPaciente.sufridoHerpes">
                                            <el-radio  label="1">SI</el-radio>
                                            <el-radio  label="0">NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Afecciones cardiacas ?</p>
                                    <el-form-item prop="efeccionesCardiacas">
                                        <el-radio-group v-model="nuevoHistorialPaciente.efeccionesCardiacas">
                                            <el-radio  label="1">SI</el-radio>
                                            <el-radio  label="0">NO</el-radio>
                                        </el-radio-group>

                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Problemas con la Anestecia ?</p>
                                    <el-form-item prop="sufridoAnestecia">
                                        <el-radio-group v-model="nuevoHistorialPaciente.sufridoAnestecia">
                                            <el-radio  label="1">SI</el-radio>
                                            <el-radio  label="0">NO</el-radio>
                                        </el-radio-group>
                                        
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Es usted propenso a las Hemorragias ?</p>
                                    <el-form-item prop="propensoHemorragias">
                                        <el-radio-group v-model="nuevoHistorialPaciente.propensoHemorragias">
                                            <el-radio  label="1">SI</el-radio>
                                            <el-radio  label="0">NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>

                                </label>
                            </div>

                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha convulsionado alguna vez ?</p>
                                    <el-form-item prop="convulcionAlgunaVez">
                                        <el-radio-group v-model="nuevoHistorialPaciente.convulcionAlgunaVez">
                                            <el-radio  label="1">SI</el-radio>
                                            <el-radio  label="0">NO</el-radio>
                                        </el-radio-group>
                                    </el-form-item>

                                </label>
                            </div>
                        </div>
                       
                        <br>

                        <div class="flex flex-wrap justify-around">
                            <button :disabled="loading" type="button" v-on:click="registroPaciente()"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Guardar</button>
                        </div>
                    </el-form>
                    
                    <!-- <form @submit.prevent="registroPaciente()">
                        
                        <div class="flex flex-wrap justify-around">
    
                            <div class="w-11/12">
                                <el-divider>Datos del Paciente</el-divider>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 ml-2 py-1">
                                <label>
                                    <p class="ml-1">Nombre</p>
                                    <el-input placeholder="Nombre del Paciente"
                                        v-model="nuevoHistorialPaciente.nombre"></el-input>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Apellido</p>
                                    <el-input placeholder="Apellido del Paciente"
                                        v-model="nuevoHistorialPaciente.apellido"></el-input>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Edad</p>
                                    <el-input placeholder="Edad del Paciente"
                                        v-model="nuevoHistorialPaciente.edad"></el-input>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Cedula</p>
                                    <el-input placeholder="Cedula del Paciente"
                                        v-model="nuevoHistorialPaciente.cedula"></el-input>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Sexo</p>
                                    <el-select v-model="nuevoHistorialPaciente.genero" style="width: 100%;" size="large"
                                        placeholder="Genero del Paciente">
                                        <el-option key="Masculino" label="Masculino" value="Masculino">
                                        </el-option>
                                        <el-option key="Femenino" label="Femenino" value="Femenino">
                                        </el-option>
                                    </el-select>
                                </label>
                            </div>
    
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Telefono</p>
                                    <el-input placeholder="Telefono del Paciente"
                                        v-model="nuevoHistorialPaciente.telefono"></el-input>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Correo Electronico</p>
                                    <el-input placeholder="Correo del Paciente"
                                        v-model="nuevoHistorialPaciente.correo"></el-input>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Motivo de la Consulta</p>
                                    <el-input placeholder="Motivo de la Consulta"
                                        v-model="nuevoHistorialPaciente.motivoConsulta"></el-input>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Profesion </p>
                                    <el-input placeholder="Profesion del Paciente"
                                        v-model="nuevoHistorialPaciente.profecion"></el-input>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Direccion </p>
                                    <el-input placeholder="Direccion del Paciente"
                                        v-model="nuevoHistorialPaciente.direccion"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Alergia a algun medicamento?</p>
                                    <el-input placeholder="Indique el nombre del medicamento"
                                        v-model="nuevoHistorialPaciente.alergicoAlgunMedicamento"></el-input>
                                </label>
                            </div>
    
    
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label v-if="trabajadoresOdontologicos">
                                    <p class="ml-1">Odontologo Asignado</p>
                                    <el-select v-model="nuevoHistorialPaciente.trabajadorOdontologo" style="width: 100%;"
                                        size="large" placeholder="Genero del Paciente">
                                        <el-option v-for=" trabajador in trabajadoresOdontologicos"
                                            :key="trabajador.id_trabajador"
                                            :label="trabajador.nombre + ' - ' + trabajador.especializacion"
                                            :value="trabajador.id_trabajador">
                                        </el-option>
                                    </el-select>
                                </label>
                                <label v-else>
                                    <h4>No hay odontologos registrados</h4>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">Odontologo Referido</p>
                                    <el-input placeholder="Indique el nombre del doctor referido"
                                        v-model="nuevoHistorialPaciente.referidoPor"></el-input>
                                </label>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Esta usted en tratamiento ?</p>
                                    <el-input placeholder="E paciente esta en tratamiento"
                                        v-model="nuevoHistorialPaciente.estaTratamiento"></el-input>
                                </label>
                            </div>
    
                            <div class="w-11/12">
                                <el-divider>Datos historicos de padecimientos</el-divider>
                            </div>
    
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Sufre de presion arterial ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.sufreTensionAlterial" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.sufreTensionAlterial" label="0">NO</el-radio>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Diabetico ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.diabetico" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.diabetico" label="0">NO</el-radio>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Antecedentes familiares de diabetes ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.antecedentesDiabetico" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.antecedentesDiabetico" label="0">NO</el-radio>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Hepatitis ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoHepatitis" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoHepatitis" label="0">NO</el-radio>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Herpes ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoHerpes" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoHerpes" label="0">NO</el-radio>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha sufrido de Afecciones cardiacas ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.efeccionesCardiacas" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.efeccionesCardiacas" label="0">NO</el-radio>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Problemas con la Anestecia ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoAnestecia" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.sufridoAnestecia" label="0">NO</el-radio>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Es usted propenso a las Hemorragias ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.propensoHemorragias" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.propensoHemorragias" label="0">NO</el-radio>
                                </label>
                            </div>
    
                            <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                                <label>
                                    <p class="ml-1">¿ Ha convulsionado alguna vez ?</p>
                                    <el-radio v-model="nuevoHistorialPaciente.convulcionAlgunaVez" label="1">SI</el-radio>
                                    <el-radio v-model="nuevoHistorialPaciente.convulcionAlgunaVez" label="0">NO</el-radio>
                                </label>
                            </div>
                        </div>
                        <br>
    
                        <div class="flex flex-wrap justify-around">
                            <button :disabled="loading"
                                class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">Guardar</button>
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
    name: "typeProduct-add",
    metaInfo: {
        title: config.frontend.title,
        titleTemplate: "%s | Agregar nuevo Paciente",
    },
    created() {
        this.mostrarTrabajadoresRol();
    },
    data() {
        return {
            nuevoHistorialPaciente: {
                nombre: "",
                apellido: "",
                edad: "",
                cedula: "",
                telefono: "",
                correo: "",
                referidoPor: "",
                profecion: "",
                genero: "",
                motivoConsulta: "",
                direccion: "",
                diabetico: '',
                antecedentesDiabetico: '',
                sufridoHepatitis: '',
                sufridoHerpes: '',
                efeccionesCardiacas: '',
                sufridoAnestecia: '',
                propensoHemorragias: '',
                convulcionAlgunaVez: '',
                estaTratamiento: '',
                alergicoAlgunMedicamento: '',
                sufreTensionAlterial: '',
                trabajadorOdontologo: ''

            },
            rules: {
                nombre: [
                    { required: true, message: 'Es necesario ingresar los nombre del paciente', trigger: 'blur' },
                    { min: 5,  message: 'Los nombre tiene que tener mas de 5 caracteres', trigger: 'blur' }
                ],
                apellido: [
                    { required: true, message: 'Es necesario ingresar los apellido del paciente', trigger: 'blur' },
                    { min: 5,  message: 'Los apellido tiene que tener mas de 5 caracteres', trigger: 'blur' }

                ],
                edad: [
                    { required: true, message: 'Es necesario ingresar la edad del paciente', trigger: 'blur' },
                    { min: 1, max:3, message: 'La edad tiene que tener como minimo 1 digito y como maximo 3', trigger: 'blur' }
                ],
                cedula: [
                    { required: true, message: 'Es necesario ingresar la cedula del paciente', trigger: 'blur' },
                    { min: 7,  message: 'la cedula tiene que tener como minimo 7 caracteres', trigger: 'blur' }
                ],
                correo: [
                    { type: 'email', required: true, message: 'Ingrese el correo electronico del paciente', trigger: 'blur',
                }
                ],
                telefono: [
                    { type: 'string',required: true, message: 'Es obligatorio el numero de telefono ', trigger: 'blur' },
                    { length:11,  message: 'El numero telefonico tiene que contener 11 digitos', trigger: 'blur'}
                ],
                referidoPor: [
                    { type: 'string',required: false, message: 'Ingrese el nombre del odontologo', trigger: 'blur' },
                    { length:5,  message: 'El nombre tiene que ser como minimo de 5 caracteres', trigger: 'blur'}
                ],
                profecion: [
                    { required: false, message: 'Ingrese su profesion ', trigger: 'bluer' },
                    { min: 2,  message: 'Como minimo se tiene que ingresar 2 caracteres', trigger: 'blur' }
                ],
                genero: [
                    { required: true, message: 'Es obligatorio indicar el genero del paciente', trigger: 'blur' },
                ],
                motivoConsulta: [
                    { required: true, message: 'Es obligato ingresar el motivo de la consulta', trigger: 'blur' },
                    { min: 5,  message: 'El motivo de la consulta tiene que tener como minimo 5 caracteres', trigger: 'blur' }
                ],
                direccion: [
                    { required: true, message: 'Ingrese la direccion del paciente', trigger: 'blur' },
                    { min: 5,  message: 'Ingrese el nombre completo del paciente', trigger: 'blur' }

                ],
                diabetico: [
                    
                    { required: true, message: 'Es obligatorio indicar si el paciente tiene diabetes', trigger: 'change' },
                ],
                antecedentesDiabetico: [
                    { required: true, message: 'Es obligatorio indicar si el paciente tiene antecedentes de diabetes', trigger: 'change' },
                ],
                sufridoHepatitis: [
                    { required: true, message: 'Es obligatorio indicar si el paciente ha tenido  hepatitis', trigger: 'change' },

                ],
                sufridoHerpes: [
                    { required: true, message: 'Es obligatorio indicar si el paciente ha tenido  herpes', trigger: 'change' },

                ],
                efeccionesCardiacas: [
                    { required: true, message: 'Es obligatorio indicar si el paciente ha tenido afecciones cardiacas', trigger: 'change' },

                ],
                sufridoAnestecia: [
                    { required: true, message: 'Es obligatorio indicar si el paciente tiene problema con la anestecia', trigger: 'change' },
                ],
                propensoHemorragias: [
                    { required: true, message: 'Es obligatorio indicar si el paciente es propenso a hemorragias', trigger: 'change' },

                ],
                convulcionAlgunaVez: [
                    { required: true, message: 'Es obligatorio indicar si el paciente ha tenido convulciones', trigger: 'change' },

                ],
                estaTratamiento: [
                    { required: true, message: 'Es obligatorio indicar si el paciente esta en tratamiento ', trigger: 'change' },

                ],
                alergicoAlgunMedicamento: [
                    { required: true, message: 'Es obligatorio indicar si el paciente tiene alguna alergia ala medicina', trigger: 'change' },

                ],
                sufreTensionAlterial: [
                    { required: true, message: 'Es obligatorio indicar si el paciente es propenso a la tension alta', trigger: 'change' },

                ],
                trabajadorOdontologo: [
                    { required: true, message: 'Es obligatorio indicar el odontologo', trigger: 'change' },

                ],
            },
            loading: false,
        }
    },
    methods: {
        async registroPaciente() {
            this.$refs['registrarPaciente'].validate(async (valid) => {
                if(valid){
                    try {
                        this.$store.dispatch('getLoadingApp', true);
                        this.loading = true;
                        const token = localStorage.getItem('token_acess');
                        console.log(this.nuevoHistorialPaciente)
    
                        const request = await axios({
                            method: 'POST',
                            baseURL: config.backend.baseURL,
                            url: '/paciente/ingresar',
                            headers: {
                                ['auth-token']: token,
                            },
                            data: this.nuevoHistorialPaciente
                        });
                        console.log(request);
                        this.$store.dispatch('getLoadingApp', false);
                        this.loading = false;
                        this.$message({
                            message: 'Registrado Exitosamente',
                            type: 'success',
                        });
                        this.$router.push({ path: '/admin/paciente/lista' });
    
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
                        //console.clear()
                    }
                }
            });
        },
        cambiar() {
            this.segundaParte = !this.segundaParte;
        },
        mostrarTrabajadoresRol() {
            this.$store.dispatch("obtenerListaDeTrabajadoresRol");
        },
    },
    computed: {
        trabajadoresOdontologicos() {
            let trabajadoresRol = this.$store.getters.getUsuariosOdontologicos;

            if (typeof trabajadoresRol.data !== "undefined") {
                let trabajadoresRolOdontologo = trabajadoresRol.data.filter(datosTrabajador => datosTrabajador.id_rol == 3);
                return trabajadoresRolOdontologo;
            }
            return false
        },
    },
};
</script>
