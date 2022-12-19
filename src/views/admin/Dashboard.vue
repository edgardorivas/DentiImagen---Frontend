<template>
  <div>
    <div class="">
      <div class="flex flex-wrap mt-4 ">
        <div class="w-full mb-12 xl:mb-0 px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            Contenido
          </div>
        </div>
      </div>  
    </div>
  </div>
  
</template>
<script>
  import config from './../../config';
  export default {
    name: "dashboard-page",
    metaInfo: {
      title: config.frontend.title,
      titleTemplate: '%s | Inicio',
    },
  };
</script>
