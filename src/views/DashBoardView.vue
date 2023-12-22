<template>
    <div>
        <h1>Dashboard</h1>
        <template v-if="!isLoading">
             <EventCard v-for="event in events" :key="event.id" :event="event"/>
        </template>
        <p v-else>
            loading events
        </p>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent ,onMounted, ref } from 'vue'
import EventCard from '@/components/EventCard.vue';

export default defineComponent({
  props: {
    event: {
      type : Object,
      default : () => {
        return {}
      }
    }
  },
  components:{
    EventCard,
  },
  setup () {
    
   let events = ref([]);
   let isLoading = ref(true);
   const userString = localStorage.getItem('user');

    onMounted( async () => {
      if (userString) {
        const user = JSON.parse(userString);
        try{
          const response = await axios.get('http://localhost:3000/dashboard');
          events.value = response.data.events;
          isLoading.value = false;
        }catch(err: any ){
          console.log('err',err);
        }
    }
    });

    // return the data properties so they can be used in the template
    return { events, isLoading };
  }
})
</script>

<style scoped>

</style>