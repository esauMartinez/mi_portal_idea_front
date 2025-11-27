<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import TablaClasesPadres from '../components/TablaClasesPadres.vue'

const visible = ref<boolean>(true)

// const cancelar = () => {
//   visible.value = false
// }
</script>

<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '50%' }"
    v-on:after-hide="router.back()"
    header="Clases padres"
    :modal="true"
  >
    <TablaClasesPadres />
  </v-dialog>
</template>

<style scoped></style>
