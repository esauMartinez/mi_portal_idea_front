<script setup lang="ts">
import useActivar from '../composables/useActivar'
import useDesactivar from '../composables/useDesactivar'
import useEliminar from '../composables/useEliminar'
import useEmpleados from '../composables/useEmpleados'
import type { IEmpleado } from '../interfaces/empleado'
import { verificarPermiso } from '@/guards/verificarPermiso'

const { empleados, isLoading: obteniendo, filters } = useEmpleados()
const { eliminar } = useEliminar()
const { activarUsuario, isPending: activando } = useActivar()
const { desactivarEmpleado, isPending: desactivando } = useDesactivar()
</script>

<template>
  <v-datatable
    :value="empleados"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['nombreCompleto', 'email']"
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
        <router-link :to="{ path: 'crear-empleado' }" v-if="verificarPermiso('Empleados.Crear')">
          <v-button icon="pi pi-plus" label="Crear empleado" size="small" />
        </router-link>
      </div>
    </template>

    <template #empty> No se encontraron datos. </template>
    <template #loading>
      <v-progressspinner />
    </template>

    <v-column field="id" header="ID" sortable />
    <v-column field="idUsuario" header="ID Usuario" sortable />
    <v-column field="activo" header="Estatus" sortable>
      <template #body="{ data }: { data: IEmpleado }">
        <v-tag
          class="w-full"
          :severity="data.activo ? 'success' : 'danger'"
          :value="data.activo ? 'Activo' : 'Inactivo'"
        />
      </template>
    </v-column>
    <v-column field="nombreCompleto" header="Nombre" sortable>
      <template #body="{ data }: { data: IEmpleado }">
        <span>
          {{ data.nombreCompleto }}
        </span>
      </template>
    </v-column>
    <v-column field="empresa.nombre" header="Empresa" sortable>
      <template #body="{ data }: { data: IEmpleado }">
        <div v-if="data.empresa">{{ data.empresa?.razonSocial }}/{{ data.empresa?.rfc }}</div>
      </template>
    </v-column>
    <v-column field="email" header="Email" sortable />
    <v-column field="tieneUsuario" header="Tiene usuario" sortable>
      <template #body="{ data }: { data: IEmpleado }">
        <v-tag
          class="w-full"
          :severity="data.tieneUsuario ? 'success' : 'danger'"
          :value="data.tieneUsuario ? 'Si' : 'No'"
        />
      </template>
    </v-column>
    <v-column field="verificado" header="Cuenta verificada" sortable>
      <template #body="{ data }: { data: IEmpleado }">
        <v-tag
          class="w-full"
          :severity="data.verificado ? 'success' : 'danger'"
          :value="data.verificado ? 'Si' : 'No'"
        />
      </template>
    </v-column>

    <v-column header="Acciones" :exportable="false">
      <template #body="{ data }: { data: IEmpleado }">
        <div class="flex gap-2 justify-center">
          <v-button
            icon="pi pi-pause-circle"
            severity="danger"
            size="small"
            @click="desactivarEmpleado(data)"
            :loading="desactivando || activando"
            v-tooltip="'Desactivar empleado'"
            v-if="data.activo && verificarPermiso('Empleados.Desactivar')"
          />
          <v-button
            icon="pi pi-play-circle"
            size="small"
            @click="activarUsuario(data)"
            :loading="activando || desactivando"
            v-tooltip="'Activar empleado'"
            v-if="!data.activo && verificarPermiso('Empleados.Activar')"
          />
          <router-link
            :to="{ name: 'jerarquia', params: { id: data.id } }"
            v-if="verificarPermiso('Empleados.Jerarquia')"
          >
            <v-button
              icon="pi pi-sitemap"
              severity="help"
              size="small"
              v-tooltip="'Jerarquia empleado'"
            />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-empleado', params: { id: data.id } }"
            v-if="verificarPermiso('Empleados.Bitacora')"
          >
            <v-button
              icon="pi pi-list"
              severity="info"
              size="small"
              v-tooltip="'Bitacora empleado'"
            />
          </router-link>
          <router-link
            :to="{ name: 'kardex', params: { id: data.id } }"
            v-if="verificarPermiso('Empleados.Kardex.Ver')"
          >
            <v-button icon="pi pi-address-book" size="small" v-tooltip="'Kardex empleado'" />
          </router-link>
          <router-link
            :to="{ name: 'cursos-empleado', params: { id: data.id } }"
            v-if="verificarPermiso('Empleados.Ver')"
          >
            <v-button icon="pi pi-check" size="small" v-tooltip="'Cursos empleado'" />
          </router-link>
          <router-link
            :to="{ name: 'modificar-empleado', params: { id: data.id } }"
            v-if="verificarPermiso('Empleados.Modificar')"
          >
            <v-button
              icon="pi pi-pencil"
              severity="warn"
              size="small"
              v-tooltip="'Modificar empleado'"
            />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id)"
            v-if="verificarPermiso('Empleados.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
