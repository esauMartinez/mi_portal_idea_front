import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'
import { getAlumnosClase } from '../../services/clase'
import type { ICalificacionesClase } from '../../interfaces/calificacionesClase'

const useAlumnos = () => {
  const claseId = ref<number | null>(null)
  const clase = ref<ICalificacionesClase>({} as ICalificacionesClase)

  const { data, isLoading } = useQuery({
    queryKey: ['getAlumnosClase', claseId],
    queryFn: () => getAlumnosClase(claseId.value!),
    enabled: () => claseId.value !== null,
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        clase.value = payload
      }
    },
    { immediate: true },
  )

  return {
    claseId,
    clase,

    isLoading: computed(() => isLoading.value),
  }
}

export default useAlumnos
