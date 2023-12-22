<template>
    <div class="event-card">
        <span>@{{ event.time }} on {{ event.date }}</span>
        <h4>{{ event.title }}</h4>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    event: {
      type : Object,
      default : () => {
        return {}
      }
    }
  },
  setup (props) {
    const message = ref('Hello')
    const changeMessage = () => {
      message.value = 'Bye'
    }
    return {
      message,
      changeMessage
    }
  }
})
</script>

<style scoped>

</style>