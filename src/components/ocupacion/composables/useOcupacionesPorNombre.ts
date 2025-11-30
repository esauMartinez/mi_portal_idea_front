import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { getOcupacionesPorNombre } from '../services/ocupacion'
import type { IOcupacion } from '../interfaces/ocupacion'

const useOcupacionesPorNombre = () => {
  const nombre = ref<string | null>(null)
  const ocupaciones = ref<IOcupacion[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getOcupacionesPorNombre', nombre],
    queryFn: () => getOcupacionesPorNombre(nombre.value!),
    enabled: () => nombre.value !== null,
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        ocupaciones.value = payload
      }
    },
    { immediate: true },
  )

  const buscarOcupacion = async (event: { query: string }) => {
    nombre.value = event.query
  }

  return {
    ocupaciones,

    isLoading,

    buscarOcupacion,
  }
}

export default useOcupacionesPorNombre
