<template>
  <div class="bg-white md:mx-48 mt-14 mb-8">
    <div class="text-center mb-3 p-2">
      <h1 class="font-extrabold text-lg">Recuperar contraseña</h1>
      <p class="mt-2">
        No te preocupes, puedes recuperar tú <br />
        contraseña a continuación
      </p>
    </div>
    <br />
    <form action="#" class="flex flex-wrap mx-5">
      <div class="w-full mb-3">
        <input type="text" class="w-full px-3 py-2.5 rounded-lg border" placeholder="¿Pregunta 1?"/>
      </div>
      <div class="w-full mb-3">
        <input type="text" class="w-full px-3 py-2.5 rounded-lg border" placeholder="¿Pregunta 2?"/>
      </div>
      <div class="w-full mb-3">
        <input type="text" class="w-full px-3 py-2.5 rounded-lg border" placeholder="¿Pregunta 3?"/>
      </div>
      <div class="w-full mt-2">
        <button class=" block w-full py-3 rounded-lg bg-verdiAnderson text-white transition duration-500 transform hover:-translate-y-1 hover:scale-100">Continuar</button>
      </div>
    </form>
	<br>
	
    <div class="text-center">
		<img alt="Vue logo" width="20px" src="@/assets/flechaRegreso.png" class="inline pl-1">
		<router-link to="/auth/login" class="text-blue-600 mt-7">  Ir a inicio de sesión</router-link>
	</div>
  </div>
</template>
<script>
export default {
  name: "recuperar-auth",
};
</script>
