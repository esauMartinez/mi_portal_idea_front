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

  const tieneUsuario = ref([
    { item: 'Si', value: true },
    { item: 'No', value: false },
  ])

  const instructor = ref([
    { item: 'Si', value: true },
    { item: 'No', value: false },
  ])

  const tipoClase = ref<{ item: string; value: 'presencial' | 'webinar' }[]>([
    { item: 'Presencial', value: 'presencial' },
    { item: 'Webinar', value: 'webinar' },
  ])

  return {
    activo,
    verificado,
    tipoEmpleado,
    tieneUsuario,
    instructor,
    tipoClase,
  }
}

export default useDatos
