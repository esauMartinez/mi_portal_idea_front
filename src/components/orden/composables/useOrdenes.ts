import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import type { IOrden } from '../interfaces/orden'
import { getOrdenes } from '../services/orden'
import { api_mi_portal } from '@/api'

const useOrdenes = () => {
  const ordenes = ref<IOrden[]>([])
  const estatus = ref<string>('Todas')
  const empresa = ref<number | null>(-100)

  const { data, isLoading } = useQuery({
    queryKey: ['getOrdenes', estatus, empresa],
    queryFn: () => getOrdenes(estatus.value, empresa.value!),
  })

  watch(data, (payload) => {
    if (payload) {
      ordenes.value = payload
    }
  })

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    referencia: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const opcionesEstatus = ref([
    { item: 'Creada', value: 'Creada' },
    { item: 'Liberada', value: 'Liberada' },
    { item: 'Cerrada', value: 'Cerrada' },
    { item: 'Todas', value: 'Todas' },
  ])

  const descargar = async (nombre: string) => {
    const { data } = await api_mi_portal.get(`/orden/file/${nombre}`, {
      responseType: 'blob',
    })

    abrirOdescargar(data)
  }

  const abrirOdescargar = (blob: Blob) => {
    const fileURL = URL.createObjectURL(blob)
    window.open(fileURL, '_blank') // abrir en nueva pestaña
  }

  const severity = (estatus: string) => {
    if (estatus === 'Creada') {
      return 'info'
    } else if (estatus === 'Liberada') {
      return 'sauccess'
    } else {
      return 'warn'
    }
  }

  return {
    ordenes,
    estatus,
    empresa,

    isLoading: computed(() => isLoading.value),

    filters,

    opcionesEstatus,

    severity,

    descargar,
  }
}

export default useOrdenes
