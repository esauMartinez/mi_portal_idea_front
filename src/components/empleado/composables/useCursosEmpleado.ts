import { getCursosEmpleado } from '@/components/empleado/services/empleado'
import { useQuery } from '@tanstack/vue-query'

const useCursosEmpleado = (id: number) => {
  return useQuery({
    queryKey: ['getCursosEmpleado'],
    queryFn: () => getCursosEmpleado(id),
  })
}

export default useCursosEmpleado
