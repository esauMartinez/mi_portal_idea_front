import { useQuery } from '@tanstack/vue-query'
import { getPuesto } from '../services/puesto'

const usePuesto = (id: number) => {
  return useQuery({
    queryKey: ['getPuesto'],
    queryFn: () => getPuesto(id),
  })
}

export default usePuesto
