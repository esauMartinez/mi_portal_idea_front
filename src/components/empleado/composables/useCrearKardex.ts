import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import { postKardex } from '../services/empleado'
import { mensajeError, mensajeOk } from '@/helper/mensajes'

const useCrearKardex = () => {
  const queryClient = useQueryClient()

  const crearmutation = useMutation({
    mutationKey: ['postKardex'],
    mutationFn: postKardex,
    onMutate: () => {
      console.log('Creando...')
    },
    onSuccess: (payload: string) => {
      mensajeOk(payload)

      queryClient.invalidateQueries({
        queryKey: ['getKardex'],
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

export default useCrearKardex
