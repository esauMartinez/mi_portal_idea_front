import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import { postCalificaciones } from '../services/clase'
import { mensajeOk, mensajeWarning } from '@/helper/mensajes'

const useGuardarCalificaciones = () => {
  const queryClient = useQueryClient()

  const calificarMutation = useMutation({
    mutationKey: ['postCalificaciones'],
    mutationFn: postCalificaciones,
    onMutate: () => {
      console.log('Calificando clase...')
    },
    onSuccess: (payload: string) => {
      mensajeOk(payload)

      queryClient.invalidateQueries({
        queryKey: ['getAlumnosClase'],
      })
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as IErrors
      mensajeWarning(data.errors[0]?.message)
    },
  })

  return {
    isPending: computed(() => calificarMutation.isPending.value),
    isSuccess: computed(() => calificarMutation.isSuccess.value),

    calificarMutation,
  }
}

export default useGuardarCalificaciones
