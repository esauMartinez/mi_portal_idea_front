<script setup lang="ts">
import { useRoute } from 'vue-router'
import useKardex from '../composables/useKardex'
import { ref, watch } from 'vue'
import type { IRequerimiento } from '@/components/requerimiento/interface/requerimineto'
import TablaRequerimientos from '@/components/requerimiento/components/TablaRequerimientos.vue'
import useCrearKardex from '../composables/useCrearKardex'
import useEliminarKardex from '../composables/useEliminarKarex'
import { verificarPermiso } from '@/guards/verificarPermiso'

const visible = ref<boolean>(false)
const { params } = useRoute()
const { data: kardex } = useKardex(+params.id!)
const { crearmutation, isSuccess } = useCrearKardex()
const { eliminar } = useEliminarKardex()

const agregarRequerimiento = (payload: IRequerimiento) => {
  crearmutation.mutate({
    empleadoId: +params.id!,
    requerimientoId: payload.id,
  })
}

watch(isSuccess, (payload) => {
  if (payload) {
    visible.value = false
  }
})
</script>

<template>
  <v-datatable
    :value="kardex"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
  >
    <template #header v-if="verificarPermiso('Empleados.Kardex.Crear')">
      <div class="flex justify-end items-center">
        <v-button icon="pi pi-plus" size="small" @click="visible = !visible" />
      </div>
    </template>

    <template #empty> No se encontraron datos. </template>

    <v-column field="requerimiento.clave" header="Clave"></v-column>
    <v-column field="requerimiento.nombre" header="Nombre"></v-column>
    <v-column field="requerimiento.descripcion" header="Descripcion"></v-column>
    <v-column header="Acciones" v-if="verificarPermiso('Empleados.Kardex.Eliminar')">
      <template #body="{ data }: { data: IRequerimiento }">
        <div class="flex justify-center items-center">
          <v-button icon="pi pi-trash" severity="danger" @click="eliminar(data.id)" size="small" />
        </div>
      </template>
    </v-column>
  </v-datatable>

  <v-dialog v-model:visible="visible" :style="{ width: '40%' }" header=" " :modal="true">
    <TablaRequerimientos :modulo="false" :seleccionarRequerimiento="agregarRequerimiento" />
  </v-dialog>
</template>

<style scoped></style>
