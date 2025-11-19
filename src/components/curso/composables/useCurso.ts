import { useQuery } from '@tanstack/vue-query'
import { getCurso } from '../services/curso'

const useCurso = (id: number) => {
  return useQuery({
    queryKey: ['getCurso'],
    queryFn: () => getCurso(id),
  })
}

export default useCurso
