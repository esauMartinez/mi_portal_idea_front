import * as yup from 'yup'

export const schemaArchivos = yup.object({
  files: yup
    .array()
    .of(
      yup
        .mixed<File>()
        .required()
        .test(
          'fileSize',
          'Cada archivo debe pesar máximo 10MB',
          (file) => !!file && file.size <= 10_000_000,
        ),
    )
    .min(1, 'Debes subir al menos un archivo')
    .required('Debes subir al menos un archivo'),
})
