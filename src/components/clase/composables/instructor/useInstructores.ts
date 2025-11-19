import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { getInstructoresClase } from '../../services/clase'
import type { IClaseInstructor } from '../../interfaces/clase_instructor'

const useInstructores = () => {
  const claseId = ref<number | null>(null)
  const instructores = ref<IClaseInstructor[]>([])

  const { data } = useQuery({
    queryKey: ['getInstructoresClase', claseId],
    queryFn: () => getInstructoresClase(claseId.value!),
    enabled: () => claseId.value !== null,
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        instructores.value = payload
      }
    },
    { immediate: true },
  )

  return {
    claseId,
    instructores,
  }
}

export default useInstructores
