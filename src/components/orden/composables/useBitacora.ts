import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/orden'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraOrden'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
