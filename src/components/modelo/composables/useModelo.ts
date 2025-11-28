import { useQuery } from '@tanstack/vue-query'
import { getModelo } from '../services/modelo'

const useModelo = (id: number) => {
  return useQuery({
    queryKey: ['getModelo'],
    queryFn: () => getModelo(id),
  })
}

export default useModelo
