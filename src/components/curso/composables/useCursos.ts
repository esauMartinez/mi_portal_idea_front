import { useQuery } from '@tanstack/vue-query'
import { getCursos } from '../services/curso'
import type { ICurso } from '../interfaces/curso'
import { computed, ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'

const useCursos = () => {
  const cursos = ref<ICurso[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getCursos'],
    queryFn: () => getCursos(),
  })

  watch(data, (payload) => {
    if (payload) {
      cursos.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    clave: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    cursos,
    isLoading: computed(() => isLoading.value),

    filters,
  }
}

export default useCursos
