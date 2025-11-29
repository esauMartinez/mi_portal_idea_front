<script setup lang="ts">
import { computed } from 'vue'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { schema } from '../helpers/schema'
import type { Props } from '../interfaces/props'
import type { IOrden } from '../interfaces/orden'
import useEmpresasPorNombre from '@/components/empresa/composables/useEmpresasPorNombre'
import type { IEmpresa } from '@/components/empresa/interfaces/empresa'
import useSucursalesEmpresa from '@/components/sucursal/composables/useSucursalesEmpresa'
import type { IEmpleado } from '@/components/empleado/interfaces/empleado'
import BusquedaEmpleados from '@/components/empleado/components/BusquedaEmpleados.vue'

const { orden, guardar } = defineProps<Props>()
const { empresas, buscarEmpresa } = useEmpresasPorNombre()
const { empresaId, data: sucursales } = useSucursalesEmpresa()

const initialValues = computed(() => {
  return orden ? { ...schema.getDefault(), ...orden } : { ...schema.getDefault() }
})

const { handleSubmit, setFieldValue } = useForm<IOrden>({
  initialValues: initialValues.value,
  validationSchema: schema,
})

const submit = handleSubmit((values) => {
  guardar(values)
})

const seleccionarEmpleado = (payload: IEmpleado) => {
  setFieldValue('solicitanteId', payload.id)
}
</script>

<template>
  <form
    @submit="submit"
    :initialValues="initialValues"
    :validationSchema="schema"
    class="grid grid-cols-1 gap-3"
  >
    <Field name="referencia" v-slot="{ field, meta, errors }">
      <div>
        <label for="referencia">Referencia O.T.</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="referencia" class="text-red-500" />
      </div>
    </Field>

    <Field name="referenciaSap" v-slot="{ field, meta, errors }">
      <div>
        <label for="referenciaSap">Referencia SAP</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="referenciaSap" class="text-red-500" />
      </div>
    </Field>

    <Field name="monto" v-slot="{ field, meta, errors }">
      <div>
        <label for="monto">Monto</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="monto" class="text-red-500" />
      </div>
    </Field>

    <Field name="empresaId" v-slot="{ meta, errors }">
      <div>
        <label for="empresaId">Empresa</label>
        <v-autocomplete
          fluid
          :suggestions="empresas"
          @complete="buscarEmpresa"
          optionLabel="razonSocial"
          @update:modelValue="
            (empresa: IEmpresa) => {
              if (typeof empresa === 'object') {
                empresaId = empresa.id
                setFieldValue('empresaId', empresa.id)
              }
            }
          "
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="empresaId" class="text-red-500" />
      </div>
    </Field>

    <Field name="sucursalId" v-slot="{ field, meta, errors }">
      <div>
        <label for="sucursalId">Sucursal</label>
        <v-select
          fluid
          filter
          :options="sucursales"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          optionLabel="nombre"
          optionValue="id"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="sucursalId" class="text-red-500" />
      </div>
    </Field>

    <Field name="solicitanteId">
      <div>
        <label for="solicitanteId">Empleado solicitante</label>
        <BusquedaEmpleados :seleccionarEmpleado="seleccionarEmpleado" :boton="false" />
        <ErrorMessage name="solicitanteId" class="text-red-500" />
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
