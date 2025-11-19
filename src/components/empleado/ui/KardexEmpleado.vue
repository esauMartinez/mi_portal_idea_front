<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import TablaKardex from '../components/TablaKardex.vue'

const visible = ref<boolean>(true)
</script>

<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '60%' }"
    v-on:after-hide="router.back()"
    header="Kardex"
    :modal="true"
  >
    <TablaKardex />
  </v-dialog>
</template>

<style scoped></style>
