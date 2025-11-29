import { useQuery } from '@tanstack/vue-query'
import { getOrden } from '../services/orden'

const useOrden = (id: number) => {
  return useQuery({
    queryKey: ['getOrden'],
    queryFn: () => getOrden(id),
  })
}

export default useOrden
