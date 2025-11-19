/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/vue-query'
import { getDatosPdf } from '../services/pdf'
import { computed, ref, watch } from 'vue'
import pdfMake from 'pdfmake/build/pdfmake'
import 'pdfmake/build/vfs_fonts'
import type { Content, TDocumentDefinitions } from 'pdfmake/interfaces'
import moment from 'moment'
import { formatearNombre } from '@/helper/formatearNombre'
import type { IClaseEmpleado } from '@/components/clase/interfaces/clase_empleado'

const usePdfCertificado = () => {
  const id = ref<number | null>(null)
  const pdfUrl = ref<string>('')
  const empleado = ref<string>('')
  const docDefinition = ref({} as any)

  const { data, isLoading } = useQuery({
    queryKey: ['getDatosPdf'],
    queryFn: () => getDatosPdf(id.value!),
    enabled: () => id.value !== null,
  })

  const generarContenidoPdf = (payload: IClaseEmpleado) => {
    empleado.value = `${payload.empleado?.apellidoPaterno} ${payload.empleado?.apellidoMaterno} ${payload.empleado?.primerNombre} ${payload.empleado?.segundoNombre}`
    const representanteEmpresa = payload.clase.representanteEmpresa
      ? formatearNombre(payload.clase.representanteEmpresa)
      : 'S/D'
    const representanteEmpleados = payload.clase.representanteEmpleados
      ? formatearNombre(payload.clase.representanteEmpleados)
      : 'S/D'

    const content: Content[] = [
      // Logo
      {
        image:
          'data:image/png;base64,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',
        width: 60,
        margin: [0, 10, 0, 20],
      },

      // Título
      { text: 'FORMATO DC-3', style: 'header', alignment: 'center' },
      {
        text: 'CONSTANCIA DE COMPETENCIAS O DE HABILIDADES LABORALES',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          widths: ['50%', '50%'],
          body: [
            // Encabezado de sección
            [
              {
                text: 'DATOS DEL TRABAJADOR',
                style: 'sectionHeader',
                fillColor: '#000000',
                color: '#ffffff',
                colSpan: 2,
                alignment: 'center',
              },
              {},
            ],
            // Etiqueta: Nombre
            [
              {
                text: 'Nombre (Anotar apellido paterno, apellido materno y nombre (s))',
                border: [true, true, true, false],
                fontSize: 8,
                colSpan: 2,
              },
              {},
            ],
            // Valor: Nombre completo
            [
              {
                text: `${empleado.value}`,
                bold: false,
                margin: [0, 2, 0, 2],
                border: [true, false, true, true],
                colSpan: 2,
                fontSize: 11,
                alignment: 'center',
              },
              {},
            ],
            // Etiquetas: CURP y Ocupación
            [
              {
                text: 'Clave Única de Registro de Población',
                border: [true, true, true, false],
                fontSize: 8,
              },
              {
                text: 'Ocupación específica (Catálogo Nacional de Ocupaciones)',
                border: [true, true, true, false],
                fontSize: 8,
              },
            ],

            // Valores: CURP y Ocupación
            [
              {
                text: `${payload.empleado?.curp}`,
                bold: false,
                border: [true, false, true, true],
                margin: [0, 2, 0, 2],
                fontSize: 11,
                alignment: 'center',
              },
              {
                text: `${payload.clase.ocupacion?.nombre}`,
                bold: false,
                border: [true, false, true, true],
                margin: [0, 2, 0, 2],
                fontSize: 11,
                alignment: 'center',
              },
            ],
            [{ text: 'Puesto*', colSpan: 2, fontSize: 8, border: [true, true, true, false] }, {}],
            [
              {
                text: `${payload.empleado?.puesto?.nombre}`,
                colSpan: 2,
                bold: false,
                border: [true, false, true, true],
                margin: [0, 2, 0, 2],
                fontSize: 11,
                alignment: 'center',
              },
              {},
            ],
          ],
        },
        margin: [0, 0, 0, 5],
      },
      {
        table: {
          widths: ['*'],
          body: [
            [
              {
                text: 'DATOS DE LA EMPRESA',
                style: 'sectionHeader',
                fillColor: '#000000',
                color: '#ffffff',
              },
            ],
            [
              {
                text: 'Nombre o razón social (En caso de persona física, anotar apellido paterno, apellido materno y nombre(s))',
                fontSize: 8,
                border: [true, true, true, false],
              },
            ],
            [
              {
                text: `${payload.empleado?.empresa.razonSocial}`,
                bold: false,
                border: [true, false, true, true],
                margin: [0, 2, 0, 2],
                fontSize: 11,
                alignment: 'center',
              },
            ],
            [
              {
                text: 'Registro Federal de Contribuyentes con homoclave (SHCP)',
                fontSize: 8,
                border: [true, true, true, false],
              },
            ],
            [
              {
                text: `${payload.empleado?.empresa.rfc}`,
                bold: false,
                border: [true, false, true, true],
                margin: [0, 2, 0, 2],
                fontSize: 11,
                alignment: 'center',
              },
            ],
          ],
        },
        margin: [0, 0, 0, 5],
      },
      {
        table: {
          widths: ['12%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '24%'],
          body: [
            // Encabezado de sección
            [
              {
                text: 'DATOS DEL PROGRAMA DE CAPACITACION, ADIESTRAMIENTO Y PRODUCTIVIDAD',
                style: 'sectionHeader',
                fillColor: '#000000',
                color: '#ffffff',
                colSpan: 10,
                alignment: 'center',
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],

            // Etiqueta: Nombre del curso
            [
              {
                text: 'Nombre del curso',
                fontSize: 8,
                colSpan: 10,
                border: [true, true, true, false],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],

            // Valor: Nombre del curso
            [
              {
                text: `${payload.clase.curso.nombre}`,
                bold: false,
                margin: [0, 2, 0, 2],
                fontSize: 11,
                colSpan: 10,
                alignment: 'center',
                border: [true, false, true, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],

            // Etiquetas de fecha
            [
              // {
              //   text: '',
              //   fontSize: 7,
              //   alignment: 'center',
              // },
              {
                text: 'Período de ejecución:',
                fontSize: 7,
                colSpan: 10,
                alignment: 'center',
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],

            // Sub-etiquetas de fecha (De - A)
            [
              {
                text: 'Duración en horas',
                fontSize: 7,
                colSpan: 3,
                alignment: 'center',
                border: [true, false, true, true],
              },
              {},
              {
                text: 'De',
                fontSize: 7,
                alignment: 'center',
                bold: true,
              },
              {
                text: 'Año',
                fontSize: 7,
                alignment: 'center',
              },
              {
                text: 'Mes',
                fontSize: 7,
                alignment: 'center',
              },
              {
                text: 'Día',
                fontSize: 7,
                alignment: 'center',
              },
              {
                text: 'a',
                fontSize: 7,
                alignment: 'center',
                bold: true,
              },
              {
                text: 'Año',
                fontSize: 7,
                alignment: 'center',
              },
              {
                text: 'Mes',
                fontSize: 7,
                alignment: 'center',
              },
              {
                text: 'Día',
                fontSize: 7,
                alignment: 'center',
              },
            ],

            // Valores de fecha
            [
              {
                text: `${payload.clase.duracion}`,
                bold: false,
                colSpan: 3,
                fontSize: 11,
                alignment: 'center',
              },
              {},
              {},
              {
                text: `${moment(payload.clase.fechaInicio).format('YYYY')}`,
                bold: false,
                fontSize: 11,
                alignment: 'center',
              },
              {
                text: `${moment(payload.clase.fechaInicio).format('MM')}`,
                bold: false,
                fontSize: 11,
                alignment: 'center',
              },
              {
                text: `${moment(payload.clase.fechaInicio).format('DD')}`,
                bold: false,
                fontSize: 11,
                alignment: 'center',
              },
              {},
              {
                text: `${moment(payload.clase.fechaFinalizacion).format('YYYY')}`,
                bold: false,
                fontSize: 11,
                alignment: 'center',
              },
              {
                text: `${moment(payload.clase.fechaInicio).format('MM')}`,
                bold: false,
                fontSize: 11,
                alignment: 'center',
              },
              {
                text: `${moment(payload.clase.fechaInicio).format('DD')}`,
                bold: false,
                fontSize: 11,
                alignment: 'center',
              },
            ],

            // Etiqueta: Área temática
            [
              {
                text: 'Área temática del curso *',
                fontSize: 8,
                colSpan: 10,
                border: [true, true, true, false],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],

            // Valor: Área temática
            [
              {
                text: `${payload.clase.areaTematica?.nombre}`,
                bold: false,
                fontSize: 11,
                margin: [0, 2, 0, 2],
                colSpan: 10,
                alignment: 'center',
                border: [true, false, true, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],

            // Etiqueta: Agente capacitador
            [
              {
                text: 'Nombre del agente capacitador o STPS *',
                fontSize: 8,
                colSpan: 10,
                border: [true, true, true, false],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],

            // Valor: Agente capacitador
            [
              {
                text: `KOMATSU MAQUINARIAS MEXICO S.A. DE C.V. RFC: RMA910702IW1 Y5445837106`,
                bold: false,
                fontSize: 11,
                margin: [0, 2, 0, 2],
                colSpan: 10,
                alignment: 'center',
                border: [true, false, true, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],
          ],
        },
        margin: [0, 0, 0, 5],
      },
      // Declaración y firmas
      {
        text: 'Los datos se asientan en esta constancia bajo protesta de decir verdad, apercibidos de la responsabilidad en que incurre todo aquel que no se conduce con verdad.',
        fontSize: 8,
        alignment: 'center',
        margin: [0, 10, 0, 30],
      },

      // Firmas
      {
        columns: [
          {
            width: '33%',
            stack: [
              { text: '_____________________', alignment: 'center' },
              {
                text: `${payload.clase.empleadoCalifica?.primerNombre} ${payload.clase.empleadoCalifica?.segundoNombre} ${payload.clase.empleadoCalifica?.apellidoPaterno} ${payload.clase.empleadoCalifica?.apellidoMaterno}`,
                alignment: 'center',
                bold: true,
                fontSize: 9,
                margin: [0, 5, 0, 0],
              },
            ],
          },
          {
            width: '33%',
            stack: [
              { text: '_____________________', alignment: 'center' },
              {
                text: `${representanteEmpresa}`,
                alignment: 'center',
                bold: true,
                fontSize: 9,
                margin: [0, 5, 0, 0],
              },
            ],
          },
          {
            width: '34%',
            stack: [
              { text: '_____________________', alignment: 'center' },
              {
                text: `${representanteEmpleados}`,
                alignment: 'center',
                bold: true,
                fontSize: 9,
                margin: [0, 5, 0, 0],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 20],
      },

      // Instrucciones
      {
        table: {
          widths: ['*'],
          body: [[{ text: 'INSTRUCCIONES', bold: true, fontSize: 8, fillColor: '#ffffff' }]],
        },
        layout: 'noBorders',
        margin: [0, 10, 0, 5],
      },
      {
        ul: [
          { text: 'Llenar a máquina o con letra de molde.', fontSize: 7 },
          {
            text: 'Deberá entregarse al trabajador dentro de los veinte días hábiles siguientes al término del curso de capacitación aprobado.',
            fontSize: 7,
          },
          {
            text: 'Las áreas y subáreas ocupacionales del Catálogo Nacional de Ocupaciones se encuentran disponibles en el reverso de este formato y en la página www.stps.gob.mx',
            fontSize: 7,
          },
          {
            text: 'Las áreas temáticas en que puede impartirse la capacitación se encuentran en el reverso de este formato y en la página www.stps.gob.mx',
            fontSize: 7,
          },
          {
            text: 'Podrá consultarse el listado actualizado de la Secretaría del Trabajo y Previsión Social.',
            fontSize: 7,
          },
          {
            text: 'Para empresas con menos de 51 trabajadores: Para empresas con más de 50 trabajadores: La firma es del representante del patrón ante la Comisión mixta de capacitación, adiestramiento y productividad.',
            fontSize: 7,
          },
          { text: 'Solo para empresas con más de 50 trabajadores.', fontSize: 7 },
          { text: 'Dato no obligatorio.', fontSize: 7 },
        ],
        margin: [20, 0, 0, 10],
      },

      // Footer
      {
        text: 'DC-3\nART 153-D',
        fontSize: 7,
        alignment: 'right',
        margin: [0, 10, 0, 0],
      },
    ]

    docDefinition.value = {
      pageSize: 'LETTER',
      pageMargins: [40, 20, 40, 20],
      content: content,
      styles: {
        header: {
          fontSize: 12,
          bold: true,
        },
        sectionHeader: {
          fontSize: 10,
          bold: true,
          alignment: 'center',
        },
      },
    } as TDocumentDefinitions

    const pdfDocGenerator = pdfMake.createPdf(docDefinition.value)

    pdfDocGenerator.getDataUrl((dataUrl) => {
      pdfUrl.value = dataUrl
    })
  }

  watch(data, (payload) => {
    if (payload) {
      generarContenidoPdf(payload)
    }
  })

  const descargarPdf = () => {
    if (pdfUrl.value && data.value) {
      const nombre = `${empleado.value.toUpperCase()}_${data.value.clase.curso.nombre.toUpperCase()}_${data.value.clase.areaTematica.nombre.toUpperCase()}`

      const link = document.createElement('a')
      link.href = pdfUrl.value
      link.download = nombre
      link.style.display = 'none'
      document.body.appendChild(link)

      link.click()

      setTimeout(() => {
        document.body.removeChild(link)
      }, 100)
    }
  }

  return {
    id,
    pdfUrl,
    isLoading: computed(() => isLoading.value),

    descargarPdf,
  }
}

export default usePdfCertificado
