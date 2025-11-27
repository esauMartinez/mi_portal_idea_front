import { useQuery } from '@tanstack/vue-query'
import { getEmpleadosPorNombre } from '../services/empleado'
import { ref, watch } from 'vue'
import type { IEmpleado } from '../interfaces/empleado'
import { formatearNombre } from '@/helper/formatearNombre'

const useEmpleadosPorNombre = () => {
  const nombre = ref<string | null>(null)
  const activo = ref<boolean>(false)
  const instructor = ref<boolean>(false)
  const empleados = ref<IEmpleado[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getEmpleadosPorNombre', nombre, activo, instructor],
    queryFn: () => getEmpleadosPorNombre(nombre.value!, activo.value, instructor.value),
    enabled: () => nombre.value !== null,
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        empleados.value = payload.map((x) => ({ ...x, nombreCompleto: formatearNombre(x) }))
      }
    },
    { immediate: true },
  )

  const search = async (event: { query: string }) => {
    nombre.value = event.query
  }

  return {
    empleados,
    nombre,
    activo,
    instructor,

    isLoading,

    search,
  }
}

export default useEmpleadosPorNombre
