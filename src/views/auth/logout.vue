<template>
  <div>
    <div class="text-center mt-5">
      <h5 class="text-5xl">Cerrando Sesión...</h5>
      <h3>Si no has cerrado sesión todavía, puedes cerrar clickeando
        <b @click="singOut" class="uppercase cursor-pointer underline">Aquí</b>
      </h3>
    </div>
  </div>
</template>
<script>
  import config from './../../config'
  export default {
    name: 'logout-auth',
    metaInfo: {
      title: config.frontend.titulo,
      titleTemplate: '%s | Autenticador'
    },
    created () {
      this.singOut()
    },
    methods: {
      async singOut () {
        const token = localStorage.getItem('token_acess');
        if (token) {
          localStorage.clear()
          this.$router.push('/auth')
        } else {
          this.$message({
            showClose: true,
            message: 'Ya cerraste sesión.',
          })
          this.$router.push('/auth')
        }
      }
    }
  }
</script>
