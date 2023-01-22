<template>
  <div>
    <div class="flex justify-center" id="container-auth">
      <div class="flex flex-col h-screen">
        <div class="md:mt-40">
          <div class="justify-center w-1/3 m-auto">
            <img alt="Vue logo" width="300px" src="@/assets/logotipoEmpresa.png">
          </div>
          <router-view />
        </div>
      </div>
      <div class="hidden md:inline-block justify-center flex-1 bg-gradient-to-r from-verdiAnderson to-blue-500 h-screen"></div>
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
