import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/requerimiento'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraRequerimiento'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
