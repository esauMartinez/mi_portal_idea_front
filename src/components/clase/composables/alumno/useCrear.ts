import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import { mensajeOk, mensajeWarning } from '@/helper/mensajes'
import { postAlumnoClase } from '../../services/clase'

const useCrear = () => {
  const queryClient = useQueryClient()

  const crearMutation = useMutation({
    mutationKey: ['postAlumnoClase'],
    mutationFn: postAlumnoClase,
    onMutate: () => {
      console.log('Agregando alumno...')
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
    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation,
  }
}

export default useCrear
