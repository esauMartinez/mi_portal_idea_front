import { useMutation } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import { mensajeError, mensajeOkClick } from '@/helper/mensajes'
import { olvidada } from '../services/recuperar'

const useOlvidada = () => {
  const olvidadaMutation = useMutation({
    mutationKey: ['olvidada'],
    mutationFn: olvidada,
    onMutate: () => {
      console.log('Enviado...')
    },
    onSuccess: (payload: string) => {
      mensajeOkClick(payload)
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as IErrors
      mensajeError(data.errors[0]?.message)
    },
  })

  return {
    isPending: computed(() => olvidadaMutation.isPending.value),
    isSuccess: computed(() => olvidadaMutation.isSuccess.value),

    olvidadaMutation,
  }
}

export default useOlvidada
