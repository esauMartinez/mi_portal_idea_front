<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import TablaClases from '../components/TablaClases.vue'

const visible = ref<boolean>(true)

const cancelar = () => {
  visible.value = false
}
</script>

<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '50%' }"
    v-on:after-hide="router.back()"
    header="Enlazar clases"
    :modal="true"
  >
    <TablaClases :cancelar="cancelar" />
  </v-dialog>
</template>

<style scoped></style>
