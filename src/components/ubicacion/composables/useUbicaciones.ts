import { useQuery } from '@tanstack/vue-query'
import { getUbicaciones } from '../services/ubicacion'
import { computed, ref, watch } from 'vue'
import type { IUbicacion } from '../interfaces/ubicacion'
import { FilterMatchMode } from '@primevue/core'

const useUbicaciones = () => {
  const ubicaciones = ref<IUbicacion[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getUbicaciones'],
    queryFn: () => getUbicaciones(),
  })

  watch(data, (payload) => {
    if (payload) {
      ubicaciones.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    ubicaciones,
    isLoading: computed(() => isLoading.value),
    filters,
  }
}

export default useUbicaciones
