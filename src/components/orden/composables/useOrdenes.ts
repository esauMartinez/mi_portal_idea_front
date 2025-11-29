import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import type { IOrden } from '../interfaces/orden'
import { getOrdenes } from '../services/orden'

const useOrdenes = () => {
  const ordenes = ref<IOrden[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getOrdenes'],
    queryFn: () => getOrdenes(),
  })

  watch(data, (payload) => {
    if (payload) {
      ordenes.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    referencia: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    ordenes,

    isLoading: computed(() => isLoading.value),

    filters,
  }
}

export default useOrdenes
