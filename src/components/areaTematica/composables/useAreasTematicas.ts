import { useQuery } from '@tanstack/vue-query'
import { getAreasTematicas } from '../services/areaTematica'
import { ref, watch } from 'vue'
import type { IAreaTematica } from '../interfaces/area_tematica'
import { FilterMatchMode } from '@primevue/core'

const useAreasTematicas = () => {
  const areasTematicas = ref<IAreaTematica[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getAreasTematicas'],
    queryFn: () => getAreasTematicas(),
  })

  watch(data, (payload) => {
    if (payload) {
      areasTematicas.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    areasTematicas,
    filters,

    isLoading,
  }
}

export default useAreasTematicas
