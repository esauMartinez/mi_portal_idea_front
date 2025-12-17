<script setup lang="ts">
import { computed } from 'vue'
import useModulos from '../composables/useModulos'
import type { Props } from '../interfaces/props'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { schema } from '../helpers/schema'
import type { IPerfil } from '../interfaces/perfil'

const { perfil, guardar } = defineProps<Props>()

const { data } = useModulos()

const modulos = computed(() => {
  if (!data.value) return []

  return data.value.map((x) => ({
    ...x,
    permisos: x.permisos.map((y) => ({
      ...y,
      seleccionado: !!perfil?.perfilesPermisos.find((z) => z.permisoId === y.id),
    })),
  }))
})

const initialValues = computed(() => {
  return perfil ? { ...schema.getDefault(), ...perfil } : { ...schema.getDefault() }
})

const { handleSubmit } = useForm<IPerfil>({
  initialValues: initialValues.value,
  validationSchema: schema,
})

const submit = handleSubmit((values: IPerfil) => {
  const data: IPerfil = {
    id: values.id,
    nombre: values.nombre,
    perfilesPermisos: [],
  }

  modulos.value.forEach((x) => {
    x.permisos.forEach((y) => {
      if (y.seleccionado) {
        data.perfilesPermisos.push({
          permisoId: y.id,
        })
      }
    })
  })

  guardar(data)
})
</script>

<template>
  <form
    @submit="submit"
    :initial-values="initialValues"
    :validation-schema="schema"
    class="grid grid-cols-1 gap-3"
  >
    <Field name="nombre" v-slot="{ field, meta, errors }">
      <div>
        <label for="nombre">Nombre del perfil</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="nombre" class="text-red-500" />
      </div>
    </Field>

    <v-fieldset v-for="modulo in modulos" :legend="modulo.nombre" :key="modulo.id">
      <div v-for="permiso in modulo.permisos" :key="permiso.id" class="bg-gray-200 m-2 rounded-md">
        <div class="flex justify-between gap-3 p-2">
          <span class="text-[16px]!">{{ permiso.descripcion }}</span>
          <v-toggleswitch v-model="permiso.seleccionado" />
        </div>
      </div>
    </v-fieldset>
    <ErrorMessage name="permisosPerfil" class="text-red-500" />

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
