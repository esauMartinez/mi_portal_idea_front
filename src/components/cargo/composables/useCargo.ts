import { useQuery } from '@tanstack/vue-query'
import { getCargo } from '../services/cargo'

const useCargo = (id: number) => {
  return useQuery({
    queryKey: ['getCargo'],
    queryFn: () => getCargo(id),
  })
}

export default useCargo
