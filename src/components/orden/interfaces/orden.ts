import type { IEmpleado } from '@/components/empleado/interfaces/empleado'
import type { IEmpresa } from '@/components/empresa/interfaces/empresa'
import type { ISucursal } from '@/components/sucursal/interfaces/sucursal'

export interface IOrden {
  id: number
  referencia: string
  referenciaSap: string
  monto: number
  estatus: string
  empresaId: number
  empresa: IEmpresa
  sucursalId: number
  sucursal: ISucursal
  solicitanteId: number
  solicitante: IEmpleado
}
