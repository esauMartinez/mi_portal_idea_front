<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useCursos from '../composables/useCursos'
import useEliminar from '../composables/useEliminar'
import type { ICurso } from '../interfaces/curso'

const { cursos, isLoading: obteniendo, filters } = useCursos()
const { eliminar } = useEliminar()
</script>

<template>
  <v-datatable
    :value="cursos"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['clave', 'nombre']"
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
        <router-link :to="{ path: 'crear-curso' }" v-if="verificarPermiso('Cursos.Crear')">
          <v-button icon="pi pi-plus" label="Crear curso" size="small" />
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
    <v-column field="nombre" header="Nombre del curso" sortable />

    <v-column header="Requerimientos">
      <template #body="{ data }: { data: ICurso }">
        <div class="grid grid-cols-1 gap-1">
          <div
            v-for="item in data.requerimientosCursos"
            :key="item.id"
            class="bg-cyan-500 rounded-md p-1"
          >
            <span class="text-white">{{ item.requerimiento?.nombre }}</span>
          </div>
        </div>
      </template>
    </v-column>
    <v-column field="verificado" header="Estatus" sortable>
      <template #body="{ data }: { data: ICurso }">
        <v-tag
          class="w-full"
          :severity="data.estatus ? 'success' : 'danger'"
          :value="data.estatus ? 'Activo' : 'Inactivo'"
        />
      </template>
    </v-column>

    <v-column header="Acciones" :exportable="false">
      <template #body="{ data }: { data: ICurso }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-curso', params: { id: data.id } }"
            v-if="verificarPermiso('Cursos.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-curso', params: { id: data.id } }"
            v-if="verificarPermiso('Cursos.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id)"
            v-if="verificarPermiso('Cursos.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
