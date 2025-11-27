import type { IClaseEmpleado } from '@/components/clase/interfaces/clase_empleado'
import { getMisCursos } from '@/components/empleado/services/empleado'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'

const useMisCursos = () => {
  const misCursos = ref<IClaseEmpleado[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getMisCursos'],
    queryFn: () => getMisCursos(),
  })

  watch(data, (payload) => {
    if (payload) {
      misCursos.value = payload
    }
  })

  return {
    misCursos,

    isLoading: computed(() => isLoading.value),
  }
}

export default useMisCursos
