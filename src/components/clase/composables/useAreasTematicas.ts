import { useQuery } from '@tanstack/vue-query'
import { getAreasTematicas } from '../services/clase'

const useAreasTematicas = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getAreasTematicas'],
    queryFn: () => getAreasTematicas(),
  })

  return {
    data,

    isLoading,
  }
}

export default useAreasTematicas
