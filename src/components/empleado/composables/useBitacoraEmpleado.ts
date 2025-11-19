import { useQuery } from '@tanstack/vue-query'
import { getBitacoraEmpleado } from '../services/empleado'

const useBitacoraEmpleado = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraEmpleado'],
    queryFn: () => getBitacoraEmpleado(id),
  })
}

export default useBitacoraEmpleado
