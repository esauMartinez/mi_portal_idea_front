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
    empleado.value = `${payload.empleado?.apellidoPaterno} ${payload.empleado?.apellidoMaterno ? payload.empleado?.apellidoMaterno : ''} ${payload.empleado?.primerNombre} ${payload.empleado?.segundoNombre ? payload.empleado?.segundoNombre : ''}`
    const representanteEmpresa = payload.clase!.representanteEmpresa
      ? formatearNombre(payload.clase!.representanteEmpresa)
      : 'S/D'
    const representanteEmpleados = payload.clase!.representanteEmpleados
      ? formatearNombre(payload.clase!.representanteEmpleados)
      : 'S/D'

    const content: Content[] = [
      // Logo
      {
        image:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAADwCAYAAAAQNp2wAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH6AcDAi8HGao5EQAAYZJJREFUeNrt3Xl8XGW9P/DP95zJMjNJs03ShRYKlCKgKIoogoAiyCKlCBQUAUubTKFYEXe9P819ea87qJWlM+kCuKDlqriCIAKCoIKAC3spRUppm8nSJrMkmXO+vz8aSpe0nUnmzJzl8/7nerU5c+b7POc5z/OdZwGIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIaDthCIiIiIiIiPYkUdUaxtwgRyBfi7v6+uJbWBeIqJJCDAEREREREdHYmpoQ0SFZHeQYVA/rkQD+xdpARJVkMARERERERERERORmTGAREREREREREZGrMYFFRERERERERESuxgQWERERERERERG5GhNYRERERERERETkakxgERERERERERGRqzGBRURERERERERErsYEFhERERERERERuRoTWERERERERERE5GpMYBERERERERERkasxgUVERERERERERK7GBBYREREREREREbkaE1hERERERERERORqTGAREREREREREZGrMYFFRERERERERESuxgQWERERERERERG5GhNYRERERERERETkakxgERERERERERGRqzGBRURERERERERErsYEFhERERERERERuRoTWERERERERERE5GpMYBERERERERERkasxgUVERERERERERK7GBBYREREREREREbkaE1hERERERERERORqTGAREREREREREZGrMYFFRERERERERESuxgQWERERERERERG5GhNYRERERERERETkakxgERERERERERGRqzGBRURERERERERErsYEFhERERERERERuRoTWERERERERERE5GpMYBERERERERERkasxgUVERERERERERK7GBBYREREREREREbkaE1hERERERERERORqTGAREREREREREZGrMYFFRERERERERESuxgQWERERERERERG5GhNYRERERERERETkakxgERERERERERGRqzGBRURERERERERErsYEFhERERERERER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',
        width: 120,
        margin: [410, 10, 0, 20],
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
                text: `${payload.clase!.ocupacion?.nombre}`,
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
                text: `${payload.clase!.curso.nombre} ${payload.clase?.modelo.nombre}`,
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
                text: `${payload.clase!.duracion}`,
                bold: false,
                colSpan: 3,
                fontSize: 11,
                alignment: 'center',
              },
              {},
              {},
              {
                text: `${moment(payload.clase!.fechaInicio).format('YYYY')}`,
                bold: false,
                fontSize: 11,
                alignment: 'center',
              },
              {
                text: `${moment(payload.clase!.fechaInicio).format('MM')}`,
                bold: false,
                fontSize: 11,
                alignment: 'center',
              },
              {
                text: `${moment(payload.clase!.fechaInicio).format('DD')}`,
                bold: false,
                fontSize: 11,
                alignment: 'center',
              },
              {},
              {
                text: `${moment(payload.clase!.fechaFinalizacion).format('YYYY')}`,
                bold: false,
                fontSize: 11,
                alignment: 'center',
              },
              {
                text: `${moment(payload.clase!.fechaInicio).format('MM')}`,
                bold: false,
                fontSize: 11,
                alignment: 'center',
              },
              {
                text: `${moment(payload.clase!.fechaInicio).format('DD')}`,
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
                text: `${payload.clase!.areaTematica?.nombre}`,
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
                text: `${payload.clase!.empleadoCalifica?.primerNombre} ${payload.clase!.empleadoCalifica?.segundoNombre} ${payload.clase!.empleadoCalifica?.apellidoPaterno} ${payload.clase!.empleadoCalifica?.apellidoMaterno}`,
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
      const nombre = `${empleado.value.toUpperCase()}_${data.value.clase!.curso.nombre.toUpperCase()}_${data.value.clase!.areaTematica.nombre.toUpperCase()}`

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
