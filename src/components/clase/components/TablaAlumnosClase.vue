<script setup lang="ts">
import { useRoute } from 'vue-router'
import useAlumnos from '../composables/alumno/useAlumnos'
import { formatearNombre } from '@/helper/formatearNombre'
import type { IEmpleado } from '@/components/empleado/interfaces/empleado'
import useEliminar from '../composables/alumno/useEliminar'
import type { IClaseEmpleado } from '../interfaces/clase_empleado'
import BusquedaEmpleados from '@/components/empleado/components/BusquedaEmpleados.vue'
import useCrear from '../composables/alumno/useCrear'
import { verificarPermiso } from '@/guards/verificarPermiso'
import useClase from '../composables/useClase'

const { params } = useRoute()
const { claseId, clase: alumnos, isLoading } = useAlumnos()
const { crearMutation, isPending } = useCrear()
const { eliminar } = useEliminar()
const { clase } = useClase(+params.id!)
claseId.value = +params.id!

const agregarAlumno = (payload: IEmpleado) => {
  crearMutation.mutate({
    claseId: clase.value.id,
    empleadoId: payload.id,
  })
}
</script>

<template>
  <v-datatable
    :value="alumnos.claseEmpleado"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    :loading="isLoading"
  >
    <template #header>
      <div class="grid grid-cols-12 items-center">
        <div class="col-span-7">
          <span class="text-xl! font-bold">Alumnos</span>
        </div>
        <div class="col-span-5">
          <BusquedaEmpleados
            :seleccionarEmpleado="agregarAlumno"
            :pendiente="isPending"
            :instructor="false"
            v-if="clase.estatus == 'pendiente' && verificarPermiso('Clases.Agregar.Alumno')"
          />
        </div>
      </div>
    </template>

    <template #empty>
      <span>No hay alumnos para esta clase.</span>
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
      <template #body="{ data }: { data: IClaseEmpleado }">
        <span>
          {{ formatearNombre(data.empleado!) }}
        </span>
      </template>
    </v-column>
    <!-- v-if="
        clase.clase.estatus !== 'en curso' &&
        clase.clase.estatus !== 'finalizada' &&
        verificarPermiso('Clases.Eliminar.Alumno')
      " -->
    <v-column>
      <template #body="{ data }: { data: IEmpleado }">
        <div class="flex justify-center">
          <v-button icon="pi pi-trash" severity="danger" size="small" @click="eliminar(data.id)" />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
