<script setup lang="ts">
import TablaRequerimientos from '@/components/requerimiento/components/TablaRequerimientos.vue'
import { ref } from 'vue'
import type { PropsRequerimientosCurso } from '../interfaces/props'
import type { IRequerimiento } from '@/components/requerimiento/interface/requerimineto'

const visible = ref<boolean>(false)

defineProps<PropsRequerimientosCurso>()
</script>

<template>
  <v-datatable
    :value="requerimientos"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-xl! font-bold">Lista de cursos</span>
        <v-button
          icon="pi pi-plus"
          label="Agregar requerimiento"
          size="small"
          @click="visible = !visible"
        />
      </div>
    </template>

    <template #empty> No se encontraron datos. </template>
    <template #loading>
      <v-progressspinner />
    </template>

    <v-column field="requerimiento.id" header="ID" sortable />
    <v-column field="requerimiento.clave" header="Clave" sortable />
    <v-column field="requerimiento.nombre" header="Nombre" sortable />
    <v-column field="requerimiento.descripcion" header="Descripcion" sortable />
    <v-column field="requerimiento.descripcion" header="Descripcion" sortable>
      <template #body="{ data }: { data: IRequerimiento }">
        <div class="flex justify-center items-center">
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminarRequerimiento(data.id)"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>

  <v-dialog v-model:visible="visible" :style="{ width: '40%' }" header=" " :modal="true">
    <TablaRequerimientos :modulo="false" :seleccionarRequerimiento="agregarRequerimiento" />
  </v-dialog>
</template>

<style scoped></style>
