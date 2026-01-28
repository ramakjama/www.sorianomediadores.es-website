import { resend, COMPANY_EMAIL, COMPANY_NAME } from './resend'

export interface SendEmailOptions {
  to: string
  subject: string
  react?: React.ReactElement
  html?: string
}

export async function sendEmail({ to, subject, react, html }: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[EMAIL PREVIEW] To: ${to}, Subject: ${subject}`)
    console.log('[EMAIL PREVIEW] Email no enviado (RESEND_API_KEY no configurada)')
    return { success: false, message: 'RESEND_API_KEY no configurada' }
  }

  try {
    let result

    if (react) {
      result = await resend.emails.send({
        from: `${COMPANY_NAME} <${COMPANY_EMAIL}>`,
        to: [to],
        subject,
        react,
      })
    } else if (html) {
      result = await resend.emails.send({
        from: `${COMPANY_NAME} <${COMPANY_EMAIL}>`,
        to: [to],
        subject,
        html,
      })
    } else {
      throw new Error('Debe proporcionar react o html')
    }

    const { data, error } = result

    if (error) {
      console.error('Error enviando email:', error)
      return { success: false, error }
    }

    console.log('Email enviado exitosamente:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error enviando email:', error)
    return { success: false, error }
  }
}

// Helpers para emails específicos

export async function sendWelcomeEmail(to: string, userName: string) {
  return sendEmail({
    to,
    subject: '¡Bienvenido/a a Soriano Mediadores!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #E30613;">¡Bienvenido/a a Soriano Mediadores!</h1>
        <p>Hola ${userName},</p>
        <p>Gracias por confiar en nosotros para proteger lo que más te importa.</p>
        <p>Ya puedes acceder a tu área de clientes:</p>
        <a href="${process.env.NEXTAUTH_URL}/acceso-clientes" style="display: inline-block; background: #E30613; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">Acceder al Área de Clientes</a>
        <p>Si tienes alguna duda, estamos a tu disposición.</p>
        <p style="color: #666; font-size: 14px; margin-top: 40px;">Soriano Mediadores - Tu tranquilidad, nuestra prioridad</p>
      </div>
    `,
  })
}

export async function sendReceiptPaymentEmail(
  to: string,
  data: {
    userName: string
    receiptNumber: string
    policyNumber: string
    amount: number
    dueDate: string
    receiptId: string
  }
) {
  return sendEmail({
    to,
    subject: `Nuevo recibo pendiente - ${data.receiptNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #E30613;">Nuevo recibo pendiente</h1>
        <p>Hola ${data.userName},</p>
        <p>Te informamos que tienes un nuevo recibo pendiente de pago:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Recibo:</strong> ${data.receiptNumber}</p>
          <p style="margin: 5px 0;"><strong>Póliza:</strong> ${data.policyNumber}</p>
          <p style="margin: 5px 0;"><strong>Importe:</strong> ${data.amount.toFixed(2)}€</p>
          <p style="margin: 5px 0;"><strong>Fecha de vencimiento:</strong> ${data.dueDate}</p>
        </div>
        <a href="${process.env.NEXTAUTH_URL}/api/receipts/${data.receiptId}/pdf" style="display: inline-block; background: #E30613; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">Descargar Recibo</a>
        <p style="color: #666; font-size: 14px; margin-top: 40px;">Soriano Mediadores - Tu tranquilidad, nuestra prioridad</p>
      </div>
    `,
  })
}

export async function sendPolicyCreatedEmail(
  to: string,
  data: {
    userName: string
    policyNumber: string
    policyType: string
    startDate: string
  }
) {
  return sendEmail({
    to,
    subject: `Nueva póliza creada - ${data.policyNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #E30613;">Hola ${data.userName}</h1>
        <p>Tu póliza ${data.policyNumber} de tipo ${data.policyType} ha sido creada con fecha de inicio ${data.startDate}.</p>
      </div>
    `,
  })
}

export async function sendClaimStatusEmail(
  to: string,
  data: {
    userName: string
    claimNumber: string
    status: string
    message: string
  }
) {
  return sendEmail({
    to,
    subject: `Actualización de siniestro - ${data.claimNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #E30613;">Hola ${data.userName}</h1>
        <p>Tu siniestro ${data.claimNumber} ha cambiado a estado: <strong>${data.status}</strong></p>
        <p>${data.message}</p>
      </div>
    `,
  })
}
