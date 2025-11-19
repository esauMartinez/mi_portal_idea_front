import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/curso'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraCurso'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
