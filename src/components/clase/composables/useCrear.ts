import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import { postClase } from '../services/clase'
import { mensajeError, mensajeOk } from '@/helper/mensajes'

const useCrear = () => {
  const queryClient = useQueryClient()

  const crearmutation = useMutation({
    mutationKey: ['postClase'],
    mutationFn: postClase,
    onMutate: () => {
      console.log('Creando...')
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

  return {
    isPending: computed(() => crearmutation.isPending.value),
    isSuccess: computed(() => crearmutation.isSuccess.value),

    crearmutation,
  }
}

export default useCrear
