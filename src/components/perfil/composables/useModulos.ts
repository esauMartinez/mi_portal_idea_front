import { useQuery } from '@tanstack/vue-query'
import { getModulos } from '../services/modulo'

const useModulos = () => {
  return useQuery({
    queryKey: ['getModulos'],
    queryFn: () => getModulos(),
  })
}

export default useModulos
