import { useQuery } from '@tanstack/vue-query'
import { getOcupaciones } from '../services/ocupacion'
import { computed, ref, watch } from 'vue'
import type { IOcupacion } from '../interfaces/ocupacion'
import { FilterMatchMode } from '@primevue/core'

const useOcupaciones = () => {
  const ocupaciones = ref<IOcupacion[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getOcupaciones'],
    queryFn: () => getOcupaciones(),
  })

  watch(data, (payload) => {
    if (payload) {
      ocupaciones.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    ocupaciones,
    filters,

    isLoading: computed(() => isLoading.value),
  }
}

export default useOcupaciones
