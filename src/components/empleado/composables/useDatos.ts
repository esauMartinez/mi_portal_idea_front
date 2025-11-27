import { ref } from 'vue'

const useDatos = () => {
  const activo = ref([
    { item: 'Activo', value: true },
    { item: 'Inactivo', value: false },
  ])

  const verificado = ref([
    { item: 'Si', value: true },
    { item: 'No', value: false },
  ])

  const tipoEmpleado = ref<{ item: string; value: 'interno' | 'externo' }[]>([
    { item: 'Interno', value: 'interno' },
    { item: 'Externo', value: 'externo' },
  ])

  const tipoEmpleadoRequerimiento = ref<{ item: string; value: 'instructor' | 'empleado' }[]>([
    { item: 'Instructor', value: 'instructor' },
    { item: 'Empleado', value: 'empleado' },
  ])

  const tipoCurso = ref<{ item: string; value: 'interno' | 'externo' }[]>([
    { item: 'Interno', value: 'interno' },
    { item: 'Externo', value: 'externo' },
  ])

  const opcionesTipoEmpleado = ref<{ item: string; value: 'interno' | 'externo' | 'todos' }[]>([
    { item: 'Interno', value: 'interno' },
    { item: 'Externo', value: 'externo' },
    { item: 'Todos', value: 'todos' },
  ])

  const tieneUsuario = ref([
    { item: 'Si', value: true },
    { item: 'No', value: false },
  ])

  const instructor = ref([
    { item: 'Si', value: true },
    { item: 'No', value: false },
  ])

  const opcionesInstructor = ref([
    { item: 'Si', value: 'si' },
    { item: 'No', value: 'no' },
    { item: 'Todos', value: 'todos' },
  ])

  const tipoClase = ref<{ item: string; value: 'presencial' | 'webinar' }[]>([
    { item: 'Presencial', value: 'presencial' },
    { item: 'Webinar', value: 'webinar' },
  ])

  const tieneOrden = ref([
    { item: 'Si', value: true },
    { item: 'No', value: false },
  ])

  return {
    activo,
    verificado,
    tipoEmpleado,
    opcionesTipoEmpleado,
    tieneUsuario,
    instructor,
    opcionesInstructor,
    tipoClase,
    tieneOrden,
    tipoCurso,
    tipoEmpleadoRequerimiento,
  }
}

export default useDatos
