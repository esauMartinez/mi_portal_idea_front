import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import { mensajeError, mensajeOk } from '@/helper/mensajes'
import { postOrden } from '../services/orden'

const useCrear = () => {
  const queryClient = useQueryClient()

  const crearMutation = useMutation({
    mutationKey: ['postOrden'],
    mutationFn: postOrden,
    onMutate: () => {
      console.log('Creando...')
    },
    onSuccess: (payload: string) => {
      mensajeOk(payload)

      queryClient.invalidateQueries({
        queryKey: ['getOrdenes'],
      })
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as IErrors
      mensajeError(data.errors[0]?.message)
    },
  })

  return {
    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation,
  }
}

export default useCrear
