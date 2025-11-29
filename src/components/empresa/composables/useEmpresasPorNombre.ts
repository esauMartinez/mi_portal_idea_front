import { useQuery } from '@tanstack/vue-query'
import { getEmpresasPorNombre } from '../services/empresa'
import { computed, ref, watch } from 'vue'
import type { IEmpresa } from '../interfaces/empresa'

const useEmpresasPorNombre = () => {
  const nombre = ref<string | null>(null)
  const empresas = ref<IEmpresa[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getEmpresas', nombre],
    queryFn: () => getEmpresasPorNombre(nombre.value!),
    enabled: () => nombre.value !== null,
  })

  watch(data, (payload) => {
    if (payload) {
      empresas.value = payload
    }
  })

  const buscarEmpresa = ({ query }: { query: string }) => {
    nombre.value = query
  }

  return {
    nombre,
    empresas,
    isLoading: computed(() => isLoading.value),
    buscarEmpresa,
  }
}

export default useEmpresasPorNombre
