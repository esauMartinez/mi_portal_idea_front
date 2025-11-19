import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import { deleteClase } from '../services/clase'
import type { IClase } from '../interfaces/clase'
import { mensajeError, mensajeOk, pregunta } from '@/helper/mensajes'

const useEliminar = () => {
  const queryClient = useQueryClient()

  const eliminarMutation = useMutation({
    mutationKey: ['deleteClase'],
    mutationFn: deleteClase,
    onMutate: () => {
      console.log('Eliminando...')
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

  const eliminar = (clase: IClase) => {
    pregunta('Estas seguro?', 'No podras revertir esto!').then(() => {
      eliminarMutation.mutate(clase)
    })
  }

  return {
    isPending: computed(() => eliminarMutation.isPending.value),
    isSuccess: computed(() => eliminarMutation.isSuccess.value),

    eliminar,
  }
}

export default useEliminar
