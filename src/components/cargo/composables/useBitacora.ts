import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/cargo'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraCargo'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
