import { mensajeError, mensajeOk, mensajeWarning, pregunta } from '@/helper/mensajes'
import type { IClase } from '../interfaces/clase'
import { postEnlaces } from '../services/clase'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import type { IEnlaceClase } from '../interfaces/enlaceClase'

const useEnlazar = () => {
  const queryClient = useQueryClient()

  const crearEnlaze = useMutation({
    mutationKey: ['postClase'],
    mutationFn: postEnlaces,
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

  const enlazar = (clases: IClase[]) => {
    const clasesAEnlazar = clases.filter((x) => x.enlazada)
    if (clasesAEnlazar.length < 2) {
      return mensajeWarning('Debes seleccionar al menos 2 clases para enlazar')
    }

    const enlaces = clasesAEnlazar.map((x) => {
      if (x.enlazada) {
        return {
          padreId: clasesAEnlazar[0]?.id,
          hijoId: x.id,
        }
      }
    }) as IEnlaceClase[]

    pregunta('Las clases se enlazaran', 'estas seguro?').then(() => {
      crearEnlaze.mutate(enlaces)
    })
  }

  return {
    enlazar,
  }
}

export default useEnlazar
