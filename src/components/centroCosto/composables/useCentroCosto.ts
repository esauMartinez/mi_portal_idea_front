import { useQuery } from '@tanstack/vue-query'
import { getCentroCosto } from '../services/centroCostos'

const useCentroCosto = (id: number) => {
  return useQuery({
    queryKey: ['getCentroCosto'],
    queryFn: () => getCentroCosto(id),
  })
}

export default useCentroCosto
