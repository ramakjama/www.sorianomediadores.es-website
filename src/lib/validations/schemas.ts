import { z } from 'zod'

// Schema para registro de usuario
export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  phone: z.string().optional(),
  dni: z.string().optional(),
})

// Schema para crear póliza
export const policySchema = z.object({
  policyNumber: z.string().min(5, 'Número de póliza inválido'),
  type: z.enum([
    'AUTO',
    'HOGAR',
    'VIDA',
    'SALUD',
    'DECESOS',
    'MOTO',
    'COMUNIDADES',
    'COMERCIOS',
    'MASCOTAS',
    'VIAJE',
  ]),
  description: z.string().min(10, 'Descripción muy corta'),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  premium: z.number().positive('La prima debe ser positiva'),
  paymentFrequency: z.enum(['MENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL']),
})

// Schema para crear recibo
export const receiptSchema = z.object({
  policyId: z.string(),
  receiptNumber: z.string().min(5, 'Número de recibo inválido'),
  concept: z.string().min(5, 'Concepto requerido'),
  period: z.string().min(5, 'Periodo requerido'),
  amount: z.number().positive('El importe debe ser positivo'),
  tax: z.number().nonnegative('El impuesto no puede ser negativo'),
  totalAmount: z.number().positive('El importe total debe ser positivo'),
  dueDate: z.string().or(z.date()),
  paymentMethod: z.enum(['DOMICILIACION', 'TARJETA', 'TRANSFERENCIA', 'EFECTIVO']).optional(),
})

// Schema para crear siniestro
export const claimSchema = z.object({
  policyId: z.string(),
  claimNumber: z.string().min(5, 'Número de siniestro inválido'),
  incidentDate: z.string().or(z.date()),
  description: z.string().min(20, 'Descripción debe tener al menos 20 caracteres'),
  location: z.string().min(5, 'Ubicación requerida'),
  estimatedAmount: z.number().positive('Importe estimado debe ser positivo').optional(),
})

// Schema para actualizar perfil
export const profileSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  phone: z.string().optional(),
  dni: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  birthDate: z.string().or(z.date()).optional(),
})

// Schema para chat
export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Mensaje vacío').max(2000, 'Mensaje muy largo (máximo 2000 caracteres)'),
  conversationId: z.string().optional(),
})

// Schema para pago
export const paymentSchema = z.object({
  receiptId: z.string(),
})

// Helper para validar
export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: true;
  data: T
} | {
  success: false;
  errors: z.ZodError
} {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  } else {
    return { success: false, errors: result.error }
  }
}
