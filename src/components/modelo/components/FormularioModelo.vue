<script setup lang="ts">
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { computed } from 'vue'
import { schema } from '../helpers/schema'
import type { IModelo } from '../interfaces/modelo'
import type { Props } from '../interfaces/props'

const { modelo, guardar } = defineProps<Props>()

const initialValues = computed(() => {
  return modelo ? { ...schema.getDefault(), ...modelo } : { ...schema.getDefault() }
})

const { handleSubmit } = useForm<IModelo>({
  initialValues: initialValues.value,
  validationSchema: schema,
})

const submit = handleSubmit((values: IModelo) => {
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
