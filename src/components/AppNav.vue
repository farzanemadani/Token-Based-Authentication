<template>
    <div  class="container px-0">
    <div class="flex justify-between items-center">
      <nav class="py-3 flex gap-2">
        <RouterLink class="" to="/">Home</RouterLink>
        <RouterLink to="/about">about</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
      </nav>
      <button v-if="isLoggedIn" @click="exit">log out</button>
      <RouterLink v-else to="/login" class="button">login</RouterLink>
    </div>

        <RouterView/>
    </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '../stores/user';
import { defineComponent,computed, ref } from 'vue';

export default defineComponent({
  setup(Props) {
    const user = useUserStore();
    const isLoggedIn = computed(() => user.isLoggedIn);
    
    const exit = async (isLoggedIn: any) => {
      console.log('1');
      await user?.logout(isLoggedIn);
    };
    
    return {
      user,
      isLoggedIn,
      exit
    };
  }
})

</script>

<style scoped>

</style>