import { getMisCursos } from '@/components/empleado/services/empleado'
import { useQuery } from '@tanstack/vue-query'

const useMisCursos = () => {
  return useQuery({
    queryKey: ['getMisCursos'],
    queryFn: () => getMisCursos(),
  })
}

export default useMisCursos
