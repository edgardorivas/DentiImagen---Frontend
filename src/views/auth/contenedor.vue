<template>
  <div class="container-fluid">
    <div class="row justify-content-center align-items-center g-2" id="container-auth">
      <div class="col justify-content-center">
        <div class="d-flex flex-row justify-content-center">
          <img alt="Vue logo" width="300px" src="@/assets/logotipoEmpresa.png">
        </div>

        <router-view />
      </div>
      <div class="col justify-content-center">Imagen chida central</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'contenedor-auth'
  }
</script>
<style lang="scss">
  #container-auth {
    height: 100vh;
  }
</style>
