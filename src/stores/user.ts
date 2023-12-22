import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  // initial state
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  // actions
  actions: {
    // register a new user
    async register(formData : any ) {
        // create a user object
       // console.log('user');
        const user = {...formData };
        // send the user object to the server using axios
        try {
           // console.log('user', user);
          // make a post request to the register endpoint
          const response = await axios.post('http://localhost:3000/register', user);
          const data = response.data;
          if (response.status) {
            // show a success message
            console.log('sucsses');
            this.setUser(data);
            this.isLoggedIn = true;
          } else {
            // show an error message
            console.log('data.message', data.message);
          }
        } catch (error) {
          // handle the error
          console.error(error);
          // show an error message
        //   alert('Something went wrong');
        }
    },
    async login(formData : any ) {
      // create a user object
     // console.log('user');
      const user = {...formData };
      // send the user object to the server using axios
      try {
        //  console.log('user', user);
        // make a post request to the register endpoint
        const response = await axios.post('http://localhost:3000/login', user);
        const data = response.data;
        if (response.status) {
          // show a success message
          console.log('sucsses');
          this.setUser(data)
          this.isLoggedIn = true;
        } else {
          // show an error message
          console.log('data.message', data.message);
        }
      } catch (error) {
        // handle the error
        console.error(error);
        // show an error message
      //   alert('Something went wrong');
      }
    },
    async logout(isLoggedIn: any){
      if(isLoggedIn){
         this.user = null;
         localStorage.removeItem('user');
         axios.defaults.headers.common['Authorization'] = null;
         this.isLoggedIn = false;
      }
    },
    setUser(userData: any) {
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        this.user = userData;
        console.log('this.user', this.user);
    },
    onInit() {
      console.log('Initializing user store');
      const storedUser = localStorage.getItem('user');
      console.log('Stored token:', storedUser);
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Retrieve the token from localStorage and set the user store state
        this.setUser({ token: parsedUser.token });
        this.isLoggedIn = true;
        console.log('User store initialized with token:', storedUser);
      } else {
        console.log('No token found in localStorage');
      }
    },
  },
  // getters
  getters: {
   // isLoggedIn: (state) => state.user !== null
  }
})