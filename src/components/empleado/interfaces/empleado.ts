import type { IEmpresa } from '@/components/empresa/interfaces/empresa'
import type { IOcupacionEmpleado } from './ocupacionesEmpleado'
import type { IJerarquia } from './jerarquia'
import type { IPerfil } from '@/components/perfil/interfaces/perfil'
import type { IPuesto } from '@/components/puesto/interfaces/puesto'

export interface IEmpleado {
  id: number
  idUsuario: string
  primerNombre: string
  segundoNombre?: string
  apellidoPaterno: string
  apellidoMaterno?: string

  nombreCompleto: string

  fechaNacimiento: Date
  rfc: string
  curp: string
  activo: boolean
  email: string
  password: string
  verificado: boolean
  tipo: 'interno' | 'externo'
  instructor: boolean
  tieneUsuario: boolean
  fechaAlta: Date
  fechaBaja?: Date
  comentariosBaja?: string
  cargoId: number
  puestoId: number
  puesto?: IPuesto
  departamentoId: number
  sucursalId: number
  empresaId?: number
  empresa: IEmpresa
  perfilId?: number
  perfil: IPerfil
  centroCostoId?: number
  ocupacionesEmpleado: IOcupacionEmpleado[]

  padreId: number

  pathArchivo: string

  hijos: IJerarquia[]

  file: File | null
}
