import { useQuery } from '@tanstack/vue-query'
import { getEmpleadosPorNombre } from '../services/empleado'
import { ref, watch } from 'vue'
import type { IEmpleado } from '../interfaces/empleado'
import { formatearNombre } from '@/helper/formatearNombre'

const useEmpleadosPorNombre = () => {
  const nombre = ref<string | null>(null)
  const empleados = ref<IEmpleado[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getEmpleadosPorNombre', nombre],
    queryFn: () => getEmpleadosPorNombre(nombre.value!),
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

    isLoading,

    search,
  }
}

export default useEmpleadosPorNombre
