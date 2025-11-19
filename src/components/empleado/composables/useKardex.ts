import { useQuery } from '@tanstack/vue-query'
import { getKardex } from '../services/empleado'

const useKardex = (id: number) => {
  const { data } = useQuery({
    queryKey: ['getKardex'],
    queryFn: () => getKardex(id),
  })

  return {
    data,
  }
}

export default useKardex
