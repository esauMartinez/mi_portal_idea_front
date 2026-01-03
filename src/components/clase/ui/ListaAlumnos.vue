<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import TablaAlumnosClase from '../components/TablaAlumnosClase.vue'

const visible = ref<boolean>(true)
</script>

<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '50%' }"
    v-on:after-hide="router.back()"
    :header="' '"
    :modal="true"
  >
    <TablaAlumnosClase />
  </v-dialog>
</template>

<style scoped></style>
