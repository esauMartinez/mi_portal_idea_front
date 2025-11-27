import { useQuery } from '@tanstack/vue-query'
import { getClasesPadres } from '../services/clase'

const useClasesPadres = () => {
  return useQuery({
    queryKey: ['getClasesPadres'],
    queryFn: () => getClasesPadres(),
  })
}

export default useClasesPadres
