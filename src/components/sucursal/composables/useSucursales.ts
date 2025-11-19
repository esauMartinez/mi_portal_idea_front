import { useQuery } from '@tanstack/vue-query'
import { getSucursales } from '../services/sucursal'
import type { ISucursal } from '../interfaces/sucursal'
import { computed, ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'

const useSucursales = () => {
  const sucursales = ref<ISucursal[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getSucursales'],
    queryFn: () => getSucursales(),
  })

  watch(data, (payload) => {
    if (payload) {
      sucursales.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    codigo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    direccion: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  return {
    sucursales,
    isLoading: computed(() => isLoading.value),

    filters,
  }
}

export default useSucursales
