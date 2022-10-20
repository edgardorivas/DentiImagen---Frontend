<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  import config from './config';
  export default {
    metaInfo: {
      title: config.frontend.titulo,
      titleTemplate: '%s'
    },
  }
</script>
