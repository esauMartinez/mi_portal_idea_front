import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/sucursal'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraSucursal'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
