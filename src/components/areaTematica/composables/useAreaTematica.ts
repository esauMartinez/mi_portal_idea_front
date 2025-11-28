import { useQuery } from '@tanstack/vue-query'
import { getAreaTematica } from '../services/areaTematica'

const useAreaTematica = (id: number) => {
  return useQuery({
    queryKey: ['getAreaTematica'],
    queryFn: () => getAreaTematica(id),
  })
}

export default useAreaTematica
