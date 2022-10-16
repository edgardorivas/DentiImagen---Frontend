<template>
  <div class="mt-14 mb-8 bg-white md:mx-48" id="login">
    <div class="text-center mb-3">
      <h1 class="font-extrabold text-2xl">¡Bienvenido!</h1>
      <p>Por favor ingrese sus datos de acceso</p>
    </div>
    <br />
    <form class="flex flex-wrap mx-5">
      <div class="w-full mb-3">
        <input class="block w-full px-3 py-2.5 rounded-lg border" type="text" placeholder="Usuario">
      </div>
      <div class="w-full">
        <input class="block w-full px-3 py-2.5 rounded-lg border" type="password" placeholder="Contraseña">
      </div>
      <br />
      <div class="w-full mt-12">
        <button class="block w-full py-3 rounded-lg bg-verdiAnderson text-white">Iniciar sesión</button>
      </div>
    </form>
    <br />
    <br />
    <p class="text-center w-full">
      ¿Olvidaste tu contraseña?
      <router-link to="/auth/recuperar" class="text-blue-600">Recuperar ahora</router-link>
    </p>
  </div>
</template>
<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'login',
  }
</script>
<style type="scss" scoped>
  p {
    line-height: 24px;
    color: #373737;
  }
</style>
