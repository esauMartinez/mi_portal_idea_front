<script setup lang="ts">
import { useRoute } from 'vue-router'
import { formatearNombre } from '@/helper/formatearNombre'
import type { IClaseEmpleado } from '../interfaces/clase_empleado'
import { ref, watch } from 'vue'
import type { PropstTablaCalificaciones } from '../interfaces/props'
import type { InputNumberPassThroughAttributes } from 'primevue'
import useAlumnos from '../composables/alumno/useAlumnos'
import { verificarPermiso } from '@/guards/verificarPermiso'

defineProps<PropstTablaCalificaciones>()

const empleados = ref<IClaseEmpleado[]>([])
const { params } = useRoute()
const { claseId, clase } = useAlumnos()

claseId.value = +params.id!

watch(
  clase,
  (payload) => {
    if (payload.claseEmpleado) {
      empleados.value = payload.claseEmpleado.map((x) => ({ ...x }))
    }
  },
  { immediate: true },
)

const verificarCalificacion = (empleado: number, e: InputNumberPassThroughAttributes) => {
  empleados.value.forEach((x) => {
    if (x.empleadoId === empleado) {
      if (e.target.value >= 80) {
        x.aprobado = true
      } else {
        x.aprobado = false
      }
    }
    return x
  })
}
</script>

<template>
  <v-datatable
    :value="empleados"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
  >
    <template #header>
      <div class="grid grid-cols-12 items-center">
        <div class="col-span-7">
          <span class="text-lg! font-bold">
            {{ clase.clase?.curso?.nombre }}
          </span>
        </div>
      </div>
    </template>
    <template #empty>
      <span>El curso no cuenta con requerimientos.</span>
    </template>
    <template #loading>
      <v-progressspinner />
    </template>

    <v-column field="empleado.idUsuario" header="ID Usuario" sortable />
    <v-column header="Nombre">
      <template #body="{ data }: { data: IClaseEmpleado }">
        {{ formatearNombre(data.empleado!) }}
      </template>
    </v-column>

    <v-column header="Comentarios" :style="{ width: '300px' }">
      <template #body="{ data }: { data: IClaseEmpleado }">
        <v-textarea fluid v-model="data.comentarios" :disabled="clase.clase.calificada" />
      </template>
    </v-column>
    <v-column header="Calificacion" :style="{ width: '200px' }">
      <template #body="{ data }: { data: IClaseEmpleado }">
        <v-inputnumber
          fluid
          :min="0"
          :max="100"
          placeholder="Puntos"
          v-model="data.calificacion"
          @keyup="verificarCalificacion(data.empleadoId, $event)"
          :disabled="clase.clase.calificada"
        />
      </template>
    </v-column>
    <v-column header="Estatus" :style="{ width: '150px' }">
      <template #body="{ data }: { data: IClaseEmpleado }">
        <v-tag
          :value="data.aprobado ? 'Acreditado' : 'No acreditado'"
          :severity="data.aprobado ? 'success' : 'danger'"
          class="w-full!"
        />
      </template>
    </v-column>

    <template #footer>
      {{ clase.clase?.fechaInicio }} {{ clase.clase?.horaInicio }} //
      {{ clase.clase?.fechaFinalizacion }}
      {{ clase.clase?.horaFinalizacion }}
    </template>
  </v-datatable>

  <div class="flex justify-end gap-3 mt-3">
    <v-button
      label="Cancelar"
      icon="pi pi-times"
      text
      severity="danger"
      size="small"
      @click="cancelar"
    />

    <router-link
      :to="{ name: 'subir-archivos-clase', params: { id: clase.clase?.id } }"
      v-if="!clase.clase?.archivos && verificarPermiso('Clases.Subir.Archivos')"
    >
      <v-button label="Subir archivos" size="small" icon="pi pi-file" />
    </router-link>

    <v-button
      label="Guardar calificaciones"
      icon="pi pi-save"
      @click="guardarCalificaciones(empleados)"
      size="small"
      v-if="!clase.clase?.calificada"
      :loading="pendiente"
    />
  </div>

  <router-view></router-view>
</template>

<style scoped></style>
