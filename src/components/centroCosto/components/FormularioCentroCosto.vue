<script setup lang="ts">
import { computed } from 'vue'
import type { Props } from '../interfaces/props'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import useDatos from '@/components/empleado/composables/useDatos'
import { schema } from '../helpers/schema'
import type { ICentroCosto } from '../interfaces/centro_costo'

const { centroCosto, guardar } = defineProps<Props>()
const { activo } = useDatos()

const initialValues = computed(() => {
  return centroCosto
    ? {
        ...schema.getDefault(),
        ...centroCosto,
      }
    : { ...schema.getDefault() }
})

const { handleSubmit } = useForm<ICentroCosto>({
  initialValues: initialValues.value,
  validationSchema: schema,
})

const submit = handleSubmit((values: ICentroCosto) => {
  guardar(values)
})
</script>

<template>
  <form
    @submit="submit"
    :initial-values="initialValues"
    :validation-schema="schema"
    class="grid grid-cols-1 gap-3"
  >
    <Field name="clave" v-slot="{ field, meta, errors }">
      <div>
        <label for="clave">Clave</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="clave" class="text-red-500" />
      </div>
    </Field>

    <Field name="nombre" v-slot="{ field, meta, errors }">
      <div>
        <label for="nombre">Nombre curso</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="nombre" class="text-red-500" />
      </div>
    </Field>

    <Field name="activo" v-slot="{ field, meta, errors }">
      <div>
        <label for="activo">Estatus</label>
        <v-select
          fluid
          :options="activo"
          optionLabel="item"
          optionValue="value"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="activo" class="text-red-500" />
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
