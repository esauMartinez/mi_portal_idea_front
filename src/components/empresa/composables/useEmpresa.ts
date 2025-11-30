import { useQuery } from '@tanstack/vue-query'
import { getEmpresa } from '../services/empresa'
import { computed, ref, watch } from 'vue'
import type { IEmpresa } from '../interfaces/empresa'

const useEmpresa = (id: number) => {
  const empresa = ref<IEmpresa>({} as IEmpresa)

  const { data, isLoading } = useQuery({
    queryKey: ['getDepartamento'],
    queryFn: () => getEmpresa(id),
  })

  watch(data, (payload) => {
    if (payload) {
      empresa.value = payload
    }
  })

  return {
    empresa,

    isLoading: computed(() => isLoading.value),
  }
}

export default useEmpresa
