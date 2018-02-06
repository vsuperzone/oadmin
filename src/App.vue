<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: 'App',
  components: {
    'o-menu': Menu
  }
}
</script>

<style>
html, body, #app {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
