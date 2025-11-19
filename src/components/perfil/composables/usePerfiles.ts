import { useQuery } from '@tanstack/vue-query'
import { getPerfiles } from '../services/perfil'
import { computed, ref, watch } from 'vue'
import type { IPerfil } from '../interfaces/perfil'
import { FilterMatchMode } from '@primevue/core/api'

const usePerfiles = () => {
  const perfiles = ref<IPerfil[]>([])
  const { data, isLoading } = useQuery({
    queryKey: ['getPerfiles'],
    queryFn: () => getPerfiles(),
  })

  watch(data, (payload) => {
    if (payload) {
      perfiles.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    perfiles,

    isLoading: computed(() => isLoading.value),

    filters,
  }
}

export default usePerfiles
