import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/areaTematica'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraAreaTematica'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
