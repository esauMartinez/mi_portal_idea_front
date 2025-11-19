import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { formatearNombre } from '@/helper/formatearNombre'
import { getJerarquia } from '../services/empleado'

interface TreeNode {
  key: string
  data: number
  empresa: string
  label: string
  principal: boolean
  children?: TreeNode[]
}

const useJerarquia = () => {
  const id = ref<number | null>(null)

  const {
    data: jerarquia,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getJerarquia', id],
    queryFn: () => getJerarquia(id.value!),
    enabled: () => id.value !== null,
    retry: 0,
  })

  const arbol = computed(() => {
    // Verificar que jerarquia.value existe y tiene elementos
    if (!jerarquia.value || !Array.isArray(jerarquia.value) || jerarquia.value.length === 0) {
      return null
    }

    const primerElemento = jerarquia.value[0]

    // Verificar que el primer elemento y sus propiedades existen
    if (!primerElemento || !primerElemento.padre) {
      return null
    }

    return {
      key: primerElemento.padreId.toString(),
      data: primerElemento.padreId,
      empresa: primerElemento.padre.empresa.razonSocial,
      label: formatearNombre(primerElemento.padre),
      principal: true,

      children: jerarquia.value.map((x) => {
        return {
          key: x.hijoId.toString(),
          data: x.hijoId,
          empresa: x.hijo?.empresa.razonSocial || 'Sin empresa',
          label: formatearNombre(x.hijo),
          principal: false,
          children: [],
        }
      }),
    } as TreeNode
  })

  const seleccionarid = (payload: number) => {
    id.value = payload
  }

  return {
    id,
    arbol,

    isLoading,
    error,

    seleccionarid,
  }
}

export default useJerarquia
