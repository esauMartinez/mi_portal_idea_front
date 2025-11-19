<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useEmpresas from '../composables/useEmpresas'
import useEliminar from '../composables/useEliminar'
import type { IEmpresa } from '../interfaces/empresa'

const { empresas, isLoading: obteniendo, filters } = useEmpresas()
const { eliminar, isPending } = useEliminar()
</script>

<template>
  <v-datatable
    :value="empresas"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['razonSocial', 'rfc']"
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
        <router-link :to="{ path: 'crear-empresa' }" v-if="verificarPermiso('Empresas.Crear')">
          <v-button icon="pi pi-plus" label="Crear empresa" size="small" />
        </router-link>
      </div>
    </template>

    <template #empty> No se encontraron datos. </template>
    <template #loading>
      <v-progressspinner />
    </template>

    <v-column field="id" header="ID" sortable />
    <v-column field="razonSocial" header="Razon social" sortable />
    <v-column field="rfc" header="RFC" sortable />

    <v-column field="activo" header="Estatus" :style="{ width: '100px' }" sortable>
      <template #body="{ data }: { data: IEmpresa }">
        <v-tag
          class="w-full"
          :severity="data.activo ? 'success' : 'danger'"
          :value="data.activo ? 'Activa' : 'Desactivada'"
        />
      </template>
    </v-column>

    <v-column header="Acciones">
      <template #body="{ data }: { data: IEmpresa }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-empresa', params: { id: data.id } }"
            v-if="verificarPermiso('Empresas.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-empresa', params: { id: data.id } }"
            v-if="verificarPermiso('Empresas.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id!)"
            :loading="isPending"
            v-if="verificarPermiso('Empresas.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
