import { useQuery } from '@tanstack/vue-query'
import { getPerfil } from '../services/perfil'

const usePerfil = (id: number) => {
  return useQuery({
    queryKey: ['getPerfil'],
    queryFn: () => getPerfil(id),
  })
}

export default usePerfil
