import { useQuery } from '@tanstack/vue-query'
import { getClases } from '../services/clase'
import { computed, ref, watch } from 'vue'
import moment from 'moment'
import type { IClase } from '../interfaces/clase'

const useClases = () => {
  const inicio = ref(moment().startOf('month').format('YYYY-MM-DD'))
  const fin = ref(moment().add(1, 'month').endOf('month').format('YYYY-MM-DD'))
  const estatus = ref('todos')
  const clases = ref<IClase[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['getClases', inicio, fin, estatus],
    queryFn: () => getClases(inicio.value, fin.value, estatus.value),
  })

  watch(data, (payload) => {
    if (payload) {
      clases.value = payload.map((x) => ({ ...x }))
    }
  })

  const colorClase = (estatus: string) => {
    if (estatus === 'en curso') {
      return 'warn'
    } else if (estatus === 'finalizada') {
      return 'success'
    }
    return
  }

  return {
    inicio,
    fin,
    estatus,

    isLoading: computed(() => isLoading.value),

    clases,
    data,

    colorClase,
  }
}

export default useClases
