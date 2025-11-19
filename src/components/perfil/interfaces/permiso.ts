import type { IModulo } from './modulo'

export interface IPermiso {
  id: number
  nombre: string
  descripcion: string
  moduloId: number

  modulo: IModulo

  seleccionado: boolean
}
