import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/ocupacion'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraOcupacion'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
