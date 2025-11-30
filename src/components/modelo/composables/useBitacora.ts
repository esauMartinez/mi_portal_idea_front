import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/modelo'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraModelo'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
