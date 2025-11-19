import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/empresa'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraEmpresa'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
