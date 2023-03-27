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
          <form v-if="paciente" @submit.prevent="actualizacionPaciente(paciente)">
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
                  <p class="ml-1">¿Posee Alergia a algun medicamento?</p>
                  <el-select v-model="paciente.alergico_algun_tratamiento" placeholder="¿ Alergia a algun medicamento?" class="w-full">
                    <el-option label="Si" :value="true"></el-option>
                    <el-option label="No" :value="false"></el-option>
                  </el-select>
                </label>
              </div>

              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">Dirección</p>
                  <el-input placeholder="Direccion del Paciente" v-model="paciente.direccion_paciente"></el-input>
                </label>
              </div>
              <div class="w-11/12">
                <el-divider>Datos Adicionales</el-divider>
              </div>
              <div class="w-full md:w-1/2 lg:w-2/5 px-2 mb-3 py-1">
                <label>
                  <p class="ml-1">¿ Esta usted en tratamiento ?</p>
                    <el-radio v-model="paciente.esta_tratamiento" label="true">SI</el-radio>
                     <el-radio v-model="paciente.esta_tratamiento" label="false">NO</el-radio>
                </label>
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
      this.obtenerDatosPaciente(this.$route.params.ID);
    },
    data() {
      return {
        loading: false,
      };
    },
    methods: {
      async actualizacionPaciente(pacienteDatos) {
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
          console.clear();
        }
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
