import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import { postArchivosClase } from '../services/clase'
import { mensajeOk, mensajeWarning } from '@/helper/mensajes'

const useGuardarArchivosClase = () => {
  const queryClient = useQueryClient()

  const guardarArchivosClaseMutation = useMutation({
    mutationKey: ['postArchivosClase'],
    mutationFn: postArchivosClase,
    onMutate: () => {
      console.log('Subiendo archivos clase...')
    },
    onSuccess: (payload: string) => {
      mensajeOk(payload)

      queryClient.invalidateQueries({
        queryKey: ['getAlumnosClase'],
      })

      queryClient.invalidateQueries({
        queryKey: ['getArchivosClase'],
      })
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as IErrors
      mensajeWarning(data.errors[0]?.message)
    },
  })

  return {
    isPending: computed(() => guardarArchivosClaseMutation.isPending.value),
    isSuccess: computed(() => guardarArchivosClaseMutation.isSuccess.value),

    guardarArchivosClaseMutation,
  }
}

export default useGuardarArchivosClase
