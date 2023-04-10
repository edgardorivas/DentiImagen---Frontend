<template>
  <div>
    <div class="flex justify-center" id="container-auth">
      <div class="flex flex-col">
        <div class="md:mt-40">
          <div class="justify-center w-1/3 m-auto">
            <img alt="Vue logo" width="300px" src="@/assets/logotipoEmpresa.png">
          </div>
          <router-view />
        </div>
      </div>
      <div class="hidden md:inline-block justify-center max-w-md bg-gradient-to-r from-verdiAnderson to-blue-500 h-auto">
        <div class="flex h-screen justify-center items-center">
          <img src="../../assets/img/dentistas.svg" alt="dentistas">
        </div>
      </div>
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
    height: 100%;
  }
</style>
