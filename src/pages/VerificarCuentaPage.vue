<script setup lang="ts">
import useVerificar from '@/components/auth/composables/useVerificar'
import { useRoute } from 'vue-router'

const { verificarMutation, isPending } = useVerificar()

const { query } = useRoute()
const token = query.token as string

const submit = () => {
  verificarMutation.mutate(token)
}
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <v-button
      label="Da click para verificar cuenta de usuario"
      :loading="isPending"
      @click="submit"
    />
  </div>
</template>

<style scoped></style>
