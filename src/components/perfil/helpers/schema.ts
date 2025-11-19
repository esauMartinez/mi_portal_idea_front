import * as yup from 'yup'
// import type { IPerfilPermiso } from '../interfaces/perfilPermiso'

export const schema = yup.object({
  nombre: yup.string().required('El campo es requerido'),
  // permisosPerfil: yup
  //   .array<IPerfilPermiso[]>()
  //   .min(1, 'Debe tener al menos un permiso')
  //   .required('El campo es requerido'),
})
