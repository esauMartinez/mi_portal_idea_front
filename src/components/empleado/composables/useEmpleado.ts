import { useQuery } from '@tanstack/vue-query'
import { getEmpleado } from '../services/empleado'
import { computed } from 'vue'

const useEmpleado = (id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getEmpleado'],
    queryFn: () => getEmpleado(id),
  })

  return {
    data,
    isLoading: computed(() => isLoading.value),
  }
}

export default useEmpleado
