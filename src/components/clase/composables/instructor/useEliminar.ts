import type { IErrors } from '@/interfaces/errors'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { computed } from 'vue'
import { mensajeError, mensajeOk, pregunta } from '@/helper/mensajes'
import { deleteInstructorClase } from '../../services/clase'

const useEliminar = () => {
  const queryClient = useQueryClient()

  const eliminarMutation = useMutation({
    mutationKey: ['deleteInstructorClase'],
    mutationFn: deleteInstructorClase,
    onMutate: () => {
      console.log('Eliminando instructor...')
    },
    onSuccess: (payload: string) => {
      mensajeOk(payload)
      queryClient.invalidateQueries({
        queryKey: ['getInstructoresClase'],
      })
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as IErrors
      mensajeError(data.errors[0]?.message)
    },
  })

  const eliminar = (id: number) => {
    pregunta('Estas seguro?', 'No podras revertir esto!').then(() => {
      eliminarMutation.mutate(id)
    })
  }

  return {
    isPending: computed(() => eliminarMutation.isPending.value),
    isSuccess: computed(() => eliminarMutation.isSuccess.value),

    eliminar,
  }
}

export default useEliminar
