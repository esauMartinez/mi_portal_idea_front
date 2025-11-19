import type { IEmpleado } from './empleado'

export interface Props {
  empleado?: IEmpleado
  cancelar: () => void
  guardar: (empleado: IEmpleado) => void
  pendiente: boolean
}

export interface PropsBusquedaEmpleados {
  disabled?: boolean
  seleccionarEmpleado: (empleado: IEmpleado) => void
}
