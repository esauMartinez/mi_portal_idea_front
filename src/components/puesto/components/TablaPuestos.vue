<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import usePuestos from '../composables/usePuestos'
import type { IPuesto } from '../interfaces/puesto'
import useEliminar from '../composables/useEliminar'

const { puestos, isLoading: obteniendo, filters } = usePuestos()
const { eliminar, isPending } = useEliminar()
</script>

<template>
  <v-datatable
    :value="puestos"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['nombre']"
    paginator
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    :loading="obteniendo"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <v-iconfield>
          <v-inputicon>
            <i class="pi pi-search" />
          </v-inputicon>
          <v-inputtext v-model="filters['global'].value" placeholder="Buscar..." />
        </v-iconfield>
        <router-link :to="{ path: 'crear-puesto' }" v-if="verificarPermiso('Puestos.Crear')">
          <v-button icon="pi pi-plus" label="Crear puesto" size="small" />
        </router-link>
      </div>
    </template>

    <template #empty> No se encontraron datos. </template>
    <template #loading>
      <v-progressspinner />
    </template>

    <v-column field="id" header="ID" sortable />
    <v-column field="nombre" header="Nombre" sortable />

    <v-column field="estatus" header="Estatus" :style="{ width: '100px' }" sortable>
      <template #body="{ data }: { data: IPuesto }">
        <v-tag
          class="w-full"
          :severity="data.activo ? 'success' : 'danger'"
          :value="data.activo ? 'Activo' : 'Desactivado'"
        />
      </template>
    </v-column>
    <v-column header="Acciones">
      <template #body="{ data }: { data: IPuesto }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-puesto', params: { id: data.id } }"
            v-if="verificarPermiso('Puestos.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-puesto', params: { id: data.id } }"
            v-if="verificarPermiso('Puestos.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id!)"
            :loading="isPending"
            v-if="verificarPermiso('Puestos.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
