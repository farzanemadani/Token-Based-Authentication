<template>
    <div class="home">
        <h1>welcome to App!</h1>
        {{ isLoggedIn }}
        <div v-if="!isLoggedIn">
            <span> to use this app you need </span>
            <RouterLink to="/login">login</RouterLink>
            or 
            <RouterLink to="/register">register</RouterLink>
        </div>
        <div v-else>
            log out
        </div>
    </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useUserStore } from '../stores/user';
import { defineComponent,computed, ref } from 'vue';

export default defineComponent({
    setup (Props) {
        const user = useUserStore();
        const isLoggedIn = computed(() => user.isLoggedIn);

        return {
            user,
            isLoggedIn
        }
    }
  })

</script>

<style scoped>

</style>