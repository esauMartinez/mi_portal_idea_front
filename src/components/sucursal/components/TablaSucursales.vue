<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useSucursales from '../composables/useSucursales'
import useEliminar from '../composables/useEliminar'
import type { ISucursal } from '../interfaces/sucursal'

const { sucursales, isLoading: obteniendo, filters } = useSucursales()
const { eliminar, isPending } = useEliminar()
</script>

<template>
  <v-datatable
    :value="sucursales"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['codigo', 'nombre', 'direccion']"
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
        <router-link :to="{ path: 'crear-sucursal' }" v-if="verificarPermiso('Sucursales.Crear')">
          <v-button icon="pi pi-plus" label="Crear sucursal" size="small" />
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
    <v-column field="direccion" header="Direccion" sortable />
    <v-column header="Empresa" :style="{ width: '100px' }" sortable>
      <template #body="{ data }: { data: ISucursal }">
        {{ data.empresa?.razonSocial }}/{{ data.empresa?.rfc }}
      </template>
    </v-column>

    <v-column field="activo" header="Estatus" :style="{ width: '100px' }" sortable>
      <template #body="{ data }: { data: ISucursal }">
        <v-tag
          class="w-full"
          :severity="data.activo ? 'success' : 'danger'"
          :value="data.activo ? 'Activa' : 'Desactivada'"
        />
      </template>
    </v-column>

    <v-column header="Acciones">
      <template #body="{ data }: { data: ISucursal }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-sucursal', params: { id: data.id } }"
            v-if="verificarPermiso('Sucursales.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-sucursal', params: { id: data.id } }"
            v-if="verificarPermiso('Sucursales.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id!)"
            :loading="isPending"
            v-if="verificarPermiso('Sucursales.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
