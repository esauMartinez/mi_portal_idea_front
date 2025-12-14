<script setup lang="ts">
import type { IClaseEmpleado } from '@/components/clase/interfaces/clase_empleado'
import type { PropsTabla } from '../interface/propsTabla'
import { computed, ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import useModificarMiCurso from '../composables/useModificarMicurso'

const { misCursos } = defineProps<PropsTabla>()
const { modificarMutation } = useModificarMiCurso()

const certificadosSeleccionados = ref<IClaseEmpleado[]>([])

const descargar = () => {
  certificadosSeleccionados.value.forEach((x) => {
    console.log(x.claseId)
    console.log(x.calificacion)
    console.log(x.aprobado)
  })
}

const selectableItems = computed(() => {
  return misCursos?.filter((item) => item.aprobado && item.clase!.calificada) || []
})

const allSelected = computed(() => {
  if (selectableItems.value.length === 0) return false
  return selectableItems.value.every((item) =>
    certificadosSeleccionados.value.some((selected) => selected.claseId === item.claseId),
  )
})

const estatusClase = (estatus: string) => {
  const estatusSplit = estatus.split('')
  estatusSplit[0] = estatusSplit[0]!.toUpperCase()
  return estatusSplit.join('')
}

const isSelected = (data: IClaseEmpleado) => {
  return certificadosSeleccionados.value.some((item) => item.claseId === data.claseId)
}

const toggleSelection = (data: IClaseEmpleado) => {
  const index = certificadosSeleccionados.value.findIndex((item) => item.claseId === data.claseId)
  if (index > -1) {
    certificadosSeleccionados.value.splice(index, 1)
  } else {
    certificadosSeleccionados.value.push(data)
  }
}

const toggleSelectAll = () => {
  if (allSelected.value) {
    certificadosSeleccionados.value = []
  } else {
    certificadosSeleccionados.value = [...selectableItems.value]
  }
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  'clase.curso.nombre': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})
</script>

<template>
  <v-datatable
    :value="misCursos"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['clase.curso.nombre']"
    paginator
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    :loading="cargando"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <v-iconfield>
          <v-inputicon>
            <i class="pi pi-search" />
          </v-inputicon>
          <v-inputtext v-model="filters['global'].value" placeholder="Buscar..." />
        </v-iconfield>
      </div>
    </template>

    <template #empty>
      <span>No se encontraron cursos.</span>
    </template>
    <template #loading>
      <div class="flex flex-col items-center justify-center">
        <v-progressspinner />
        <span class="text-3xl! text-white">Cargando datos...</span>
      </div>
    </template>

    <v-column header="Clase" sortable>
      <template #body="{ data }: { data: IClaseEmpleado }">
        {{ data.clase!.id }}
      </template>
    </v-column>
    <v-column header="Estatus clase" sortable>
      <template #body="{ data }: { data: IClaseEmpleado }">
        <v-tag :value="estatusClase(data.clase!.estatus)" severity="info" class="w-full" />
      </template>
    </v-column>
    <v-column header="Curso" sortable>
      <template #body="{ data }: { data: IClaseEmpleado }">
        {{ data.clase!.curso.nombre }}
      </template>
    </v-column>
    <v-column header="Calificacion" sortable>
      <template #body="{ data }: { data: IClaseEmpleado }">
        {{ data.calificacion }}
      </template>
    </v-column>

    <v-column header="Comentarios" :style="{ width: '300px' }">
      <template #body="{ data }: { data: IClaseEmpleado }">
        <v-textarea fluid v-model="data.comentarios" disabled />
      </template>
    </v-column>

    <v-column header="Estatus" sortable>
      <template #body="{ data }: { data: IClaseEmpleado }">
        <v-tag
          :value="data.aprobado ? 'Acreditado' : 'No acreditado'"
          :severity="data.aprobado ? 'success' : 'danger'"
          class="w-full!"
          v-if="data.clase!.calificada"
        />
        <v-tag value="Sin calificar" severity="warn" class="w-full" v-else />
      </template>
    </v-column>

    <v-column header="PDF">
      <template #body="{ data }: { data: IClaseEmpleado }">
        <div class="flex justify-center">
          <router-link
            :to="{
              name: !empleado ? 'certificado-pdf' : 'certificado-empleado-pdf',
              params: { id: data.id },
            }"
            v-if="data.aprobado && data.clase!.calificada && data.aceptarComentarios"
          >
            <v-button icon="pi pi-file-pdf" severity="danger" size="small" />
          </router-link>
          <v-button
            icon="pi pi-check"
            size="small"
            @click="modificarMutation.mutate(data)"
            v-if="!data.aceptarComentarios && data.clase?.calificada"
          />
        </div>
      </template>
    </v-column>

    <v-column headerStyle="width: 3rem">
      <template #header>
        <v-checkbox
          v-if="selectableItems.length > 0"
          :modelValue="allSelected"
          @update:modelValue="toggleSelectAll"
          binary
        />
      </template>
      <template #body="{ data }: { data: IClaseEmpleado }">
        <v-checkbox
          v-if="data.aprobado && data.clase!.calificada && data.aceptarComentarios"
          :modelValue="isSelected(data)"
          @update:modelValue="toggleSelection(data)"
          binary
        />
      </template>
    </v-column>
  </v-datatable>
  <div class="flex justify-end mt-2">
    <v-button
      icon="pi pi-download"
      label="Descragar todo"
      size="small"
      type="button"
      @click="descargar"
      :disabled="certificadosSeleccionados.length === 0"
    />
  </div>
</template>

<style scoped></style>
