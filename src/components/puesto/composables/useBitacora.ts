import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/puesto'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraPuesto'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
