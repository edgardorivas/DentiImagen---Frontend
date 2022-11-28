<template>
  <div class="container m-auto mt-11">
    <div class="flex flex-row " id="container-auth">
      <div class=" justify-center ">
        <div class=" justify-center w-1/3 m-auto">
          <img alt="Vue logo" width="300px" src="@/assets/logotipoEmpresa.png">
        </div>
        <router-view />
      </div>
      <div class=" justify-center flex-1 ">Imagen chida central</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'contenedor-auth'
  }
</script>
<style lang="scss">
  .container-auth {
    height: 100vw;
  }
</style>
