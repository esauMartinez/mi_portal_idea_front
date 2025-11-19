import { useQuery } from '@tanstack/vue-query'
import { getDepartamento } from '../services/departamento'

const useDepartamento = (id: number) => {
  return useQuery({
    queryKey: ['getDepartamento'],
    queryFn: () => getDepartamento(id),
  })
}

export default useDepartamento
