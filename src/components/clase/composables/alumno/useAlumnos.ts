import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { getAlumnosClase } from '../../services/clase'
import type { IClaseEmpleado } from '../../interfaces/clase_empleado'

const useAlumnos = () => {
  const claseId = ref<number | null>(null)
  const alumnos = ref<IClaseEmpleado[]>([])

  const { data } = useQuery({
    queryKey: ['getAlumnosClase', claseId],
    queryFn: () => getAlumnosClase(claseId.value!),
    enabled: () => claseId.value !== null,
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        alumnos.value = payload
      }
    },
    { immediate: true },
  )

  return {
    claseId,
    alumnos,
  }
}

export default useAlumnos
