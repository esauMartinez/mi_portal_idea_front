import { getCertificadosPdf } from '../services/pdf'
import { useMutation } from '@tanstack/vue-query'
import type { IClaseEmpleado } from '@/components/clase/interfaces/clase_empleado'
import usePdf from './usePdf'

const usePdfsCertificados = () => {
  const { descargar } = usePdf()

  const certificados = useMutation({
    mutationKey: ['getCertificadosPdf'],
    mutationFn: getCertificadosPdf,
    onSuccess: (data: IClaseEmpleado[]) => {
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        descargar(element!)
      }
    },
  })

  const descargarCertificados = (payload: number[]) => {
    certificados.mutate(payload)
  }

  return {
    descargarCertificados,
  }
}

export default usePdfsCertificados
