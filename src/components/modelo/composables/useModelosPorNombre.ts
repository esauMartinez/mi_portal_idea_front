import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { getModelosPorNombre } from '../services/modelo'
import type { IModelo } from '../interfaces/modelo'

const useModelosPorNombre = () => {
  const nombre = ref<string | null>(null)
  const modelos = ref<IModelo[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getModelosPorNombre', nombre],
    queryFn: () => getModelosPorNombre(nombre.value!),
    enabled: () => nombre.value !== null,
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        modelos.value = payload
      }
    },
    { immediate: true },
  )

  const buscarModelo = async (event: { query: string }) => {
    nombre.value = event.query
  }

  return {
    modelos,

    isLoading,

    buscarModelo,
  }
}

export default useModelosPorNombre
