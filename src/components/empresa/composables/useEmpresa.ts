import { useQuery } from '@tanstack/vue-query'
import { getEmpresa } from '../services/empresa'

const useEmpresa = (id: number) => {
  return useQuery({
    queryKey: ['getDepartamento'],
    queryFn: () => getEmpresa(id),
  })
}

export default useEmpresa
