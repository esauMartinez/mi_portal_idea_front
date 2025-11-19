import { useQuery } from '@tanstack/vue-query'
import { getSucursal } from '../services/sucursal'

const useSucursal = (id: number) => {
  return useQuery({
    queryKey: ['getSucursal'],
    queryFn: () => getSucursal(id),
  })
}

export default useSucursal
