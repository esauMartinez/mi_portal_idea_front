<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useDepartamentos from '../composables/useDepartamentos'
import type { IDepartamento } from '../interfaces/departamento'
import useEliminar from '../composables/useEliminar'

const { departamentos, isLoading: obteniendo, filters } = useDepartamentos()
const { eliminar, isPending } = useEliminar()
</script>

<template>
  <v-datatable
    :value="departamentos"
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
        <router-link
          :to="{ path: 'crear-departamento' }"
          v-if="verificarPermiso('Departamentos.Crear')"
        >
          <v-button icon="pi pi-plus" label="Crear departamento" size="small" />
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
    <v-column field="codigo" header="Codigo" sortable />
    <v-column field="nombre" header="Nombre" sortable />

    <v-column field="activo" header="Estatus" :style="{ width: '100px' }" sortable>
      <template #body="{ data }: { data: IDepartamento }">
        <v-tag
          class="w-full"
          :severity="data.activo ? 'success' : 'danger'"
          :value="data.activo ? 'Activo' : 'Desactivada'"
        />
      </template>
    </v-column>
    <v-column header="Acciones">
      <template #body="{ data }: { data: IDepartamento }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-departamento', params: { id: data.id } }"
            v-if="verificarPermiso('Departamentos.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-departamento', params: { id: data.id } }"
            v-if="verificarPermiso('Departamentos.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id!)"
            :loading="isPending"
            v-if="verificarPermiso('Departamentos.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
