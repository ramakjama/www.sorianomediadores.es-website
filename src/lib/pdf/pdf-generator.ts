import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Extender jsPDF con autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: unknown) => jsPDF
  }
}

// Colores corporativos
const COLORS = {
  occident: '#E30613',
  occidentDark: '#B8050F',
  soriano: '#1a1a1a',
  gray: '#666666',
  lightGray: '#f5f5f5',
  white: '#ffffff',
}

// Configuracion de empresa
const COMPANY = {
  name: 'Soriano Mediadores de Seguros S.L.',
  address: 'Calle Constitucion 5, 03570 Villajoyosa (Alicante)',
  phone: '966 810 290',
  email: 'info@sorianomediadores.es',
  web: 'www.sorianomediadores.es',
  cif: 'B-12345678', // Placeholder
  dgsfp: 'J-1234', // Placeholder - Numero registro DGSFP
}

const INSURER = {
  name: 'Occident',
  fullName: 'Grupo Catalana Occidente',
}

interface ReceiptData {
  receiptNumber: string
  policyNumber: string
  policyType: string
  concept: string
  period: string
  amount: number
  tax: number
  totalAmount: number
  issueDate: string
  dueDate: string
  paidDate?: string
  paymentMethod?: string
  bankAccount?: string
  clientName: string
  clientDni: string
  clientAddress: string
}

interface PolicyData {
  policyNumber: string
  type: string
  holder: {
    name: string
    dni: string
    address: string
    phone: string
    email: string
  }
  insuredObject: string
  startDate: string
  endDate: string
  premium: number
  paymentFrequency: string
  coverages: Array<{
    name: string
    limit: string
    franchise?: string
  }>
}

interface CertificateData {
  policyNumber: string
  type: string
  holder: {
    name: string
    dni: string
  }
  insuredObject: string
  startDate: string
  endDate: string
  coverages: string[]
  issueDate: string
}

/**
 * Genera el header comun para todos los PDFs
 */
function addHeader(doc: jsPDF, title: string) {
  const pageWidth = doc.internal.pageSize.getWidth()

  // Logo area (placeholder - en produccion usar imagen real)
  doc.setFillColor(COLORS.occident)
  doc.rect(15, 10, 40, 12, 'F')
  doc.setTextColor(COLORS.white)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('OCCIDENT', 20, 18)

  // Soriano Mediadores
  doc.setTextColor(COLORS.soriano)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Mediador:', 60, 14)
  doc.setFont('helvetica', 'bold')
  doc.text(COMPANY.name, 60, 19)

  // Titulo del documento
  doc.setFontSize(16)
  doc.setTextColor(COLORS.occident)
  doc.text(title, pageWidth - 15, 18, { align: 'right' })

  // Linea separadora
  doc.setDrawColor(COLORS.occident)
  doc.setLineWidth(0.5)
  doc.line(15, 28, pageWidth - 15, 28)

  return 35 // Posicion Y despues del header
}

/**
 * Genera el footer comun para todos los PDFs
 */
function addFooter(doc: jsPDF) {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // Linea separadora
  doc.setDrawColor(COLORS.gray)
  doc.setLineWidth(0.3)
  doc.line(15, pageHeight - 25, pageWidth - 15, pageHeight - 25)

  // Datos de contacto
  doc.setFontSize(8)
  doc.setTextColor(COLORS.gray)
  doc.text(
    `${COMPANY.name} | CIF: ${COMPANY.cif} | Registro DGSFP: ${COMPANY.dgsfp}`,
    pageWidth / 2,
    pageHeight - 18,
    { align: 'center' }
  )
  doc.text(
    `${COMPANY.address} | Tel: ${COMPANY.phone} | ${COMPANY.email}`,
    pageWidth / 2,
    pageHeight - 13,
    { align: 'center' }
  )
  doc.text(
    `Documento generado automaticamente - ${new Date().toLocaleDateString('es-ES')}`,
    pageWidth / 2,
    pageHeight - 8,
    { align: 'center' }
  )
}

/**
 * Genera un PDF de recibo
 */
export function generateReceiptPDF(data: ReceiptData): jsPDF {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  let yPos = addHeader(doc, 'RECIBO DE PRIMA')

  // Datos del recibo
  doc.setFillColor(COLORS.lightGray)
  doc.rect(15, yPos, pageWidth - 30, 25, 'F')

  doc.setFontSize(10)
  doc.setTextColor(COLORS.soriano)
  doc.setFont('helvetica', 'bold')
  doc.text(`Recibo N°: ${data.receiptNumber}`, 20, yPos + 8)
  doc.text(`Poliza N°: ${data.policyNumber}`, 20, yPos + 16)

  doc.setFont('helvetica', 'normal')
  doc.text(`Fecha Emision: ${data.issueDate}`, pageWidth - 20, yPos + 8, { align: 'right' })
  doc.text(`Vencimiento: ${data.dueDate}`, pageWidth - 20, yPos + 16, { align: 'right' })

  yPos += 35

  // Datos del tomador
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(COLORS.occident)
  doc.text('DATOS DEL TOMADOR', 15, yPos)
  yPos += 8

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(COLORS.soriano)
  doc.text(`Nombre: ${data.clientName}`, 20, yPos)
  yPos += 6
  doc.text(`DNI/NIF: ${data.clientDni}`, 20, yPos)
  yPos += 6
  doc.text(`Direccion: ${data.clientAddress}`, 20, yPos)
  yPos += 15

  // Concepto
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(COLORS.occident)
  doc.text('CONCEPTO', 15, yPos)
  yPos += 8

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(COLORS.soriano)
  doc.text(data.concept, 20, yPos)
  yPos += 6
  doc.text(`Periodo: ${data.period}`, 20, yPos)
  yPos += 15

  // Importe
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(COLORS.occident)
  doc.text('DESGLOSE DE IMPORTES', 15, yPos)
  yPos += 10

  // Tabla de importes
  doc.autoTable({
    startY: yPos,
    head: [['Concepto', 'Importe']],
    body: [
      ['Prima neta', `${data.amount.toFixed(2)} EUR`],
      ['Impuestos y recargos', `${data.tax.toFixed(2)} EUR`],
      ['TOTAL A PAGAR', `${data.totalAmount.toFixed(2)} EUR`],
    ],
    theme: 'grid',
    headStyles: {
      fillColor: COLORS.occident,
      textColor: COLORS.white,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 10,
    },
    columnStyles: {
      1: { halign: 'right' },
    },
    margin: { left: 15, right: 15 },
  })

  // Estado de pago
  yPos = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15

  if (data.paidDate) {
    doc.setFillColor('#22c55e')
    doc.rect(15, yPos, pageWidth - 30, 12, 'F')
    doc.setTextColor(COLORS.white)
    doc.setFont('helvetica', 'bold')
    doc.text('PAGADO', pageWidth / 2, yPos + 8, { align: 'center' })
    yPos += 8
    doc.setTextColor(COLORS.white)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(`Fecha de pago: ${data.paidDate} | Metodo: ${data.paymentMethod || 'N/A'}`, pageWidth / 2, yPos + 8, { align: 'center' })
  } else {
    doc.setFillColor('#f59e0b')
    doc.rect(15, yPos, pageWidth - 30, 12, 'F')
    doc.setTextColor(COLORS.white)
    doc.setFont('helvetica', 'bold')
    doc.text('PENDIENTE DE PAGO', pageWidth / 2, yPos + 8, { align: 'center' })
  }

  addFooter(doc)
  return doc
}

/**
 * Genera un certificado de poliza
 */
export function generatePolicyCertificatePDF(data: CertificateData): jsPDF {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  let yPos = addHeader(doc, 'CERTIFICADO DE POLIZA')

  // Numero de certificado
  doc.setFillColor(COLORS.lightGray)
  doc.rect(15, yPos, pageWidth - 30, 15, 'F')
  doc.setFontSize(12)
  doc.setTextColor(COLORS.occident)
  doc.setFont('helvetica', 'bold')
  doc.text(`POLIZA N°: ${data.policyNumber}`, pageWidth / 2, yPos + 10, { align: 'center' })
  yPos += 25

  // Certificacion
  doc.setFontSize(11)
  doc.setTextColor(COLORS.soriano)
  doc.setFont('helvetica', 'normal')

  const certText = `${COMPANY.name}, con CIF ${COMPANY.cif}, inscrita en el Registro de Mediadores de Seguros de la DGSFP con numero ${COMPANY.dgsfp}, en calidad de Mediador de Seguros,`
  const lines = doc.splitTextToSize(certText, pageWidth - 40)
  doc.text(lines, 20, yPos)
  yPos += lines.length * 6 + 10

  doc.setFont('helvetica', 'bold')
  doc.text('CERTIFICA:', pageWidth / 2, yPos, { align: 'center' })
  yPos += 15

  doc.setFont('helvetica', 'normal')
  const bodyText = `Que D./Da. ${data.holder.name}, con DNI/NIF ${data.holder.dni}, es titular de una poliza de seguro de ${data.type} con las siguientes caracteristicas:`
  const bodyLines = doc.splitTextToSize(bodyText, pageWidth - 40)
  doc.text(bodyLines, 20, yPos)
  yPos += bodyLines.length * 6 + 15

  // Datos de la poliza
  doc.autoTable({
    startY: yPos,
    body: [
      ['Numero de Poliza', data.policyNumber],
      ['Tipo de Seguro', data.type],
      ['Objeto Asegurado', data.insuredObject],
      ['Fecha de Efecto', data.startDate],
      ['Fecha de Vencimiento', data.endDate],
    ],
    theme: 'plain',
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
    },
    margin: { left: 20, right: 20 },
  })

  yPos = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15

  // Coberturas
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(COLORS.occident)
  doc.text('COBERTURAS CONTRATADAS:', 20, yPos)
  yPos += 8

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(COLORS.soriano)
  data.coverages.forEach((coverage) => {
    doc.text(`• ${coverage}`, 25, yPos)
    yPos += 6
  })
  yPos += 10

  // Clausula final
  const clausula = `Y para que conste a los efectos oportunos, se expide el presente certificado en ${COMPANY.address.split(',')[1]?.trim() || 'Villajoyosa'}, a ${new Date(data.issueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}.`
  const clausulaLines = doc.splitTextToSize(clausula, pageWidth - 40)
  doc.text(clausulaLines, 20, yPos)
  yPos += clausulaLines.length * 6 + 20

  // Firma
  doc.setFont('helvetica', 'bold')
  doc.text('Fdo.: Soriano Mediadores de Seguros S.L.', pageWidth / 2, yPos, { align: 'center' })

  addFooter(doc)
  return doc
}

/**
 * Genera documento de poliza completa
 */
export function generatePolicyDocumentPDF(data: PolicyData): jsPDF {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  let yPos = addHeader(doc, 'CONDICIONES PARTICULARES')

  // Numero de poliza destacado
  doc.setFillColor(COLORS.occident)
  doc.rect(15, yPos, pageWidth - 30, 15, 'F')
  doc.setTextColor(COLORS.white)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text(`POLIZA N°: ${data.policyNumber}`, pageWidth / 2, yPos + 10, { align: 'center' })
  yPos += 25

  // Seccion: Datos del Tomador
  doc.setTextColor(COLORS.occident)
  doc.setFont('helvetica', 'bold')
  doc.text('1. DATOS DEL TOMADOR', 15, yPos)
  yPos += 8

  doc.autoTable({
    startY: yPos,
    body: [
      ['Nombre/Razon Social', data.holder.name],
      ['DNI/NIF', data.holder.dni],
      ['Direccion', data.holder.address],
      ['Telefono', data.holder.phone],
      ['Email', data.holder.email],
    ],
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50, fillColor: COLORS.lightGray },
    },
    margin: { left: 15, right: 15 },
  })

  yPos = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10

  // Seccion: Objeto Asegurado
  doc.setTextColor(COLORS.occident)
  doc.setFont('helvetica', 'bold')
  doc.text('2. OBJETO ASEGURADO', 15, yPos)
  yPos += 8

  doc.setTextColor(COLORS.soriano)
  doc.setFont('helvetica', 'normal')
  doc.text(data.insuredObject, 20, yPos)
  yPos += 15

  // Seccion: Vigencia y Prima
  doc.setTextColor(COLORS.occident)
  doc.setFont('helvetica', 'bold')
  doc.text('3. VIGENCIA Y PRIMA', 15, yPos)
  yPos += 8

  doc.autoTable({
    startY: yPos,
    body: [
      ['Fecha de Efecto', data.startDate],
      ['Fecha de Vencimiento', data.endDate],
      ['Prima Total Anual', `${data.premium.toFixed(2)} EUR`],
      ['Forma de Pago', data.paymentFrequency],
    ],
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50, fillColor: COLORS.lightGray },
    },
    margin: { left: 15, right: 15 },
  })

  yPos = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10

  // Seccion: Coberturas
  doc.setTextColor(COLORS.occident)
  doc.setFont('helvetica', 'bold')
  doc.text('4. COBERTURAS CONTRATADAS', 15, yPos)
  yPos += 8

  const coverageData = data.coverages.map(c => [
    c.name,
    c.limit,
    c.franchise || '-',
  ])

  doc.autoTable({
    startY: yPos,
    head: [['Cobertura', 'Limite', 'Franquicia']],
    body: coverageData,
    theme: 'grid',
    headStyles: {
      fillColor: COLORS.occident,
      textColor: COLORS.white,
      fontStyle: 'bold',
    },
    styles: { fontSize: 9, cellPadding: 3 },
    margin: { left: 15, right: 15 },
  })

  addFooter(doc)
  return doc
}

/**
 * Descarga un PDF
 */
export function downloadPDF(doc: jsPDF, filename: string) {
  doc.save(filename)
}

/**
 * Obtiene el PDF como blob para preview
 */
export function getPDFBlob(doc: jsPDF): Blob {
  return doc.output('blob')
}
