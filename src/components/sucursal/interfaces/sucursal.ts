import type { IEmpresa } from '@/components/empresa/interfaces/empresa'

export interface ISucursal {
  id: number
  nombre: string
  codigo: string
  descripcion: string
  activo: boolean
  direccion: string
  empresaId: number
  empresa?: IEmpresa
}
