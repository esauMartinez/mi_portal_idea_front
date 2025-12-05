<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

interface Props {
  titulo: string
}

defineProps<Props>()

const authSotore = useAuthStore()
const { nombreEmpleado, autenticado } = storeToRefs(authSotore)
</script>

<template>
  <v-menubar :model="[]" v-if="autenticado" class="mb-3">
    <template #start>
      <span class="text-xl!">{{ titulo }}</span>
    </template>
    <template #end>
      <div class="flex items-center gap-2 p-2">
        <span class="text-xl! text-[#283d9a]!">{{ nombreEmpleado }}</span>
      </div>
    </template>
  </v-menubar>
</template>

<style scoped></style>
