<script setup lang="ts">
import useDatos from '@/composables/useDatos'
import { computed } from 'vue'
import { schema } from '../helpers/schema'
import type { ISucursal } from '../interfaces/sucursal'
import type { Props } from '../interfaces/props'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import useEmpresas from '@/components/empresa/composables/useEmpresas'

const { sucursal, guardar } = defineProps<Props>()

const { empresas } = useEmpresas()
const { activo } = useDatos()

const initialValues = computed(() => {
  return sucursal ? { ...schema.getDefault(), ...sucursal } : { ...schema.getDefault() }
})

const { handleSubmit } = useForm<ISucursal>({
  initialValues: initialValues.value,
  validationSchema: schema,
})

const submit = handleSubmit((values) => {
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

    <Field name="direccion" v-slot="{ field, meta, errors }">
      <div>
        <label for="direccion">Direccion</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="direccion" class="text-red-500" />
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

    <Field name="empresaId" v-slot="{ field, meta, errors }">
      <div>
        <label for="empresaId">Empresa</label>
        <v-select
          fluid
          :options="empresas"
          optionLabel="razonSocial"
          optionValue="id"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="empresaId" class="text-red-500" />
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
