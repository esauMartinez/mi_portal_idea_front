import { useQuery } from '@tanstack/vue-query'
import { getDepartamentos } from '../services/departamento'
import { computed, ref, watch } from 'vue'
import type { IDepartamento } from '../interfaces/departamento'
import { FilterMatchMode } from '@primevue/core'

const useDepartamentos = () => {
  const departamentos = ref<IDepartamento[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getDepartamentos'],
    queryFn: () => getDepartamentos(),
  })

  watch(data, (payload) => {
    if (payload) {
      departamentos.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    departamentos,
    isLoading: computed(() => isLoading.value),
    filters,
  }
}

export default useDepartamentos
