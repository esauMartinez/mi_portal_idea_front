import { useQuery } from '@tanstack/vue-query'
import { getRequerimiento } from '../services/requerimiento'

const useRequerimiento = (id: number) => {
  return useQuery({
    queryKey: ['getRequerimiento'],
    queryFn: () => getRequerimiento(id),
  })
}

export default useRequerimiento
