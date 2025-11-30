<script setup lang="ts">
import { useRoute } from 'vue-router'
import { formatearNombre } from '@/helper/formatearNombre'
import useBitacora from '../composables/useBitacora'
import type { IBitacoraModelo } from '../interfaces/bitacora_modelo'
const { params } = useRoute()
const { data: bitacora } = useBitacora(+params.id!)
</script>

<template>
  <v-datatable
    :value="bitacora"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
  >
    <template #empty> No hay bitacora de esta area tematica. </template>

    <v-column field="id" header="ID"></v-column>
    <v-column field="fecha" header="Fecha"></v-column>
    <v-column field="evento" header="Evento">
      <template #body="{ data }: { data: IBitacoraModelo }">
        <v-tag :value="data.evento.toUpperCase()" class="w-full" />
      </template>
    </v-column>
    <v-column>
      <template #body="{ data }: { data: IBitacoraModelo }">
        {{ formatearNombre(data.empleado) }}
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
