<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link
        class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
        to="/admin"
      >
        Dentimagen
      </router-link>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown />
        </li>
        <li class="inline-block relative">
          <user-dropdown />
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                to="/admin"
              >
                Dentimagen
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input
              type="text"
              placeholder="Search"
              class="border-0 px-3 py-2 h-12 border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
            />
          </div>
        </form>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link
              to="/admin/dashboard"
              class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
              exact-active-class="text-emerald-500 hover:text-emerald-600"
            >
              <i
                class="fas fa-tv mr-2 text-sm"
              ></i>
              Inicio
            </router-link>
          </li>
        </ul>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link
              to="/admin/usuarios"
              class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
              exact-active-class="text-emerald-500 hover:text-emerald-600"
            >
              <i
                class="fas fa-users mr-2 text-sm"
              ></i>
              Usuarios
            </router-link>
          </li>
        </ul>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link
              to="/admin/configuraciones"
              class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
              exact-active-class="text-emerald-500 hover:text-emerald-600"
            >
              <i
                class="fas fa-tools mr-2 text-sm"
              ></i>
              Configuraciones
            </router-link>
          </li>
        </ul>


        <!--edgardo: menu desplegable-->
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center"> 
            <el-menu
              default-active=""
              class="el-menu-vertical-demo">
              <el-submenu index="1">
                
                  <router-link slot="title"
                  to="/admin/materiales"
                  class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                  exact-active-class="text-emerald-500 hover:text-emerald-600">
                    <i class="fa-sharp fa-solid fa-syringe"></i>
                    Materiales
                  </router-link>
                
                <el-menu-item-group >
                  <el-menu-item index="1-1">
                    <router-link slot="title"
                      to="/admin/tipo-materiales"
                      class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                      exact-active-class="text-emerald-500 hover:text-emerald-600">
                        <i class="fa-sharp fa-solid fa-syringe"></i>
                        Tipos
                    </router-link>
                  </el-menu-item>
                  <!--
                  <el-menu-item index="1-2">
                    <router-link slot="title"
                      to="/admin/productos"
                      class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                      exact-active-class="text-emerald-500 hover:text-emerald-600">
                        <i class="fa-sharp fa-solid fa-syringe"></i>
                        Provedor
                    </router-link>
                  </el-menu-item>
                  -->
                </el-menu-item-group>
                
              </el-submenu>
          </el-menu> 
          </li>
        </ul>
    
        <!--fin-->
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link
              to="/admin/proveedores"
              class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
              exact-active-class="text-emerald-500 hover:text-emerald-600"
            >
            <i class="fa-sharp fa-solid fa-user"></i>
              Proveedores
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
  

<script>
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";

export default {
  name: 'side_bar',
  data() {
    return {
      collapseShow: "hidden",
    };
  },
  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },
  },
  components: {
    NotificationDropdown,
    UserDropdown,
  },
};
</script>
<style>
.el-menu{
  border:none
}
</style>
