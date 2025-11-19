<script setup lang="ts">
import useJerarquia from '../composables/useJerarquia'
import { useRoute } from 'vue-router'

const { params } = useRoute()

const { arbol, id, isLoading, error, seleccionarid } = useJerarquia()
id.value = +params.id!
</script>

<template>
  <div>
    <!-- Estado de carga -->
    <div v-if="isLoading" class="p-4 text-center">
      <v-skeleton class="mb-2"></v-skeleton>
      <v-skeleton width="10rem" class="mx-auto"></v-skeleton>
      <p class="text-gray-500 mt-2">Cargando jerarquía...</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="p-4 text-center text-red-600">
      <v-icon name="fa-exclamation-triangle" class="mb-2"></v-icon>
      <p>Error al cargar la jerarquía</p>
      <p class="text-sm text-gray-500">{{ error.message }}</p>
    </div>

    <!-- Sin datos -->
    <div v-else-if="!arbol" class="p-4 text-center text-gray-500">
      <v-icon name="fa-users" class="mb-2"></v-icon>
      <p>No se encontró jerarquía para este empleado</p>
    </div>

    <!-- Contenido principal -->
    <v-organizationchart v-else :value="arbol">
      <template #default="slotProps">
        <div class="flex flex-col justify-center items-center gap-3">
          <span>{{ slotProps.node.empresa }}</span>
          <span>{{ slotProps.node.label }}</span>
          <v-button
            icon="pi pi-caret-down"
            size="small"
            @click="seleccionarid(slotProps.node.key)"
            v-if="!slotProps.node.principal"
          />
        </div>
      </template>
    </v-organizationchart>
  </div>
</template>
<style scoped></style>
