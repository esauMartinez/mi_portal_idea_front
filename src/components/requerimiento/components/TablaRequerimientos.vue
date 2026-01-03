<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useEliminar from '../composables/useEliminar'
import useRequeriminetos from '../composables/useRequerimientos'
import type { PropsTabla } from '../interface/props'
import type { IRequerimiento } from '../interface/requerimineto'

defineProps<PropsTabla>()

const { requerimientos, isLoading: obteniendo, filters } = useRequeriminetos()
const { eliminar } = useEliminar()
</script>

<template>
  <v-datatable
    :value="requerimientos"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['clave', 'nombre']"
    paginator
    :rows="20"
    :rowsPerPageOptions="[20, 40, 60]"
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
          :to="{ path: 'crear-requerimiento' }"
          v-if="modulo && verificarPermiso('Requerimientos.Crear')"
        >
          <v-button icon="pi pi-plus" label="Crear requerimiento" size="small" />
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
    <v-column field="clave" header="Clave" sortable />
    <v-column field="nombre" header="Nombre" sortable />
    <v-column field="tipo" header="Tipo" sortable>
      <template #body="{ data }: { data: IRequerimiento }">
        <v-tag
          :value="data.tipo"
          :severity="data.tipo === 'empleado' ? 'info' : 'warn'"
          class="w-full!"
        />
      </template>
    </v-column>
    <v-column field="estatus" header="Estatus" sortable>
      <template #body="{ data }: { data: IRequerimiento }">
        <v-tag
          :value="data.estatus ? 'Activo' : 'Inactivo'"
          :severity="data.estatus ? 'success' : 'danger'"
          class="w-full!"
        />
      </template>
    </v-column>
    <v-column header="Acciones" :exportable="false">
      <template #body="{ data }: { data: IRequerimiento }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-requerimiento', params: { id: data.id } }"
            v-if="modulo && verificarPermiso('Requerimientos.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-requerimiento', params: { id: data.id } }"
            v-if="modulo && verificarPermiso('Requerimientos.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id)"
            v-if="modulo && verificarPermiso('Requerimientos.Eliminar')"
          />
          <v-button
            icon="pi pi-plus"
            size="small"
            @click="seleccionarRequerimiento?.(data)"
            v-if="!modulo"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
