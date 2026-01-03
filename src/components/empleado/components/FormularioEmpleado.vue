<script setup lang="ts">
import { ErrorMessage, Field, useForm } from 'vee-validate'
import type { Props } from '../interfaces/props'
import useDatos from '@/composables/useDatos'
import type { IEmpleado } from '../interfaces/empleado'
import { getSchema } from '../helpers/schema'
import { computed } from 'vue'
import useCargos from '@/components/cargo/composables/useCargos'
import usePuestos from '@/components/puesto/composables/usePuestos'
import useDepartamentos from '@/components/departamento/composables/useDepartamentos'
import useSucursalesEmpresa from '@/components/sucursal/composables/useSucursalesEmpresa'
import usePerfiles from '@/components/perfil/composables/usePerfiles'
import useCentrosCostos from '@/components/centroCosto/composables/useCentrosCostos'
import { formatearNombre } from '@/helper/formatearNombre'
import { ref } from 'vue'
import BusquedaEmpleados from './BusquedaEmpleados.vue'
import useOcupaciones from '@/components/ocupacion/composables/useOcupaciones'
import useEmpresasPorNombre from '@/components/empresa/composables/useEmpresasPorNombre'
import type { IEmpresa } from '@/components/empresa/interfaces/empresa'
import type { FileUploadSelectEvent } from 'primevue'
import { apiUrl } from '@/api'

const { empleado, cancelar, guardar } = defineProps<Props>()
const { activo, verificado, tipoEmpleado, tieneUsuario, instructor } = useDatos()
const { cargos } = useCargos()
const { puestos } = usePuestos()
const { departamentos } = useDepartamentos()
const { empresas, buscarEmpresa } = useEmpresasPorNombre()
const { empresaId, data: sucursales } = useSucursalesEmpresa()
const { perfiles } = usePerfiles()
const { centrosCostos } = useCentrosCostos()
const { ocupaciones } = useOcupaciones()

const padre = ref()
const imagePreview = ref<string | null>(null)
const imageName = ref<string | null>(null)

// Inicializar empresaId correctamente
if (empleado?.empresaId) {
  empresaId.value = +empleado.empresaId
}

// Computed para el padre (sin asignar a padre.value)
const padreFormateado = computed(() => {
  const padreEmpleado = empleado?.hijos?.[0]?.padre
  return padreEmpleado ? formatearNombre({ ...padreEmpleado }) : ''
})

padre.value = padreFormateado.value

const initialValues = computed(() => {
  return empleado
    ? {
        ...getSchema(true).getDefault(),
        ...empleado,
      }
    : { ...getSchema(false).getDefault() }
})

const { handleSubmit, setFieldValue, values } = useForm<IEmpleado>({
  initialValues: initialValues.value,
  validationSchema: empleado ? getSchema(true) : getSchema(false),
})

const seleccionarEmpleado = (empleado: IEmpleado) => {
  setFieldValue('padreId', empleado.id)
}

const onFileSelect = (event: FileUploadSelectEvent) => {
  const file = event.files?.[0] ?? null
  setFieldValue('file', file)

  if (file) {
    imageName.value = file.name

    const reader = new FileReader()
    reader.onload = () => {
      imagePreview.value = reader.result as string // base64 para <img>
    }
    reader.readAsDataURL(file) // convierte imagen a base64
  }
}

const onFileRemove = () => {
  setFieldValue('file', null)
  imagePreview.value = null
  imageName.value = null
}

const onSubmit = handleSubmit((values) => {
  // guardar(values)
  const formData = new FormData()

  // Agregar valores simples
  Object.keys(values).forEach((key) => {
    // Evitar meter file en esta parte
    if (key !== 'file') {
      if (key === 'ocupacionesEmpleado') {
        formData.append(key, JSON.stringify(values[key]))
      } else {
        // @ts-expect-error no usar
        formData.append(key, values[key])
      }
    }
  })

  // Agregar archivo si existe
  if (values.file) {
    formData.append('file', values.file)
  }

  guardar(formData)
  // guardar(values)
})
</script>

<template>
  <form
    @submit="onSubmit"
    :initial-values="initialValues"
    :validation-schema="empleado ? getSchema(true) : getSchema(false)"
    class="grid grid-cols-1 gap-3"
  >
    <Field name="tipo" v-slot="{ field, meta, errors }">
      <div>
        <label for="tipo">Tipo de empleado</label>
        <v-select
          fluid
          :options="tipoEmpleado"
          optionLabel="item"
          optionValue="value"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="tipo" class="text-red-500" />
      </div>
    </Field>

    <Field name="idUsuario" v-slot="{ field, meta, errors }" v-if="values.tipo === 'interno'">
      <div>
        <label for="idUsuario">Numero de empleado</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="idUsuario" class="text-red-500" />
      </div>
    </Field>

    <Field name="primerNombre" v-slot="{ field, meta, errors }">
      <div>
        <label for="primerNombre">Primer nombre</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="primerNombre" class="text-red-500" />
      </div>
    </Field>

    <Field name="segundoNombre" v-slot="{ field, meta, errors }">
      <div>
        <label for="segundoNombre">Segundo nombre</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="segundoNombre" class="text-red-500" />
      </div>
    </Field>

    <Field name="apellidoPaterno" v-slot="{ field, meta, errors }">
      <div>
        <label for="apellidoPaterno">Apellido paterno</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="apellidoPaterno" class="text-red-500" />
      </div>
    </Field>

    <Field name="apellidoMaterno" v-slot="{ field, meta, errors }">
      <div>
        <label for="apellidoMaterno">Apellido materno</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="apellidoMaterno" class="text-red-500" />
      </div>
    </Field>

    <Field name="fechaNacimiento" v-slot="{ field, meta, errors }">
      <div>
        <label for="fechaNacimiento">Fecha de nacimiento</label>
        <v-datepicker
          fluid
          dateFormat="yy-mm-dd"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="fechaNacimiento" class="text-red-500" />
      </div>
    </Field>

    <Field name="rfc" v-slot="{ field, meta, errors }">
      <div>
        <label for="rfc">RFC</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="rfc" class="text-red-500" />
      </div>
    </Field>

    <Field name="curp" v-slot="{ field, meta, errors }">
      <div>
        <label for="curp">CURP</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="curp" class="text-red-500" />
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
          disabled
        />
        <ErrorMessage name="activo" class="text-red-500" />
      </div>
    </Field>

    <Field name="email" v-slot="{ field, meta, errors }">
      <div>
        <label for="email">Correo</label>
        <v-inputtext
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="email" class="text-red-500" />
      </div>
    </Field>

    <Field name="tieneUsuario" v-slot="{ field, meta, errors }">
      <div>
        <label for="tieneUsuario">Tiene usuario en el sistema?</label>
        <v-select
          fluid
          :options="tieneUsuario"
          optionLabel="item"
          optionValue="value"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="tieneUsuario" class="text-red-500" />
      </div>
    </Field>

    <Field name="password" v-slot="{ field, meta, errors }" v-if="values.tieneUsuario">
      <div>
        <label for="password">Password</label>
        <v-password
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
          toggleMask
        />
        <ErrorMessage name="password" class="text-red-500" />
      </div>
    </Field>

    <Field name="verificarPassword" v-slot="{ field, meta, errors }" v-if="values.tieneUsuario">
      <div>
        <label for="verificarPassword">Verificar password</label>
        <v-password
          fluid
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
          :feedback="false"
          toggleMask
        />
        <ErrorMessage name="verificarPassword" class="text-red-500" />
      </div>
    </Field>

    <Field name="perfilId" v-slot="{ field, meta, errors }" v-if="values.tieneUsuario">
      <div>
        <label for="perfilId">Perfil de usuario</label>
        <v-select
          fluid
          :options="perfiles"
          optionLabel="nombre"
          optionValue="id"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="perfilId" class="text-red-500" />
      </div>
    </Field>

    <Field name="verificado" v-slot="{ field, meta, errors }" v-if="values.tieneUsuario">
      <div>
        <label for="verificado">Cuenta verificada</label>
        <v-select
          fluid
          :options="verificado"
          optionLabel="item"
          optionValue="value"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="verificado" class="text-red-500" />
      </div>
    </Field>

    <Field name="instructor" v-slot="{ field, meta, errors }">
      <div>
        <label for="instructor">Es instructor?</label>
        <v-select
          fluid
          :options="instructor"
          optionLabel="item"
          optionValue="value"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="instructor" class="text-red-500" />
      </div>
    </Field>

    <Field name="empresaId" v-slot="{ meta, errors }">
      <div>
        <label for="empresaId">Empresa</label>
        <v-autocomplete
          fluid
          :modelValue="empleado?.empresa.razonSocial"
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

    <Field name="sucursalId" v-slot="{ field, meta, errors }" v-if="values.tipo === 'interno'">
      <div>
        <label for="sucursalId">Sucursal</label>
        <v-select
          fluid
          :options="sucursales"
          optionLabel="nombre"
          optionValue="id"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="sucursalId" class="text-red-500" />
      </div>
    </Field>

    <Field name="ocupacionesEmpleado" v-slot="{ field, meta, errors }">
      <div>
        <label for="ocupacionesEmpleado">Ocupaciones especificas</label>
        <v-multiselect
          filter
          fluid
          :options="ocupaciones"
          optionLabel="nombre"
          optionValue="id"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length !== 0"
        />
        <ErrorMessage name="ocupacionesEmpleado" class="text-red-500" />
      </div>
    </Field>

    <Field name="cargoId" v-slot="{ field, meta, errors }">
      <div>
        <label for="cargoId">Cargo</label>
        <v-select
          fluid
          :options="cargos"
          optionLabel="nombre"
          optionValue="id"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="cargoId" class="text-red-500" />
      </div>
    </Field>

    <Field name="puestoId" v-slot="{ field, meta, errors }" v-if="values.tipo === 'interno'">
      <div>
        <label for="puestoId">Puesto</label>
        <v-select
          fluid
          :options="puestos"
          optionLabel="nombre"
          optionValue="id"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="puestoId" class="text-red-500" />
      </div>
    </Field>

    <Field name="departamentoId" v-slot="{ field, meta, errors }" v-if="values.tipo === 'interno'">
      <div>
        <label for="departamentoId">Departamento</label>
        <v-select
          fluid
          :options="departamentos"
          optionLabel="nombre"
          optionValue="id"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="departamentoId" class="text-red-500" />
      </div>
    </Field>

    <Field name="centroCostoId" v-slot="{ field, meta, errors }" v-if="values.tipo === 'interno'">
      <div>
        <label for="centroCostoId">Centro de costos</label>
        <v-select
          fluid
          filter
          :options="centrosCostos"
          optionValue="id"
          optionLabel="nombre"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
        >
          <template #option="slotProps">
            {{ slotProps.option.clave }}-{{ slotProps.option.nombre }}
          </template>
        </v-select>
        <ErrorMessage name="centroCostoId" class="text-red-500" />
      </div>
    </Field>

    <Field name="padreId">
      <div>
        <label for="padreId">Depende de:</label>
        <BusquedaEmpleados
          :nombre="formatearNombre(empleado?.hijos[0]?.padre!)"
          :seleccionarEmpleado="seleccionarEmpleado"
          :boton="false"
        />
        <ErrorMessage name="padreId" class="text-red-500" />
      </div>
    </Field>

    <Field name="file">
      <div>
        <label for="pdf">PDF de orden</label>
        <v-fileupload
          chooseLabel="Seleccionar archivo"
          cancelLabel="Cancelar"
          :showUploadButton="false"
          :multiple="false"
          accept="image/*"
          @select="onFileSelect"
          @remove="onFileRemove"
          @clear="onFileRemove"
          @removeUploadedFile="onFileRemove"
        >
          <template #content>
            <!-- Nombre del archivo -->
            <div v-if="imageName" class="mt-2 text-sm text-gray-700">
              Archivo seleccionado: <strong>{{ imageName }}</strong>
            </div>

            <!-- Previsualización PDF -->
            <div v-if="imagePreview" class="mt-3 border rounded h-[400px]">
              <iframe :src="imagePreview" class="w-full h-full rounded"></iframe>
            </div>

            <div
              v-if="empleado?.pathArchivo !== null && !imagePreview"
              class="mt-3 border rounded h-[400px]"
            >
              <img :src="`${apiUrl}/archivos/${empleado?.pathArchivo}`" />
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
