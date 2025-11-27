<script setup lang="ts">
import { useRoute } from 'vue-router'
import useInstructores from '../composables/instructor/useInstructores'
import { formatearNombre } from '@/helper/formatearNombre'
import { verificarPermiso } from '@/guards/verificarPermiso'
import useEliminar from '../composables/instructor/useEliminar'
import type { IClaseInstructor } from '../interfaces/clase_instructor'
import BusquedaEmpleados from '@/components/empleado/components/BusquedaEmpleados.vue'
import useCrear from '../composables/instructor/useCrear'
import type { IEmpleado } from '@/components/empleado/interfaces/empleado'
import useClase from '../composables/useClase'

const { params } = useRoute()

const { claseId, instructores, isLoading } = useInstructores()
const { clase } = useClase(+params.id!)
const { eliminar } = useEliminar()
const { crearMutation, isPending } = useCrear()

claseId.value = +params.id!

const agregarInstructor = (payload: IEmpleado) => {
  crearMutation.mutate({
    claseId: clase.value.id,
    empleadoId: payload.id,
  })
}
</script>

<template>
  <v-datatable
    :value="instructores"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    :loading="isLoading"
  >
    <template #header>
      <div class="grid grid-cols-12 gap-3 items-center">
        <div class="col-span-7">
          <span class="text-xl! font-bold">Instructores</span>
        </div>
        <div class="col-span-5">
          <BusquedaEmpleados
            :seleccionarEmpleado="agregarInstructor"
            :pendiente="isPending"
            :instructor="true"
            v-if="clase.estatus == 'pendiente' && verificarPermiso('Clases.Agregar.Instructor')"
          />
        </div>
      </div>
    </template>

    <template #empty>
      <span>No hay instructores para esta clase.</span>
    </template>
    <template #loading>
      <div class="flex flex-col items-center justify-center">
        <v-progressspinner />
        <span class="text-3xl! text-white">Cargando datos...</span>
      </div>
    </template>

    <v-column field="empleado.id" header="ID" sortable />
    <v-column field="empleado.idUsuario" header="ID Usuario" sortable />
    <v-column field="empleado.primerNombre" header="Nombre" sortable>
      <template #body="{ data }: { data: IClaseInstructor }">
        <span>
          {{ formatearNombre(data.empleado!) }}
        </span>
      </template>
    </v-column>
    <v-column
      v-if="
        clase.estatus !== 'en curso' &&
        clase.estatus !== 'finalizada' &&
        verificarPermiso('Clases.Eliminar.Instructor')
      "
    >
      <template #body="{ data }: { data: IClaseInstructor }">
        <div class="flex justify-center">
          <v-button icon="pi pi-trash" severity="danger" size="small" @click="eliminar(data.id!)" />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
