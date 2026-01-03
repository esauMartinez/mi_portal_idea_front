import { mensajeError, mensajeOk, pregunta } from '@/helper/mensajes'
import { postEnlace } from '../services/clase'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import type { IEnlaceClase } from '../interfaces/enlaceClase'

const useEnlazarClase = () => {
  const queryClient = useQueryClient()

  const crearEnlazeClase = useMutation({
    mutationKey: ['postEnlace'],
    mutationFn: postEnlace,
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

  const enlazar = (padreId: number, hijoId: number) => {
    pregunta(
      '¿Deseas enlazar clases?',
      'Instructores, Técnicos inscritos y calificaciones serán afectados',
    ).then(() => {
      const data: IEnlaceClase = {
        padreId,
        hijoId,
      }
      crearEnlazeClase.mutate(data)
    })
  }

  return {
    enlazar,

    isPending: computed(() => crearEnlazeClase.isPending.value),
  }
}

export default useEnlazarClase
