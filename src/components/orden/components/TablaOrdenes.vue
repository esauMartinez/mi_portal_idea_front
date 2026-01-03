<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useEliminar from '../composables/useEliminar'
import useOrdenes from '../composables/useOrdenes'
import type { IOrden } from '../interfaces/orden'
import { formatearNombre } from '@/helper/formatearNombre'
import type { IEmpresa } from '@/components/empresa/interfaces/empresa'
import useEmpresasPorNombre from '@/components/empresa/composables/useEmpresasPorNombre'
import moment from 'moment'

const { ordenes, isLoading, estatus, filters, opcionesEstatus, empresa, severity, descargar } =
  useOrdenes()
const { eliminar, isPending } = useEliminar()
const { empresas, buscarEmpresa } = useEmpresasPorNombre()
</script>

<template>
  <v-datatable
    :value="ordenes"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['referencia']"
    paginator
    :rows="20"
    :rowsPerPageOptions="[20, 40, 60]"
    :loading="isLoading"
  >
    <template #header>
      <div className="grid grid-cols-12 gap-4">
        <div class="col-span-2">
          <v-iconfield>
            <v-inputicon>
              <i class="pi pi-search" />
            </v-inputicon>
            <v-inputtext fluid v-model="filters['global'].value" placeholder="Buscar..." />
          </v-iconfield>
        </div>
        <div className="col-span-2 col-start-3 row-start-1">
          <v-floatlabel variant="on">
            <v-select
              fluid
              v-model="estatus"
              :options="opcionesEstatus"
              optionLabel="item"
              optionValue="value"
            />
            <label for="estatus">Estatus</label>
          </v-floatlabel>
        </div>
        <div className="col-span-2 col-start-5 row-start-1">
          <v-floatlabel variant="on">
            <v-autocomplete
              fluid
              :modelValue="'Todas'"
              :suggestions="empresas"
              @complete="buscarEmpresa"
              optionLabel="razonSocial"
              @update:modelValue="
                (values: IEmpresa) => {
                  if (typeof values === 'object') {
                    empresa = values.id
                  }
                }
              "
            />
            <label for="empresa">Empresa</label>
          </v-floatlabel>
        </div>
        <div className="col-span-2 col-start-11 row-start-1">
          <router-link :to="{ path: 'crear-orden' }" v-if="verificarPermiso('Ordenes.Crear')">
            <v-button icon="pi pi-plus" label="Crear orden" size="small" class="w-full" />
          </router-link>
        </div>
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
    <v-column field="referencia" header="Referencia" sortable />
    <v-column field="createdAt" header="Fecha" sortable>
      <template #body="{ data }: { data: IOrden }">
        {{ moment(data.createdAt).format('YYYY/MM/DD HH:mm:ss') }}
      </template>
    </v-column>
    <v-column field="referenciaSap" header="Referencia SAP" sortable />
    <v-column field="empresa.razonSocial" header="Empresa" sortable>
      <template #body="{ data }: { data: IOrden }">
        {{ data.empresa.rfc }} / {{ data.empresa.razonSocial }}
      </template>
    </v-column>
    <v-column field="sucursal.nombre" header="Sucursal" sortable />
    <v-column header="Nombre solicita" sortable>
      <template #body="{ data }: { data: IOrden }">
        {{ formatearNombre(data.solicitante) }}
      </template>
    </v-column>
    <v-column field="estatus" header="Estatus" sortable>
      <template #body="{ data }: { data: IOrden }">
        <v-tag :value="data.estatus" :severity="severity(data.estatus)" class="w-full" />
      </template>
    </v-column>

    <v-column header="Acciones">
      <template #body="{ data }: { data: IOrden }">
        <div class="flex gap-2 justify-center">
          <v-button
            icon="pi pi-file-pdf"
            severity="danger"
            size="small"
            v-if="data.pathArchivo"
            @click="descargar(data.pathArchivo)"
          />
          <router-link
            :to="{ name: 'modificar-orden', params: { id: data.id } }"
            v-if="verificarPermiso('Ordenes.Modificar') && data.estatus !== 'Cerrada'"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-orden', params: { id: data.id } }"
            v-if="verificarPermiso('Ordenes.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id!)"
            :loading="isPending"
            v-if="verificarPermiso('Ordenes.Eliminar') && data.estatus === 'Creada'"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
