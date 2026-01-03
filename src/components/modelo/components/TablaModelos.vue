<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useEliminar from '../composables/useEliminar'
import type { IModelo } from '../interfaces/modelo'
import useModelos from '../composables/useModelos'

const { modelos, filters, isLoading } = useModelos()
const { eliminar, isPending } = useEliminar()
</script>

<template>
  <v-datatable
    :value="modelos"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['nombre']"
    paginator
    :rows="20"
    :rowsPerPageOptions="[20, 40, 60]"
    :loading="isLoading"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <v-iconfield>
          <v-inputicon>
            <i class="pi pi-search" />
          </v-inputicon>
          <v-inputtext v-model="filters['global'].value" placeholder="Buscar..." />
        </v-iconfield>
        <router-link :to="{ path: 'crear-modelo' }" v-if="verificarPermiso('Modelos.Crear')">
          <v-button icon="pi pi-plus" label="Crear modelo" size="small" />
        </router-link>
      </div>
    </template>

    <template #empty>
      <span>No hay datos que mostrar.</span>
    </template>
    <template #loading>
      <div class="flex flex-col items-center justify-center">
        <v-progressspinner />
        <span class="text-3xl! text-white">Cargando datos...</span>
      </div>
    </template>

    <v-column field="id" header="ID"></v-column>
    <v-column field="nombre" header="Nombre" sortable>
      <template #body="{ data }: { data: IModelo }">
        {{ data.nombre }}
      </template>
    </v-column>

    <v-column header="Acciones">
      <template #body="{ data }: { data: IModelo }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-modelo', params: { id: data.id } }"
            v-if="verificarPermiso('Modelos.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-modelo', params: { id: data.id } }"
            v-if="verificarPermiso('Modelos.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id!)"
            :loading="isPending"
            v-if="verificarPermiso('Modelos.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
