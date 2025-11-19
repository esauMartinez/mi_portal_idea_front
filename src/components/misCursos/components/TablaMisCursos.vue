<script setup lang="ts">
import type { IClaseEmpleado } from '@/components/clase/interfaces/clase_empleado'
import type { PropsTabla } from '../interface/propsTabla'
import { computed, ref } from 'vue'

const { misCursos } = defineProps<PropsTabla>()

const selectedProducts = ref<IClaseEmpleado[]>([])

const descargar = () => {
  selectedProducts.value.forEach((x) => {
    console.log(x.claseId)
    console.log(x.calificacion)
    console.log(x.aprobado)
  })
}

const selectableItems = computed(() => {
  return misCursos?.filter((item) => item.aprobado && item.clase.calificada) || []
})

const allSelected = computed(() => {
  if (selectableItems.value.length === 0) return false
  return selectableItems.value.every((item) =>
    selectedProducts.value.some((selected) => selected.claseId === item.claseId),
  )
})

const estatusClase = (estatus: string) => {
  const estatusSplit = estatus.split('')
  estatusSplit[0] = estatusSplit[0]!.toUpperCase()
  return estatusSplit.join('')
}

const isSelected = (data: IClaseEmpleado) => {
  return selectedProducts.value.some((item) => item.claseId === data.claseId)
}

const toggleSelection = (data: IClaseEmpleado) => {
  const index = selectedProducts.value.findIndex((item) => item.claseId === data.claseId)
  if (index > -1) {
    selectedProducts.value.splice(index, 1)
  } else {
    selectedProducts.value.push(data)
  }
}

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedProducts.value = []
  } else {
    selectedProducts.value = [...selectableItems.value]
  }
}
</script>

<template>
  <v-datatable
    :value="misCursos"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
  >
    <template #empty>
      <span>No se encontraron cursos.</span>
    </template>
    <template #loading>
      <v-progressspinner />
    </template>

    <v-column header="Clase" sortable>
      <template #body="{ data }: { data: IClaseEmpleado }">
        {{ data.clase.id }}
      </template>
    </v-column>
    <v-column header="Estatus clase" sortable>
      <template #body="{ data }: { data: IClaseEmpleado }">
        <v-tag :value="estatusClase(data.clase.estatus)" severity="info" class="w-full" />
      </template>
    </v-column>
    <v-column header="Curso" sortable>
      <template #body="{ data }: { data: IClaseEmpleado }">
        {{ data.clase.curso.nombre }}
      </template>
    </v-column>
    <v-column header="Calificacion" sortable>
      <template #body="{ data }: { data: IClaseEmpleado }">
        {{ data.calificacion }}
      </template>
    </v-column>

    <v-column header="Estatus" sortable>
      <template #body="{ data }: { data: IClaseEmpleado }">
        <v-tag
          :value="data.aprobado ? 'Aprobado' : 'Reprobado'"
          :severity="data.aprobado ? 'success' : 'danger'"
          class="w-full!"
          v-if="data.clase.calificada"
        />
        <v-tag value="Sin calificar" severity="warn" class="w-full" v-else />
      </template>
    </v-column>

    <v-column header="PDF">
      <template #body="{ data }: { data: IClaseEmpleado }">
        <router-link
          :to="{
            name: !empleado ? 'certificado-pdf' : 'certificado-empleado-pdf',
            params: { id: data.id },
          }"
          v-if="data.aprobado && data.clase.calificada"
        >
          <v-button icon="pi pi-file-pdf" severity="danger" size="small" />
        </router-link>
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
          v-if="data.aprobado && data.clase.calificada"
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
      :disabled="selectedProducts.length === 0"
    />
  </div>
</template>

<style scoped></style>
