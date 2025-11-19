import { useQuery } from '@tanstack/vue-query'
import { getEmpleados } from '../services/empleado'
import { computed, ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import type { IEmpleado } from '../interfaces/empleado'
import { formatearNombre } from '@/helper/formatearNombre'

const useEmpleados = () => {
  const empleados = ref<IEmpleado[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getEmpleados'],
    queryFn: () => getEmpleados(),
  })

  watch(data, (payload) => {
    if (payload) {
      empleados.value = payload.map((x) => ({
        ...x,
        nombreCompleto: formatearNombre(x),
      }))
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombreCompleto: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    empleados,
    isLoading: computed(() => isLoading.value),

    filters,
  }
}

export default useEmpleados
