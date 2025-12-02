<script setup lang="ts">
import { computed, ref } from 'vue'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { schema } from '../helpers/schema'
import type { Props } from '../interfaces/props'
import type { IOrden } from '../interfaces/orden'
import useEmpresasPorNombre from '@/components/empresa/composables/useEmpresasPorNombre'
import type { IEmpresa } from '@/components/empresa/interfaces/empresa'
import useSucursalesEmpresa from '@/components/sucursal/composables/useSucursalesEmpresa'
import type { IEmpleado } from '@/components/empleado/interfaces/empleado'
import BusquedaEmpleados from '@/components/empleado/components/BusquedaEmpleados.vue'
import { formatearNombre } from '@/helper/formatearNombre'
import type { FileUploadSelectEvent } from 'primevue'

const { orden, guardar } = defineProps<Props>()
const { empresas, buscarEmpresa } = useEmpresasPorNombre()
const { empresaId, data: sucursales } = useSucursalesEmpresa()
const pdfPreview = ref<string | null>(null)
const pdfName = ref<string | null>(null)

// Inicializar empresaId correctamente
if (orden?.empresaId) {
  empresaId.value = +orden.empresaId
}

const initialValues = computed(() => {
  return orden ? { ...schema.getDefault(), ...orden } : { ...schema.getDefault() }
})

const { handleSubmit, setFieldValue, values } = useForm<IOrden>({
  initialValues: initialValues.value,
  validationSchema: schema,
})

const submit = handleSubmit((values) => {
  // guardar(values)
  const formData = new FormData()

  // Agregar valores simples
  Object.keys(values).forEach((key) => {
    // Evitar meter file en esta parte
    if (key !== 'file') {
      // @ts-expect-error no usar
      formData.append(key, values[key])
    }
  })

  // Agregar archivo si existe
  if (values.file) {
    formData.append('file', values.file)
  }

  guardar(formData)
})

const seleccionarEmpleado = (payload: IEmpleado) => {
  setFieldValue('solicitanteId', payload.id)
}

const onFileSelect = (event: FileUploadSelectEvent) => {
  const file = event.files?.[0] ?? null
  setFieldValue('file', file)

  if (file) {
    pdfName.value = file.name
    const reader = new FileReader()
    reader.onload = () => {
      pdfPreview.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const onFileRemove = () => {
  setFieldValue('file', null)
  pdfPreview.value = null
  pdfName.value = null
}
</script>

<template>
  <form
    @submit="submit"
    :initialValues="initialValues"
    :validationSchema="schema"
    class="grid grid-cols-1 gap-3"
  >
    <Field name="referenciaSap" v-slot="{ field, meta, errors }">
      <div>
        <label for="referenciaSap">Numero de cotizacion</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="referenciaSap" class="text-red-500" />
      </div>
    </Field>

    <Field name="referencia" v-slot="{ field, meta, errors }">
      <div>
        <label for="referencia">Referencia O.T.</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
          :disabled="values.estatus === undefined"
        />
        <ErrorMessage name="referencia" class="text-red-500" />
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
          :modelValue="orden?.empresa.razonSocial"
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

    <Field name="solicitanteId" v-slot="{ meta, errors }">
      <div>
        <label for="solicitanteId">Empleado solicitante</label>
        <BusquedaEmpleados
          :nombre="formatearNombre(orden?.solicitante!)"
          :seleccionarEmpleado="seleccionarEmpleado"
          :boton="false"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="solicitanteId" class="text-red-500" />
      </div>
    </Field>

    <Field name="file" v-if="values.estatus == 'Creada'">
      <div>
        <label for="pdf">PDF de orden</label>
        <v-fileupload
          chooseLabel="Seleccionar archivo"
          cancelLabel="Cancelar"
          :showUploadButton="false"
          :multiple="false"
          accept="application/pdf"
          @select="onFileSelect"
          @remove="onFileRemove"
          @clear="onFileRemove"
          @removeUploadedFile="onFileRemove"
        >
          <template #content>
            <!-- Nombre del archivo -->
            <div v-if="pdfName" class="mt-2 text-sm text-gray-700">
              Archivo seleccionado: <strong>{{ pdfName }}</strong>
            </div>

            <!-- Previsualización PDF -->
            <div v-if="pdfPreview" class="mt-3 border rounded h-[400px]">
              <iframe :src="pdfPreview" class="w-full h-full rounded"></iframe>
            </div>

            <ErrorMessage name="file" class="text-red-500" />
          </template>
        </v-fileupload>
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
