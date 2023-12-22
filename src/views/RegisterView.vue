<template>
    <div class="mt-5">
      <h1 class="text-center">register form</h1>
      <form class="flex flex-col w-1/2 mx-auto" @submit.prevent="submitForm"> 
        <label for="name" >
          Name:
        </label>
        <input class="border border-blue-500 rounded h-[40px]" v-model.trim="name" type="text" name="name"/>
        <label for="email">
          Email:
        </label>
        <input class="border border-blue-500 rounded h-[40px]" v-model.trim="email" type="email" name="email"/>
        <label for="password">
          Password:
        </label>
        <input class="border border-blue-500 rounded h-[40px]" v-model.trim="password" type="password" name="password"/>
        <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded h-[40px] mt-5" type="submit" name="button">
          Register
        </button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { useUserStore } from '../stores/user';
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
  setup (Props) {
    const name = ref('');
    const email = ref('');
    const password = ref('');

    const user = useUserStore();
    const router = useRouter();

   // define a function for submitting the form
   async function submitForm() {
      // get the form data as an object
      const formData = {
        name: name.value,
        email: email.value,
        password: password.value
      };
      // call the user.register action with the form data
      await user?.register(formData);
      router.push('/dashboard');
    }

    return {
      name,
      email,
      password,
      user,
      submitForm
    }
  }
})


  </script>
  
  <style scoped>
  
  </style>
  