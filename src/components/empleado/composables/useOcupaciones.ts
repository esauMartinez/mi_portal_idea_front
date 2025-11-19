import { useQuery } from '@tanstack/vue-query'
import { getOcupaciones } from '../services/empleado'

const useOcupaciones = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getOcupaciones'],
    queryFn: () => getOcupaciones(),
  })

  return {
    data,

    isLoading,
  }
}

export default useOcupaciones
