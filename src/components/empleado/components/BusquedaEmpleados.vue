<script setup lang="ts">
import useEmpleadosPorNombre from '../composables/useEmpleadosPorNombre'
import type { IEmpleado } from '../interfaces/empleado'
import type { PropsBusquedaEmpleados } from '../interfaces/props'

defineProps<PropsBusquedaEmpleados>()

const { empleados, search } = useEmpleadosPorNombre()
</script>

<template>
  <v-autocomplete
    fluid
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
  />
</template>

<style scoped></style>
