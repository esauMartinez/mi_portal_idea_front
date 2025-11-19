import Swal from 'sweetalert2'

export const mensajeOk = (payload: string) => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: payload,
    showConfirmButton: false,
    timer: 1500,
  })
}

export const mensajeError = (payload: string | undefined) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: payload,
  })
}

export const mensajeWarning = (payload: string | undefined) => {
  Swal.fire({
    icon: 'warning',
    title: 'Oops...',
    text: payload,
  })
}

export const pregunta = (title: string, text: string) => {
  return new Promise((resolve) => {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0059ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Aceptar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true)
      }
    })
  })
}

export const observaciones = (title: string) => {
  return new Promise((resolve) => {
    Swal.fire({
      title,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonColor: '#0059ff',
      confirmButtonText: 'Aceptar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: false,
      preConfirm: async (comentarios) => {
        if (comentarios == '') {
          Swal.showValidationMessage(`Debes ingresar observaciones`)
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(result.value)
      }
    })
  })
}
