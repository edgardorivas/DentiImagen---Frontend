<template>
  <!-- Navbar -->
  <nav
    class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
  >
    <div
      class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
    >
      <!-- Brand -->
      <el-breadcrumb class="text-white text-md uppercase hidden lg:inline-block font-semibold" separator-class="el-icon-arrow-right">
        <template v-for="(path) of ubicacion">
          <el-breadcrumb-item :key="path.path" v-if="path.path != '/admin/dashboard'" :to="{ path: path.path }" class="text-white">
            {{path.name || 'Inicio'}}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
        <notification-dropdown class="mx-2 hover:border-white border-2 border-transparent h-full rounded-full" />
        <user-dropdown class="hover:border-white border-2 border-transparent rounded-md" />
      </ul>
    </div>
  </nav>
</template>

<script>
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";

export default {
  components: {
    UserDropdown,
    NotificationDropdown,
  },
  computed: {
    ubicacion () {
      return this.$route.matched;
    }
  }
};
</script>
<style lang="scss">
  .el-breadcrumb__item {
    span {
      color: white !important;
    }
    i {
      color: black;
    }

    span, i {
      font-size: 14px;
    }
  }
</style>
