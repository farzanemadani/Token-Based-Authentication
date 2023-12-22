<template>
    <div class="mt-5">
      <h1 class="text-center">login form</h1>
      <form class="flex flex-col w-1/2 mx-auto" @submit.prevent="submitForm"> 
        <label for="email">
          Email:
        </label>
        <input class="border border-blue-500 rounded h-[40px]" v-model.trim="email" type="email" name="email"/>
        <label for="password">
          Password:
        </label>
        <input class="border border-blue-500 rounded h-[40px]" v-model.trim="password" type="password" name="password"/>
        <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded h-[40px] mt-5" type="submit" name="button">
          login
        </button>
        dont have account ?
        <RouterLink to="/register">register</RouterLink>

      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { useUserStore } from '../stores/user';
  import { defineComponent, ref } from 'vue';
  import { useRouter,RouterLink,RouterView } from 'vue-router';

  
  export default defineComponent({
    setup (Props) {
    const email = ref('');
    const password = ref('');
    const user = useUserStore();
    const router = useRouter();

    
    async function submitForm(){
      // get the form data as an object
      const formData = {
          email: email.value,
          password: password.value
        };
        // call the user.register action with the form data
        await user?.login(formData);
        router.push('/dashboard');

    }
    

      return {
          email,
          password,
          submitForm
      }
    }
  })


  </script>
  
  <style scoped>
  
  </style>
  