import { useQuery } from '@tanstack/vue-query'
import { getUbicacion } from '../services/ubicacion'

const useUbicacion = (id: number) => {
  return useQuery({
    queryKey: ['getUbicacion'],
    queryFn: () => getUbicacion(id),
  })
}

export default useUbicacion
