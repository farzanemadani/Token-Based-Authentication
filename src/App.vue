<template>
  <div class="flex flex-col bg-weather-primary h-[50px]">
    <AppNav/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppNav from './components/AppNav.vue';
export default defineComponent({
  name: 'App',
  components:{
    AppNav,
  },
  setup() {
 
  }
})
</script>

<style scoped>
</style>
