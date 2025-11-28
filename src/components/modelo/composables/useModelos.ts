import { computed, ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core'
import { getModelos } from '../services/modelo'
import type { IModelo } from '../interfaces/modelo'
import { useQuery } from '@tanstack/vue-query'

const useModelos = () => {
  const modelos = ref<IModelo[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getModelos'],
    queryFn: () => getModelos(),
  })

  watch(data, (payload) => {
    if (payload) {
      modelos.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    modelos,
    filters,

    isLoading: computed(() => isLoading.value),
  }
}

export default useModelos
