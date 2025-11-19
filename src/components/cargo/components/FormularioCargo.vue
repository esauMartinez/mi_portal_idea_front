<script setup lang="ts">
import { computed } from 'vue'
import type { Props } from '../interfaces/props'
import { schema } from '../helpers/schema'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import useDatos from '@/components/empleado/composables/useDatos'
import type { ICargo } from '../interfaces/cargo'

const { cargo, guardar } = defineProps<Props>()
const { activo } = useDatos()

const initialValues = computed(() => {
  return cargo
    ? {
        ...schema.getDefault(),
        ...cargo,
      }
    : { ...schema.getDefault() }
})

const { handleSubmit } = useForm<ICargo>({
  initialValues: initialValues.value,
  validationSchema: schema,
})

const submit = handleSubmit((values: ICargo) => {
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
    <Field name="codigo" v-slot="{ field, meta, errors }">
      <div>
        <label for="codigo">Codigo</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="codigo" class="text-red-500" />
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

  <router-view></router-view>
</template>

<style scoped></style>
