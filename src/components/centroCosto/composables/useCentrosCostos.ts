import { useQuery } from '@tanstack/vue-query'
import { getCentrosCostos } from '../services/centroCostos'
import type { ICentroCosto } from '../interfaces/centro_costo'
import { computed, ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'

const useCentrosCostos = () => {
  const centrosCostos = ref<ICentroCosto[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getCentrosCostos'],
    queryFn: () => getCentrosCostos(),
  })

  watch(data, (payload) => {
    if (payload) {
      centrosCostos.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    clave: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    centrosCostos,
    isLoading: computed(() => isLoading.value),

    filters,
  }
}

export default useCentrosCostos
