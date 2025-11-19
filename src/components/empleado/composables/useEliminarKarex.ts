import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import { deleteKardex } from '../services/empleado'
import { mensajeError, mensajeOk, pregunta } from '@/helper/mensajes'

const useEliminarKardex = () => {
  const queryClient = useQueryClient()

  const eliminarMutation = useMutation({
    mutationKey: ['deleteKardex'],
    mutationFn: deleteKardex,
    onMutate: () => {
      console.log('Eliminando...')
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

export default useEliminarKardex
