import { useQuery } from '@tanstack/vue-query'
import { getCargos } from '../services/cargo'
import type { ICargo } from '../interfaces/cargo'
import { computed, ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'

const useCargos = () => {
  const cargos = ref<ICargo[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getCargos'],
    queryFn: () => getCargos(),
  })

  watch(data, (payload) => {
    if (payload) {
      cargos.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    codigo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    cargos,
    isLoading: computed(() => isLoading.value),

    filters,
  }
}

export default useCargos
