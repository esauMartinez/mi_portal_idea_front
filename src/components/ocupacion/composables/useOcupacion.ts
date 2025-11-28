import { useQuery } from '@tanstack/vue-query'
import { getOcupacion } from '../services/ocupacion'

const useOcupacion = (id: number) => {
  return useQuery({
    queryKey: ['getOcupacion'],
    queryFn: () => getOcupacion(id),
  })
}

export default useOcupacion
