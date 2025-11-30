import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '../services/perfil'

const useBitacora = (id: number) => {
  return useQuery({
    queryKey: ['getBitacoraPerfil'],
    queryFn: () => getBitacora(id),
  })
}

export default useBitacora
