<script setup lang="ts">
import { ref, watch } from 'vue'
import useEmpleadosPorNombre from '../composables/useEmpleadosPorNombre'
import type { IEmpleado } from '../interfaces/empleado'
import type { PropsBusquedaEmpleados } from '../interfaces/props'

const {
  seleccionarEmpleado,
  activo: activoProp = true,
  boton = true,
  pendiente = false,
  instructor: instructorProp,
  registrado = false,
  nombre: nombreEmpleado,
} = defineProps<PropsBusquedaEmpleados>()

const empleadoSeleccionado = ref<IEmpleado | null>(null)
const { empleados, activo, instructor, nombre, search } = useEmpleadosPorNombre()

activo.value = activoProp
instructor.value = instructorProp

watch(
  () => registrado,
  (payload) => {
    if (payload) {
      nombre.value = ''
    }
  },
  { deep: true },
)

watch(
  () => nombreEmpleado,
  (payload) => {
    if (payload) {
      nombre.value = payload
    }
  },
  { deep: true },
)

const submit = () => {
  if (empleadoSeleccionado.value) {
    seleccionarEmpleado(empleadoSeleccionado.value!)
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="grid grid-cols-[1fr_auto] items-center gap-2">
    <v-autocomplete
      fluid
      :modelValue="nombre"
      :suggestions="empleados"
      @complete="search"
      optionLabel="nombreCompleto"
      @update:modelValue="
        (empleado: IEmpleado) => {
          if (typeof empleado === 'object') {
            seleccionarEmpleado(empleado)
          }
        }
      "
      :disabled="disabled"
      :invalid="invalid"
      v-if="!boton"
    />

    <v-autocomplete
      fluid
      :modelValue="nombre"
      :suggestions="empleados"
      @complete="search"
      optionLabel="nombreCompleto"
      @update:modelValue="
        (empleado: IEmpleado) => {
          if (typeof empleado === 'object') {
            empleadoSeleccionado = empleado
          }
        }
      "
      :disabled="disabled"
      :invalid="invalid"
      v-if="boton"
    />

    <v-button
      v-if="boton"
      :seleccionarEmpleado="seleccionarEmpleado"
      label="Agregar"
      icon="pi pi-send"
      class="whitespace-nowrap"
      type="submit"
      :loading="pendiente"
    />
  </form>
</template>

<style scoped></style>
