<script setup lang="ts">
import { computed } from 'vue'
import type { Props } from '../interfaces/props'
import { schema } from '../helpers/schema'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import type { ICurso } from '../interfaces/curso'
import RequerimientosCurso from './RequerimientosCurso.vue'
import type { IRequerimiento } from '@/components/requerimiento/interface/requerimineto'
import type { IRequerimientoCurso } from '../interfaces/requerimiento_curso'
import { useToast } from 'primevue'
import useDatos from '@/composables/useDatos'

const { curso, guardar } = defineProps<Props>()
const { activo, tipoCurso } = useDatos()
const toast = useToast()

const initialValues = computed(() => {
  return curso
    ? {
        ...schema.getDefault(),
        ...curso,
      }
    : { ...schema.getDefault(), requerimientosCursos: [] }
})

const { handleSubmit, values, setFieldValue } = useForm<ICurso>({
  initialValues: initialValues.value,
  validationSchema: schema,
})

const agregarRequerimiento = (payload: IRequerimiento) => {
  const buscar = values.requerimientosCursos.find((x) => x.requerimiento?.id === payload.id)

  if (buscar === undefined) {
    const nuevoRequerimiento = {
      id: payload.id,
      cursoId: curso?.id,
      requerimientoId: payload.id,
      requerimiento: payload,
    } as IRequerimientoCurso
    setFieldValue('requerimientosCursos', [...values.requerimientosCursos, nuevoRequerimiento])
    toast.add({
      severity: 'success',
      summary: 'Requerimiento',
      detail: 'Requerimiento agregado',
      group: 'br',
      life: 3000,
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Requerimiento',
      detail: 'El requerimiento ya existe en este curso',
      group: 'br',
      life: 3000,
    })
  }
}

const eliminarRequerimiento = (id: number) => {
  const filtro = values.requerimientosCursos.filter((x) => x.id !== id)
  setFieldValue('requerimientosCursos', [...filtro])
}

const submit = handleSubmit((values: ICurso) => {
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
    <Field name="tipo" v-slot="{ field, meta, errors }">
      <div>
        <label for="tipo">Tipo de curso</label>
        <v-select
          fluid
          :options="tipoCurso"
          optionLabel="item"
          optionValue="value"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="tipo" class="text-red-500" />
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
        <ErrorMessage name="tipo" class="text-red-500" />
      </div>
    </Field>

    <Field name="requerimientosCursos">
      <RequerimientosCurso
        :requerimientos="values?.requerimientosCursos"
        :cursoId="curso?.id"
        :agregarRequerimiento="agregarRequerimiento"
        :eliminarRequerimiento="eliminarRequerimiento"
      />
      <ErrorMessage name="requerimientosCursos" class="text-red-500" />
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
