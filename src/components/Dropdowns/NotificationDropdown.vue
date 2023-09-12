<template>
  <div class="relative" v-if="getNotifications">
    <el-badge class="h-full w-full" :is-dot="getNotifications.data.length">
      <a
        class="text-blueGray-500 block py-1 px-3 cursor-pointer"
        ref="btnDropdownRef"
        v-on:click="toggleDropdown($event)"
      >
        <i class="fas fa-bell text-white"></i>
      </a>
    </el-badge>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <div v-for="(notificacion, index) of getNotifications.data" :key="index">
        <div v-if="!notificacion.estado_borrado && index < 8">
          <router-link to="/admin/inventario" class="cursor-pointer">
            <p class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 border-b-2">
              <small>Alerta de bajos insumos</small>
              <br>
              El recurso {{notificacion.nombre_recurso}} tiene {{notificacion.cantidad_disponible}} Unidades.
            </p>
          </router-link>
        </div>
      </div>
      <!-- <div class="h-0 my-2 border border-solid border-blueGray-100" /> -->
      <br>
      <router-link to="/admin/inventario" class="cursor-pointer">
        <p class="text-md py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 text-center">
          Ver todo el inventario
        </p>
      </router-link>
    </div>
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";

export default {
  data() {
    return {
      dropdownPopoverShow: false,
    };
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
  computed: {
    getNotifications() {
      return this.$store.getters.getNotificaciones;
    }
  }
};
</script>
