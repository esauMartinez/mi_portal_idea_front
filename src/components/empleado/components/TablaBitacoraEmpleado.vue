<script setup lang="ts">
import { useRoute } from 'vue-router'
import useBitacoraEmpleado from '../composables/useBitacoraEmpleado'
import type { IBitacoraEmpleado } from '../interfaces/bitacora'

const { params } = useRoute()
const { data: bitacora } = useBitacoraEmpleado(+params.id!)
</script>
<template>
  <v-datatable
    :value="bitacora"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
  >
    <template #empty> No hay bitacora de este empleado </template>

    <v-column field="id" header="ID"></v-column>
    <v-column field="fecha" header="Fecha"></v-column>
    <v-column field="evento" header="Evento">
      <template #body="{ data }: { data: IBitacoraEmpleado }">
        <v-tag :value="data.evento.toUpperCase()" class="w-full" />
      </template>
    </v-column>
    <v-column header="Comentarios">
      <template #body="{ data }: { data: IBitacoraEmpleado }">
        {{ data.descripcion }}
      </template>
    </v-column>
    <v-column>
      <template #body="{ data }: { data: IBitacoraEmpleado }">
        {{ data.empleadoEvento?.primerNombre }} {{ data.empleadoEvento?.segundoNombre }}
        {{ data.empleadoEvento?.apellidoPaterno }} {{ data.empleadoEvento?.apellidoMaterno }}
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
