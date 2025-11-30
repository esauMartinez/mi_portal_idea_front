import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/clase'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraClase'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
