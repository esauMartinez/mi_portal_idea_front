import { useQuery } from '@tanstack/vue-query'
import { getClase } from '../services/clase'
import { computed, ref, watch } from 'vue'
import type { IClase } from '../interfaces/clase'

const useClase = (id: number) => {
  const clase = ref<IClase>({} as IClase)

  const { data, isPending } = useQuery({
    queryKey: ['getClase'],
    queryFn: () => getClase(id),
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        clase.value = payload
      }
    },
    { immediate: true, deep: true },
  )

  return {
    clase,

    isPending: computed(() => isPending.value),
  }
}

export default useClase
