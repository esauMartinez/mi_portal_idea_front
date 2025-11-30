import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { getAreasTematicasPorNombre } from '../services/areaTematica'
import type { IAreaTematica } from '../interfaces/area_tematica'

const useAreasTematicasPorNombre = () => {
  const nombre = ref<string | null>(null)
  const areasTematicas = ref<IAreaTematica[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getAreasTematicasPorNombre', nombre],
    queryFn: () => getAreasTematicasPorNombre(nombre.value!),
    enabled: () => nombre.value !== null,
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        areasTematicas.value = payload
      }
    },
    { immediate: true },
  )

  const buscarAreaTematica = async (event: { query: string }) => {
    nombre.value = event.query
  }

  return {
    areasTematicas,

    isLoading,

    buscarAreaTematica,
  }
}

export default useAreasTematicasPorNombre
