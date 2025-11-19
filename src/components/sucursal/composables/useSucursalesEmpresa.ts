import { useQuery } from '@tanstack/vue-query'
import { getSucursalesEmpresa } from '../services/getSucursalesEmpresa'
import { ref } from 'vue'

const useSucursalesEmpresa = () => {
  const empresaId = ref<number | null>(null)

  const { data } = useQuery({
    queryKey: ['getSucursalesEmpresa', empresaId],
    queryFn: () => getSucursalesEmpresa(empresaId.value!),
    enabled: () => empresaId.value !== null,
  })

  return {
    empresaId,

    data,
  }
}

export default useSucursalesEmpresa
