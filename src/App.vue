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
html, body {
  margin: 0;
  background: #f6f6f6;
}
</style>
