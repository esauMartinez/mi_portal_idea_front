<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useEliminar from '../composables/useEliminar'
import usePerfiles from '../composables/usePerfiles'
import type { IPerfil } from '../interfaces/perfil'

const { perfiles, isLoading: obteniendo, filters } = usePerfiles()
const { eliminar, isPending } = useEliminar()
</script>

<template>
  <v-datatable
    :value="perfiles"
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
        <router-link :to="{ path: 'crear-perfil' }" v-if="verificarPermiso('Perfiles.Crear')">
          <v-button icon="pi pi-plus" label="Crear perfil" size="small" />
        </router-link>
      </div>
    </template>

    <template #empty> No se encontraron datos. </template>
    <template #loading>
      <div class="flex flex-col items-center justify-center">
        <v-progressspinner />
        <span class="text-3xl! text-white">Cargando datos...</span>
      </div>
    </template>

    <v-column field="id" header="ID" sortable />
    <v-column field="nombre" header="Nombre del perfil" sortable />

    <v-column header="Acciones" :exportable="false">
      <template #body="{ data }: { data: IPerfil }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-perfil', params: { id: data.id } }"
            v-if="verificarPermiso('Perfiles.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id!)"
            :loading="isPending"
            v-if="verificarPermiso('Perfiles.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
