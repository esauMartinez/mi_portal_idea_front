import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { getCursosPorNombre } from '../services/curso'
import type { ICurso } from '../interfaces/curso'

const useCursosPorNombre = () => {
  const nombre = ref<string | null>(null)
  const cursos = ref<ICurso[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getCursosPorNombre', nombre],
    queryFn: () => getCursosPorNombre(nombre.value!),
    enabled: () => nombre.value !== null,
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        cursos.value = payload
      }
    },
    { immediate: true },
  )

  const buscarCurso = async (event: { query: string }) => {
    nombre.value = event.query
  }

  return {
    cursos,

    isLoading,

    buscarCurso,
  }
}

export default useCursosPorNombre
