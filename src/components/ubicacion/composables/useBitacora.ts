import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/ubicacion'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraUbicacion'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
