import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/departamento'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraDepartamento'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
