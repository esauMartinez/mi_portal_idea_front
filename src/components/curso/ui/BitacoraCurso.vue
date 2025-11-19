<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import TablaBitacora from '../components/TablaBitacora.vue'

const visible = ref<boolean>(true)
</script>
<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '40%' }"
    v-on:after-hide="router.back()"
    header="Bitacora curso"
    :modal="true"
  >
    <TablaBitacora />
  </v-dialog>
</template>

<style scoped></style>
