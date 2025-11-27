export interface IRequerimiento {
  id: number
  clave: string
  nombre: string
  estatus: boolean
  tipo: 'instructor' | 'empleado'
}
