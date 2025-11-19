import { useQuery } from '@tanstack/vue-query'
import { getEmpresas } from '../services/empresa'
import { computed, ref, watch } from 'vue'
import type { IEmpresa } from '../interfaces/empresa'
import { FilterMatchMode } from '@primevue/core'

const useEmpresas = () => {
  const empresas = ref<IEmpresa[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getEmpresas'],
    queryFn: () => getEmpresas(),
  })

  watch(data, (payload) => {
    if (payload) {
      empresas.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    razonSocial: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    rfc: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    empresas,
    isLoading: computed(() => isLoading.value),
    filters,
  }
}

export default useEmpresas
