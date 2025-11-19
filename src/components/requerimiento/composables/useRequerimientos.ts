import { useQuery } from '@tanstack/vue-query'
import { getRequerimientos } from '../services/requerimiento'
import type { IRequerimiento } from '../interface/requerimineto'
import { computed, ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'

const useRequeriminetos = () => {
  const requerimientos = ref<IRequerimiento[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getRequerimientos'],
    queryFn: () => getRequerimientos(),
  })

  watch(data, (payload) => {
    if (payload) {
      requerimientos.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    clave: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    requerimientos,

    isLoading: computed(() => isLoading.value),

    filters,
  }
}

export default useRequeriminetos
