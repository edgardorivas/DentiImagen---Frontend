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
          <form v-if="paciente" @submit.prevent="actualizacionPaciente">
            {{paciente}}
            <div class="flex flex-wrap justify-around">
              <div class="w-11/12">
                <el-divider>Datos del Paciente</el-divider>
              </div>
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Nombre</p>
                  <el-input placeholder="Nombre del Paciente" v-model="paciente.nombre_paciente"></el-input>
                </label>
              </div>
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Apellido</p>
                  <el-input placeholder="Apellido del Paciente" v-model="paciente.apellido_paciente"></el-input>
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
                  <el-input placeholder="Cedula del Paciente" v-model="paciente.cedula_paciente"></el-input>
                </label>
              </div>
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Sexo</p>
                  <el-input placeholder="Genero del Paciente" v-model="paciente.genero_paciente"></el-input>
                </label>
              </div>
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Telefono</p>
                  <el-input placeholder="Telefono del Paciente" v-model="paciente.telefono_paciente"></el-input>
                </label>
              </div>
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Correo Electronico</p>
                  <el-input placeholder="Correo del Paciente" v-model="paciente.correo_paciente"></el-input>
                </label>
              </div>
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Referido por</p>
                  <el-input placeholder="Nombre del tipo de material" v-model="paciente.referido_por"></el-input>
                </label>
              </div>
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Motivo de la Consulta al Registrarse</p>
                  <el-input placeholder="Motivo de la Consulta" v-model="paciente.motivo_consulta"></el-input>
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
                  <p class="ml-1">Dirección</p>
                  <el-input placeholder="Direccion del Paciente" v-model="paciente.direccion_paciente"></el-input>
                </label>
              </div>
              <div v-if="trabajadores && trabajadores.data" class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Odontologo Preferencial</p>
                  <el-select v-model="paciente.trabajadorOdontologo" placeholder="Odontologo" class="w-full" >
                    <el-option v-for="item in trabajadores.data" :key="item.id_recurso" :label="item.nombre" :value="item.id"></el-option>
                  </el-select>
                </label>
              </div>
              <div class="w-11/12">
                <el-divider>Datos Adicionales</el-divider>
              </div>
              <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿ Esta usted en tratamiento ?</p>
                  <el-select v-model="paciente.estaTratamiento" placeholder="Tratamiento" class="w-full">
                    <el-option label="Si" value="true"></el-option>
                    <el-option label="No" value="false"></el-option>
                  </el-select>
                </label>
              </div>
              <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿Posee Alergia a algun medicamento?</p>
                  <el-select v-model="paciente.alergicoAlgunMedicamento" placeholder="¿ Alergia a algun medicamento?" class="w-full">
                    <el-option label="Si" value="true"></el-option>
                    <el-option label="No" value="false"></el-option>
                  </el-select>
                </label>
              </div>
              <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿ Sufre de presion arterial ?</p>
                  <el-select v-model="paciente.sufreTensionAlterial" placeholder="¿ Sufre de presion arterial ?" class="w-full">
                    <el-option label="Si" value="true"></el-option>
                    <el-option label="No" value="false"></el-option>
                  </el-select>
                </label>
              </div>
              <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿ Diabetico ?</p>
                  <el-select v-model="paciente.diabetico" placeholder="¿ Diabetico ?" class="w-full">
                    <el-option label="Si" value="true"></el-option>
                    <el-option label="No" value="false"></el-option>
                  </el-select>
                </label>
              </div>
              <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿ Antecedentes familiares de diabetes ?</p>
                  <el-select v-model="paciente.antecedentesDiabetico" placeholder="¿ Antecedentes familiares de diabetes ?" class="w-full">
                    <el-option label="Si" value="true"></el-option>
                    <el-option label="No" value="false"></el-option>
                  </el-select>
                </label>
              </div>
              <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿ Ha sufrido de Hepatitis ?</p>
                  <el-select v-model="paciente.sufridoHepatitis" placeholder="¿ Ha sufrido de Hepatitis ?" class="w-full">
                    <el-option label="Si" value="true"></el-option>
                    <el-option label="No" value="false"></el-option>
                  </el-select>
                </label>
              </div>
              <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿ Ha sufrido de Herpes ?</p>
                  <el-select v-model="paciente.sufridoHerpes" placeholder="¿ Ha sufrido de Herpes ?" class="w-full">
                    <el-option label="Si" value="true"></el-option>
                    <el-option label="No" value="false"></el-option>
                  </el-select>
                </label>
              </div>
              <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿ Ha sufrido de Afecciones cardiacas ?</p>
                  <el-select v-model="paciente.efeccionesCardiacas" placeholder="Tratamiento" class="w-full">
                    <el-option label="Si" value="true"></el-option>
                    <el-option label="No" value="false"></el-option>
                  </el-select>
                </label>
              </div>
              <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿ Problemas con la Anestecia ?</p>
                  <el-select v-model="paciente.sufridoAnestecia" placeholder="¿ Problemas con la Anestecia ?" class="w-full">
                    <el-option label="Si" value="true"></el-option>
                    <el-option label="No" value="false"></el-option>
                  </el-select>
                </label>
              </div>
              <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿ Es usted propenso a las Hemorragias ?</p>
                  <el-select v-model="paciente.propensoHemorragias" placeholder="¿ Es usted propenso a las Hemorragias ?" class="w-full">
                    <el-option label="Si" value="true"></el-option>
                    <el-option label="No" value="false"></el-option>
                  </el-select>
                </label>
              </div>
              <div class="w-full md:w-1/4 lg:w-3/12 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿ Ha convulsionado alguna vez ?</p>
                  <el-select v-model="paciente.convulcionAlgunaVez" placeholder="¿ Ha convulsionado alguna vez ?" class="w-full">
                    <el-option label="Si" value="true"></el-option>
                    <el-option label="No" value="false"></el-option>
                  </el-select>
                </label>
              </div>
            </div>
            <br>
            <div class="flex flex-wrap justify-around">
              <button type="submit" :disabled="loading" class="w-full md:w-1/3 bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100 uppercase py-2 rounded-md">
                Guardar Cambios
              </button>
            </div>
          </form>
          <div v-else>
            <div class="text-center mt-5 py-5">
              <h1>No encontrado :(</h1>
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
    name: "paciente-edit",
    metaInfo: {
      title: config.frontend.title,
      titleTemplate: "%s | Detalles del Paciente",
    },
    created() {
      this.$store.dispatch("obtenerListaDeUsuarios");
      this.obtenerDatosPaciente(this.$route.params.ID);
    },
    data() {
      return {
        loading: false,
      };
    },
    methods: {
      async actualizacionPaciente() {
        try {
          this.$store.dispatch("getLoadingApp", true);
          this.loading = true;
          const token = localStorage.getItem("token_acess");
          console.log(this.paciente);
          const request = await axios({
            method: "POST",
            baseURL: config.backend.baseURL,
            url: "/paciente/ingresar",
            headers: {
              ["auth-token"]: token,
            },
            data: this.paciente,
          });
          console.log(request);
          this.$store.dispatch("getLoadingApp", false);
          this.loading = false;
          this.$message({
            message: "Registrado Exitosamente",
            type: "success",
          });
          this.$router.push({ path: "/admin/" });
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
      cambiar() {
        this.segundaParte = !this.segundaParte;
      },
      obtenerDatosPaciente(ID) {
        this.$store.dispatch("obtenerPacienteId", {
          id: ID,
        });
      }
    },
    computed: {
      trabajadores() {
        return this.$store.getters.getusuarios;
      },
      paciente() {
        return this.$store.getters.getPaciente;
      }
    },
  };
</script>
