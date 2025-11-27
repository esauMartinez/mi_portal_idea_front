<script setup lang="ts">
import { ErrorMessage, Field, useForm } from 'vee-validate'
import type { Props } from '../interfaces/props'
import { computed } from 'vue'
import { schema } from '../helpers/schema'
import type { IUbicacion } from '../interfaces/ubicacion'
import useDatos from '@/components/empleado/composables/useDatos'

const { ubicacion, guardar } = defineProps<Props>()
const { activo } = useDatos()

const initialValues = computed(() => {
  return ubicacion ? { ...schema.getDefault(), ...ubicacion } : { ...schema.getDefault() }
})

const { handleSubmit } = useForm<IUbicacion>({
  initialValues: initialValues.value,
  validationSchema: schema,
})

const submit = handleSubmit((values: IUbicacion) => {
  guardar(values)
})
</script>

<template>
  <form
    @submit="submit"
    :initialValues="initialValues"
    :validationSchema="schema"
    class="grid grid-cols-1 gap-3"
  >
    <Field name="nombre" v-slot="{ field, meta, errors }">
      <div>
        <label for="nombre">Nombre</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="nombre" class="text-red-500" />
      </div>
    </Field>

    <Field name="estatus" v-slot="{ field, meta, errors }">
      <div>
        <label for="estatus">Estatus</label>
        <v-select
          fluid
          :options="activo"
          optionLabel="item"
          optionValue="value"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="estatus" class="text-red-500" />
      </div>
    </Field>

    <div class="flex justify-end gap-3">
      <v-button
        icon="pi pi-times"
        label="Cancelar"
        severity="danger"
        size="small"
        text
        @click="cancelar"
      />
      <v-button icon="pi pi-save" label="Guardar" size="small" type="submit" :loading="pendiente" />
    </div>
  </form>
</template>

<style scoped></style>
