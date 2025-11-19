import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/centroCostos'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraCentroCosto'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
