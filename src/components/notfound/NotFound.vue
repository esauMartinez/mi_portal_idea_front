<script setup lang="ts">
import router from '@/router'
</script>
<template>
  <div class="h-[100vh] w-full flex flex-col justify-center items-center">
    <i class="pi pi-eye-slash" style="font-size: 6rem"></i>
    <span class="text-5xl! font-bold mt-5">¡Lo sentimos!</span>
    <span class="text-5xl! font-bold mt-5">La pagina a la que intentas acceder no existe.</span>
    <v-button label="Regresar" icon="pi pi-undo" class="mt-5" @click="router.back" />
  </div>
</template>

<style scoped></style>
