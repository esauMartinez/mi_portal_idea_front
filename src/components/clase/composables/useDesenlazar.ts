import { mensajeError, mensajeOk, pregunta } from '@/helper/mensajes'
import { deleteEnlace } from '../services/clase'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
// import type { IEnlaceClase } from '../interfaces/enlaceClase'
import { computed } from 'vue'

const useDesenlazar = () => {
  const queryClient = useQueryClient()

  const desenlazarClase = useMutation({
    mutationKey: ['deleteEnlace'],
    mutationFn: deleteEnlace,
    onMutate: () => {
      console.log('Desenlazando...')
    },
    onSuccess: (payload: string) => {
      mensajeOk(payload)

      queryClient.invalidateQueries({
        queryKey: ['getClases'],
      })
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as IErrors
      mensajeError(data.errors[0]?.message)
    },
  })

  const desenlazar = (id: number) => {
    pregunta('Las clase se desenlazara', 'estas seguro?').then(() => {
      desenlazarClase.mutate(id)
    })
  }

  return {
    desenlazar,

    isPending: computed(() => desenlazarClase.isPending.value),
  }
}

export default useDesenlazar
