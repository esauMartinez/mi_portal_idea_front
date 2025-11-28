import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import { mensajeError, mensajeOk } from '@/helper/mensajes'
import { updateAreaTematica } from '../services/areaTematica'

const useModificar = () => {
  const queryClient = useQueryClient()

  const modificarMutation = useMutation({
    mutationKey: ['updateAreaTematica'],
    mutationFn: updateAreaTematica,
    onMutate: () => {
      console.log('Modificando...')
    },
    onSuccess: (payload: string) => {
      mensajeOk(payload)

      queryClient.invalidateQueries({
        queryKey: ['getAreasTematicas'],
      })
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as IErrors
      mensajeError(data.errors[0]?.message)
    },
  })

  return {
    isPending: computed(() => modificarMutation.isPending.value),
    isSuccess: computed(() => modificarMutation.isSuccess.value),

    modificarMutation,
  }
}

export default useModificar
