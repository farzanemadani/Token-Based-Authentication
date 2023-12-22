import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/tailwind.css';
import { useUserStore } from './stores/user';
import axiosInstance from './axios/axios-config';


import App from './App.vue';
import router from './router';

const app = createApp(App);
axiosInstance();
// Create a Pinia instance
const pinia = createPinia();

app.use(pinia);

// Retrieve the user store instance
const userStore = useUserStore();

// Before the app is mounted, retrieve the stored token from localStorage and initialize the store
const storedUser = localStorage.getItem('user');
if (storedUser) {
  const parsedUser = JSON.parse(storedUser);
  userStore.setUser({ token: parsedUser.token });
  userStore.isLoggedIn = true;
}

app.use(router);
app.mount('#app');