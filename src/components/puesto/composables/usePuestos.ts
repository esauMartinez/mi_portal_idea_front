import { useQuery } from '@tanstack/vue-query'
import { getPuestos } from '../services/puesto'
import { computed, ref, watch } from 'vue'
import type { IPuesto } from '../interfaces/puesto'
import { FilterMatchMode } from '@primevue/core/api'

const usePuestos = () => {
  const puestos = ref<IPuesto[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getPuestos'],
    queryFn: () => getPuestos(),
  })

  watch(data, (payload) => {
    if (payload) {
      puestos.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    puestos,
    isLoading: computed(() => isLoading.value),

    filters,
  }
}

export default usePuestos
