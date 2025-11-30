<script setup lang="ts">
import { computed } from 'vue'
import type { Props } from '../interfaces/props'
import { schema } from '../helpers/schema'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import type { IClase } from '../interfaces/clase'
import moment from 'moment'
import { parseLocalDate } from '@/helper/parseLocalDate'
import type { IEmpleado } from '@/components/empleado/interfaces/empleado'
import BusquedaEmpleados from '@/components/empleado/components/BusquedaEmpleados.vue'
import useDatos from '@/components/empleado/composables/useDatos'
import useUbicaciones from '@/components/ubicacion/composables/useUbicaciones'
import useCursosPorNombre from '@/components/curso/composables/useCursosPorNombre'
import type { ICurso } from '@/components/curso/interfaces/curso'
import useOcupacionesPorNombre from '@/components/ocupacion/composables/useOcupacionesPorNombre'
import useAreasTematicasPorNombre from '@/components/areaTematica/composables/useAreasTematicasPorNombre'
import type { IAreaTematica } from '@/components/areaTematica/interfaces/area_tematica'
import type { IOcupacion } from '@/components/ocupacion/interfaces/ocupacion'
import useEmpresasPorNombre from '@/components/empresa/composables/useEmpresasPorNombre'
import type { IEmpresa } from '@/components/empresa/interfaces/empresa'

const { clase, guardar } = defineProps<Props>()
const { empresas, buscarEmpresa } = useEmpresasPorNombre()
const { tipoClase, tieneOrden } = useDatos()
const { ubicaciones } = useUbicaciones()
const { cursos, buscarCurso } = useCursosPorNombre()
const { ocupaciones, buscarOcupacion } = useOcupacionesPorNombre()
const { areasTematicas, buscarAreaTematica } = useAreasTematicasPorNombre()

const initialValues = computed(() => {
  return clase
    ? {
        ...schema.getDefault(),
        ...clase,
        fechaInicio: parseLocalDate(clase.fechaInicio),
        horaInicio: moment(
          `${clase.fechaInicio} ${clase.horaInicio}`,
          'YYYY-MM-DD HH:mm:ss',
        ).toDate(),
        fechaFinalizacion: parseLocalDate(clase.fechaFinalizacion),
        horaFinalizacion: moment(
          `${clase.fechaFinalizacion} ${clase.horaFinalizacion}`,
          'YYYY-MM-DD HH:mm:ss',
        ).toDate(),
        cursoId: clase.cursoId,
        representanteEmpresaId: clase.representanteEmpresaId,
        representanteEmpleadosId: clase.representanteEmpleadosId,
      }
    : {
        ...schema.getDefault(),
        fechaInicio: new Date(),
        fechaFinalizacion: new Date(),
        instructores: [],
        alumnos: [],
      }
})

const { handleSubmit, values, setFieldValue } = useForm<IClase>({
  initialValues: initialValues.value,
  validationSchema: schema,
})

const calcularDuracion = () => {
  const fecha1 = moment(values.fechaInicio).format('YYYY-MM-DD')
  const hora1 = moment(values.horaInicio).format('HH:mm')
  const fecha2 = moment(values.fechaFinalizacion).format('YYYY-MM-DD')
  const hora2 = moment(values.horaFinalizacion).format('HH:mm')
  const concatenacionf1 = moment(`${fecha1} ${hora1}:00`)
  const concatenacionf2 = moment(`${fecha2} ${hora2}:00`)
  const diff = concatenacionf2.diff(concatenacionf1, 'hours')
  setFieldValue('duracion', diff.toString())
}

const seleccionarRepresentanteEmpresa = (empleado: IEmpleado) => {
  setFieldValue('representanteEmpresaId', empleado.id)
}

const seleccionarRepresentanteEmpleados = (empleado: IEmpleado) => {
  setFieldValue('representanteEmpleadosId', empleado.id)
}

const submit = handleSubmit((values: IClase) => {
  guardar?.(values)
})
</script>

<template>
  <form
    @submit="submit"
    :initial-values="initialValues"
    :validation-schema="schema"
    class="grid grid-cols-1 gap-3"
  >
    <Field name="tineOrden" v-slot="{ field, meta, errors }">
      <div>
        <label for="tineOrden">Tiene orden de trabajo</label>
        <v-select
          fluid
          optionLabel="item"
          optionValue="value"
          :options="tieneOrden"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
          :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
        />
        <ErrorMessage name="tineOrden" class="text-red-500" />
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
                setFieldValue('empresaId', empresa.id)
              }
            }
          "
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="empresaId" class="text-red-500" />
      </div>
    </Field>

    <div class="grid grid-cols-2 gap-3">
      <Field name="fechaInicio" v-slot="{ field, meta, errors }">
        <div>
          <label for="fechaInicio">Fecha de inicio</label>
          <v-datepicker
            fluid
            showIcon
            dateFormat="dd/mm/yy"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            v-on:value-change="calcularDuracion"
            :minDate="values.fechaInicio"
            :invalid="meta.touched && errors.length > 0"
            :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
          />
          <ErrorMessage name="fechaInicio" class="text-red-500" />
        </div>
      </Field>

      <Field name="horaInicio" v-slot="{ field, meta, errors }">
        <div>
          <label for="horaInicio">Hora</label>
          <v-datepicker
            fluid
            showIcon
            timeOnly
            hourFormat="24"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            v-on:value-change="calcularDuracion"
            :invalid="meta.touched && errors.length > 0"
            :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
          />
          <ErrorMessage name="horaInicio" class="text-red-500" />
        </div>
      </Field>

      <Field name="fechaFinalizacion" v-slot="{ field, meta, errors }">
        <div>
          <label for="fechaFinalizacion">Fecha de finalizacion</label>
          <v-datepicker
            fluid
            showIcon
            dateFormat="dd/mm/yy"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            v-on:value-change="calcularDuracion"
            :invalid="meta.touched && errors.length > 0"
            :minDate="values.fechaInicio"
            :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
          />
          <ErrorMessage name="fechaFinalizacion" class="text-red-500" />
        </div>
      </Field>

      <Field name="horaFinalizacion" v-slot="{ field, meta, errors }">
        <div>
          <label for="horaFinalizacion">Hora</label>
          <v-datepicker
            fluid
            showIcon
            timeOnly
            hourFormat="24"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            v-on:value-change="calcularDuracion"
            :invalid="meta.touched && errors.length > 0"
            :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
          />
          <ErrorMessage name="horaFinalizacion" class="text-red-500" />
        </div>
      </Field>

      <Field name="duracion" v-slot="{ field, meta, errors }">
        <div class="col-span-2">
          <label for="duracion">Duracion</label>
          <v-inputtext
            fluid
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            :invalid="meta.touched && errors.length > 0"
            :disabled="true"
          />
          <ErrorMessage name="duracion" class="text-red-500" />
        </div>
      </Field>
    </div>

    <Field name="tipo" v-slot="{ field, meta, errors }">
      <div>
        <label for="tipo">Tipo de curso</label>
        <v-select
          fluid
          optionLabel="item"
          optionValue="value"
          :options="tipoClase"
          :modelValue="field.value"
          @update:modelValue="field.onChange"
          :invalid="meta.touched && errors.length > 0"
          :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
        />
        <ErrorMessage name="tipo" class="text-red-500" />
      </div>
    </Field>

    <!-- numero de alumnos -->
    <div class="grid grid-cols-2 gap-3">
      <Field name="minimoAlumnos" v-slot="{ field, meta, errors }">
        <div>
          <label for="minimoAlumnos">Minimo alumnos</label>
          <v-inputtext
            fluid
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            :invalid="meta.touched && errors.length > 0"
            :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
          />
          <ErrorMessage name="minimoAlumnos" class="text-red-500" />
        </div>
      </Field>

      <Field name="maximoAlumnos" v-slot="{ field, meta, errors }">
        <div>
          <label for="maximoAlumnos">Maximo de alumnos</label>
          <v-inputtext
            fluid
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            :invalid="meta.touched && errors.length > 0"
            :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
          />
          <ErrorMessage name="maximoAlumnos" class="text-red-500" />
        </div>
      </Field>
    </div>
    <!-- numero de alumnos -->

    <Field name="cursoId" v-slot="{ meta, errors }">
      <div>
        <label for="cursoId">Curso</label>
        <v-autocomplete
          fluid
          :suggestions="cursos"
          @complete="buscarCurso"
          optionLabel="nombre"
          @update:modelValue="
            (curso: ICurso) => {
              if (typeof curso === 'object') {
                setFieldValue('cursoId', curso.id)
              }
            }
          "
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="cursoId" class="text-red-500" />
      </div>
    </Field>

    <div class="grid grid-cols-2 gap-3">
      <Field name="ubicacionId" v-slot="{ field, meta, errors }">
        <div>
          <label for="ubicacionId">Ubicacion</label>
          <v-select
            fluid
            :options="ubicaciones"
            optionLabel="nombre"
            optionValue="id"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            :invalid="meta.touched && errors.length > 0"
            :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
          />
          <ErrorMessage name="ubicacionId" class="text-red-500" />
        </div>
      </Field>

      <Field name="sala" v-slot="{ field, meta, errors }">
        <div>
          <label for="sala">Sala</label>
          <v-inputtext
            fluid
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            :invalid="meta.touched && errors.length > 0"
            :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
          />
          <ErrorMessage name="sala" class="text-red-500" />
        </div>
      </Field>
    </div>

    <!-- <TablaRequerimientosCurso :requerimientosCurso="clase?.curso!.requerimientosCursos!" /> -->

    <Field name="ocupacionId" v-slot="{ meta, errors }">
      <div>
        <label for="ocupacionId">Ocupacion especifica</label>
        <v-autocomplete
          fluid
          :suggestions="ocupaciones"
          @complete="buscarOcupacion"
          optionLabel="nombre"
          @update:modelValue="
            (ocupacion: IOcupacion) => {
              if (typeof ocupacion === 'object') {
                setFieldValue('ocupacionId', ocupacion.id)
              }
            }
          "
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="ocupacionId" class="text-red-500" />
      </div>
    </Field>

    <Field name="areaTematicaId" v-slot="{ meta, errors }">
      <div>
        <label for="areaTematicaId">Area tematica</label>
        <v-autocomplete
          fluid
          :suggestions="areasTematicas"
          @complete="buscarAreaTematica"
          optionLabel="nombre"
          @update:modelValue="
            (areaTematica: IAreaTematica) => {
              if (typeof areaTematica === 'object') {
                setFieldValue('areaTematicaId', areaTematica.id)
              }
            }
          "
          :invalid="meta.touched && errors.length > 0"
        />
        <ErrorMessage name="areaTematicaId" class="text-red-500" />
      </div>
    </Field>

    <Field name="representanteEmpresaId">
      <div>
        <label for="representanteEmpresaId">Representante empresa</label>
        <BusquedaEmpleados
          :seleccionar-empleado="seleccionarRepresentanteEmpresa"
          :boton="false"
          :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
        />
        <ErrorMessage name="representanteEmpresaId" class="text-red-500" />
      </div>
    </Field>

    <Field name="representanteEmpleadosId">
      <div>
        <label for="representanteEmpleadosId">Representante trabajadores</label>
        <BusquedaEmpleados
          :seleccionar-empleado="seleccionarRepresentanteEmpleados"
          :boton="false"
          :disabled="clase?.estatus === 'en curso' || clase?.estatus === 'finalizada'"
        />
        <ErrorMessage name="representanteEmpleadosId" class="text-red-500" />
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

      <v-button
        icon="pi pi-save"
        label="Guardar"
        size="small"
        type="submit"
        :loading="pendiente"
        v-if="(clase?.estatus === 'pendiente' || clase?.estatus === undefined) && ver === false"
      />
    </div>
  </form>
</template>

<style scoped></style>
