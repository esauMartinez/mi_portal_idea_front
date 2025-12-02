import type { IEmpleado } from './empleado'

export interface Props {
  empleado?: IEmpleado
  cancelar: () => void
  guardar: (empleado: IEmpleado) => void
  pendiente: boolean
}

export interface PropsBusquedaEmpleados {
  nombre?: string
  disabled?: boolean
  activo?: boolean
  instructor?: boolean
  boton?: boolean
  pendiente?: boolean
  invalid?: boolean
  seleccionarEmpleado: (empleado: IEmpleado) => void
}
