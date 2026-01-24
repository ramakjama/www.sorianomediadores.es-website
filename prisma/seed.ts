import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// ========================================
// BADGES DATA
// ========================================
const badges = [
  {
    code: 'EARLY_ADOPTER',
    name: 'Early Adopter',
    description: 'Uno de los primeros 100 usuarios registrados',
    icon: 'Rocket',
    color: '#E30613',
    requirement: 'Registrarse entre los primeros 100 usuarios',
    isSecret: false,
  },
  {
    code: 'POLICY_MASTER',
    name: 'Maestro de Polizas',
    description: 'Tienes 5 o mas polizas activas',
    icon: 'Shield',
    color: '#FFB800',
    requirement: 'Tener 5+ polizas activas simultaneamente',
    isSecret: false,
  },
  {
    code: 'REFERRAL_CHAMPION',
    name: 'Campeon Referidos',
    description: 'Has referido a 10 o mas personas',
    icon: 'Users',
    color: '#22C55E',
    requirement: 'Referir a 10+ personas que se registren',
    isSecret: false,
  },
  {
    code: 'LOYAL_LEGEND',
    name: 'Leyenda Fiel',
    description: 'Cliente durante mas de 5 años',
    icon: 'Heart',
    color: '#EC4899',
    requirement: 'Ser cliente activo durante 5+ años',
    isSecret: false,
  },
  {
    code: 'SORI_FRIEND',
    name: 'Amigo de SORI',
    description: 'Has tenido 50 conversaciones con SORI',
    icon: 'MessageCircle',
    color: '#8B5CF6',
    requirement: 'Tener 50+ conversaciones con el asistente SORI',
    isSecret: false,
  },
  {
    code: 'CLAIM_FREE',
    name: 'Sin Siniestros',
    description: '3 años sin comunicar ningun siniestro',
    icon: 'CheckCircle',
    color: '#10B981',
    requirement: 'No tener siniestros durante 3+ años',
    isSecret: false,
  },
  {
    code: 'FULL_COVERAGE',
    name: 'Cobertura Total',
    description: 'Tienes seguros de todas las categorias',
    icon: 'Award',
    color: '#F59E0B',
    requirement: 'Tener polizas de auto, hogar, vida y salud',
    isSecret: false,
  },
  {
    code: 'GREEN_DRIVER',
    name: 'Conductor Verde',
    description: 'Aseguras un vehiculo electrico',
    icon: 'Leaf',
    color: '#84CC16',
    requirement: 'Tener poliza de auto para vehiculo electrico',
    isSecret: false,
  },
  {
    code: 'MYSTERY_BADGE',
    name: 'Insignia Misteriosa',
    description: 'Has descubierto un secreto...',
    icon: 'Sparkles',
    color: '#A855F7',
    requirement: '???',
    isSecret: true,
  },
]

// ========================================
// TEAM MEMBERS (EMPLOYEES)
// ========================================
const teamMembers = [
  {
    email: 'ramon.soriano@sorianomediadores.es',
    name: 'Ramon Soriano Agullo',
    phone: '+34 966 810 290',
    role: 'EMPLEADO' as const,
    level: 'PLATINO' as const,
    points: 25000,
  },
  {
    email: 'hector.nolivos@sorianomediadores.es',
    name: 'Hector Nolivos Alvarez',
    phone: '+34 966 810 291',
    role: 'EMPLEADO' as const,
    level: 'ORO' as const,
    points: 12000,
  },
  {
    email: 'pau.ripoll@sorianomediadores.es',
    name: 'Pau Ripoll Llorca',
    phone: '+34 966 810 292',
    role: 'EMPLEADO' as const,
    level: 'ORO' as const,
    points: 10000,
  },
  {
    email: 'juan.ignacio@sorianomediadores.es',
    name: 'Juan Ignacio Perez Caracciolo',
    phone: '+34 966 810 293',
    role: 'EMPLEADO' as const,
    level: 'PLATA' as const,
    points: 5000,
  },
  {
    email: 'toni.medina@sorianomediadores.es',
    name: 'Toni Medina Llorca',
    phone: '+34 966 810 294',
    role: 'EMPLEADO' as const,
    level: 'PLATA' as const,
    points: 4500,
  },
  {
    email: 'alberto.alcala@sorianomediadores.es',
    name: 'Alberto Alcala Tomas',
    phone: '+34 966 810 295',
    role: 'EMPLEADO' as const,
    level: 'PLATA' as const,
    points: 3500,
  },
  {
    email: 'laura.fernandez@sorianomediadores.es',
    name: 'Laura Fernandez Such',
    phone: '+34 966 810 296',
    role: 'EMPLEADO' as const,
    level: 'ORO' as const,
    points: 8000,
  },
  {
    email: 'tania.zhyla@sorianomediadores.es',
    name: 'Tania Zhyla',
    phone: '+34 966 810 297',
    role: 'EMPLEADO' as const,
    level: 'PLATA' as const,
    points: 3000,
  },
]

// ========================================
// DEMO CLIENTS
// ========================================
const demoClients = [
  {
    email: 'maria.garcia@example.com',
    name: 'Maria Garcia Fernandez',
    phone: '+34 600 111 222',
    dni: '12345678A',
    address: 'Calle Mayor 15',
    city: 'Villajoyosa',
    postalCode: '03570',
    birthDate: new Date('1985-03-15'),
    level: 'ORO' as const,
    points: 12500,
  },
  {
    email: 'carlos.martinez@example.com',
    name: 'Carlos Martinez Lopez',
    phone: '+34 600 222 333',
    dni: '23456789B',
    address: 'Avenida del Mar 45',
    city: 'Benidorm',
    postalCode: '03501',
    birthDate: new Date('1978-07-22'),
    level: 'PLATINO' as const,
    points: 18000,
  },
  {
    email: 'ana.rodriguez@example.com',
    name: 'Ana Rodriguez Perez',
    phone: '+34 600 333 444',
    dni: '34567890C',
    address: 'Plaza Central 8',
    city: 'Altea',
    postalCode: '03590',
    birthDate: new Date('1990-11-08'),
    level: 'PLATA' as const,
    points: 4200,
  },
  {
    email: 'pedro.sanchez@example.com',
    name: 'Pedro Sanchez Ruiz',
    phone: '+34 600 444 555',
    dni: '45678901D',
    address: 'Calle Fontaneros 12',
    city: 'La Vila Joiosa',
    postalCode: '03570',
    birthDate: new Date('1982-05-30'),
    level: 'ORO' as const,
    points: 9800,
  },
  {
    email: 'elena.ruiz@example.com',
    name: 'Elena Ruiz Gomez',
    phone: '+34 600 555 666',
    dni: '56789012E',
    address: 'Paseo Maritimo 78',
    city: 'Benidorm',
    postalCode: '03502',
    birthDate: new Date('1975-09-14'),
    level: 'PLATINO' as const,
    points: 22000,
  },
  {
    email: 'miguel.torres@example.com',
    name: 'Miguel Torres Vidal',
    phone: '+34 600 666 777',
    dni: '67890123F',
    address: 'Calle Arquitecto 34',
    city: 'Alfaz del Pi',
    postalCode: '03580',
    birthDate: new Date('1988-01-25'),
    level: 'PLATA' as const,
    points: 3500,
  },
  {
    email: 'lucia.moreno@example.com',
    name: 'Lucia Moreno Diaz',
    phone: '+34 600 777 888',
    dni: '78901234G',
    address: 'Urbanizacion Sol 22',
    city: 'Calpe',
    postalCode: '03710',
    birthDate: new Date('1992-04-18'),
    level: 'BRONCE' as const,
    points: 850,
  },
  {
    email: 'david.lopez@example.com',
    name: 'David Lopez Navarro',
    phone: '+34 600 888 999',
    dni: '89012345H',
    address: 'Calle del Puerto 56',
    city: 'Denia',
    postalCode: '03700',
    birthDate: new Date('1980-12-03'),
    level: 'ORO' as const,
    points: 7500,
  },
  {
    email: 'isabel.fernandez@example.com',
    name: 'Isabel Fernandez Costa',
    phone: '+34 600 999 000',
    dni: '90123456I',
    address: 'Avenida Mediterraneo 100',
    city: 'Javea',
    postalCode: '03730',
    birthDate: new Date('1995-06-27'),
    level: 'BRONCE' as const,
    points: 500,
  },
  {
    email: 'javier.martin@example.com',
    name: 'Javier Martin Roca',
    phone: '+34 600 000 111',
    dni: '01234567J',
    address: 'Calle Mayor 88',
    city: 'Villajoyosa',
    postalCode: '03570',
    birthDate: new Date('1970-02-12'),
    level: 'PLATINO' as const,
    points: 35000,
  },
]

async function main() {
  console.log('Starting database seed...')

  const hashedPassword = await bcrypt.hash('Soriano2024!', 12)

  // ========================================
  // CREATE BADGES
  // ========================================
  console.log('Creating badges...')
  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { code: badge.code },
      update: badge,
      create: badge,
    })
  }
  console.log(`Created ${badges.length} badges`)

  // ========================================
  // CREATE ADMIN USER
  // ========================================
  console.log('Creating admin user...')
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sorianomediadores.es' },
    update: {},
    create: {
      email: 'admin@sorianomediadores.es',
      password: hashedPassword,
      name: 'Administrador',
      phone: '+34 966 810 290',
      role: 'ADMIN',
      level: 'PLATINO',
      points: 50000,
      isActive: true,
    },
  })
  console.log(`Created admin: ${adminUser.email}`)

  // ========================================
  // CREATE TEAM MEMBERS
  // ========================================
  console.log('Creating team members...')
  const createdEmployees: typeof adminUser[] = []
  for (const member of teamMembers) {
    const employee = await prisma.user.upsert({
      where: { email: member.email },
      update: {},
      create: {
        email: member.email,
        password: hashedPassword,
        name: member.name,
        phone: member.phone,
        role: member.role,
        level: member.level,
        points: member.points,
        isActive: true,
      },
    })
    createdEmployees.push(employee)
  }
  console.log(`Created ${createdEmployees.length} team members`)

  // ========================================
  // CREATE DEMO CLIENTS
  // ========================================
  console.log('Creating demo clients...')
  const createdClients: typeof adminUser[] = []
  for (const client of demoClients) {
    const user = await prisma.user.upsert({
      where: { email: client.email },
      update: {},
      create: {
        email: client.email,
        password: hashedPassword,
        name: client.name,
        phone: client.phone,
        dni: client.dni,
        address: client.address,
        city: client.city,
        postalCode: client.postalCode,
        birthDate: client.birthDate,
        role: 'CLIENTE',
        level: client.level,
        points: client.points,
        isActive: true,
      },
    })
    createdClients.push(user)
  }
  console.log(`Created ${createdClients.length} demo clients`)

  // ========================================
  // CREATE POLICIES
  // ========================================
  console.log('Creating policies...')

  const policies = [
    // Maria Garcia - 3 policies (ORO)
    {
      policyNumber: 'POL-2024-001',
      type: 'HOGAR' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[0].id,
      description: 'Seguro Hogar Completo - Vivienda unifamiliar',
      premium: 285.00,
      paymentFrequency: 'anual',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2025-01-15'),
      renewalDate: new Date('2024-12-15'),
      coverages: { incendio: true, agua: true, robo: true, rcFamiliar: true, asistencia24h: true },
      metadata: { superficie: 120, habitaciones: 3, tipo: 'unifamiliar' },
    },
    {
      policyNumber: 'POL-2024-002',
      type: 'AUTO' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[0].id,
      description: 'Seguro Coche Todo Riesgo con Franquicia',
      premium: 420.00,
      paymentFrequency: 'anual',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2025-02-01'),
      coverages: { todoRiesgo: true, franquicia: 300, asistencia: true, sustitucion: true },
      metadata: { matricula: '1234 ABC', marca: 'Toyota', modelo: 'Corolla', ano: 2020 },
    },
    {
      policyNumber: 'POL-2024-003',
      type: 'VIDA' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[0].id,
      description: 'Seguro de Vida Temporal',
      premium: 15.50,
      paymentFrequency: 'mensual',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2034-03-01'),
      coverages: { fallecimiento: true, invalidez: true },
      metadata: { capital: 100000, beneficiarios: ['Esposo', 'Hijos'] },
    },

    // Carlos Martinez - 4 policies (PLATINO)
    {
      policyNumber: 'POL-2024-004',
      type: 'AUTO' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[1].id,
      description: 'Seguro Coche Todo Riesgo Sin Franquicia',
      premium: 580.00,
      paymentFrequency: 'anual',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      coverages: { todoRiesgo: true, franquicia: 0, lunas: true, asistenciaPremium: true },
      metadata: { matricula: '5678 DEF', marca: 'BMW', modelo: '320d', ano: 2022 },
    },
    {
      policyNumber: 'POL-2024-005',
      type: 'HOGAR' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[1].id,
      description: 'Seguro Hogar Exclusivo',
      premium: 450.00,
      paymentFrequency: 'anual',
      startDate: new Date('2024-02-15'),
      endDate: new Date('2025-02-15'),
      coverages: { todoRiesgoContinente: true, todoRiesgoContenido: true, joyas: true, rc: true },
      metadata: { superficie: 200, habitaciones: 5, tipo: 'chalet', piscina: true },
    },
    {
      policyNumber: 'POL-2024-006',
      type: 'SALUD' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[1].id,
      description: 'Seguro de Salud Familiar Sin Copago',
      premium: 185.00,
      paymentFrequency: 'mensual',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      coverages: { medicinaGeneral: true, especialistas: true, hospitalizacion: true, dental: true },
      metadata: { asegurados: 4, copago: false },
    },
    {
      policyNumber: 'POL-2024-007',
      type: 'VIDA' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[1].id,
      description: 'Seguro de Vida vinculado a Hipoteca',
      premium: 28.00,
      paymentFrequency: 'mensual',
      startDate: new Date('2019-05-01'),
      endDate: new Date('2039-05-01'),
      coverages: { fallecimiento: true, invalidez: true, enfermedadGrave: true },
      metadata: { capital: 200000, vinculado: 'Hipoteca CaixaBank' },
    },

    // Pedro Sanchez - Autonomo (2 policies)
    {
      policyNumber: 'POL-2024-008',
      type: 'RC_PROFESIONAL' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[3].id,
      description: 'RC Profesional Fontaneria',
      premium: 320.00,
      paymentFrequency: 'anual',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      coverages: { rcExplotacion: true, rcProductos: true, defensaJuridica: true },
      metadata: { actividad: 'Fontaneria', facturacion: 80000 },
    },
    {
      policyNumber: 'POL-2024-009',
      type: 'AUTO' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[3].id,
      description: 'Seguro Furgoneta Comercial',
      premium: 380.00,
      paymentFrequency: 'anual',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2025-03-01'),
      coverages: { tercerosCompleto: true, mercancias: true, herramientas: 5000 },
      metadata: { matricula: '9012 GHI', marca: 'Citroen', modelo: 'Berlingo', ano: 2021, uso: 'comercial' },
    },

    // Elena Ruiz - Abogada (PLATINO)
    {
      policyNumber: 'POL-2024-010',
      type: 'RC_PROFESIONAL' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[4].id,
      description: 'RC Profesional Abogacia',
      premium: 890.00,
      paymentFrequency: 'anual',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      coverages: { rcProfesional: 600000, defensaPenal: true, reclamacionHonorarios: true },
      metadata: { actividad: 'Abogacia', colegiado: 'ICALI 12345' },
    },
    {
      policyNumber: 'POL-2024-011',
      type: 'SALUD' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[4].id,
      description: 'Seguro de Salud Premium Reembolso',
      premium: 210.00,
      paymentFrequency: 'mensual',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      coverages: { reembolso90: true, hospitalizacionPrivada: true, segundaOpinion: true, internacional: true },
      metadata: { reembolso: 90, cobertura: 'internacional' },
    },

    // Javier Martin - Cliente historico PLATINO
    {
      policyNumber: 'POL-2024-012',
      type: 'DECESOS' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[9].id,
      description: 'Seguro de Decesos Familiar',
      premium: 32.00,
      paymentFrequency: 'mensual',
      startDate: new Date('2015-01-01'),
      endDate: new Date('2025-01-01'),
      coverages: { servicioCompleto: true, repatriacion: true, asistenciaFamiliar: true },
      metadata: { asegurados: 4, cobertura: 'familiar' },
    },
    {
      policyNumber: 'POL-2024-013',
      type: 'AHORRO' as const,
      status: 'ACTIVA' as const,
      userId: createdClients[9].id,
      description: 'Plan de Pensiones Individual',
      premium: 200.00,
      paymentFrequency: 'mensual',
      startDate: new Date('2010-01-01'),
      endDate: new Date('2035-01-01'),
      coverages: { jubilacion: true, fallecimiento: true, invalidez: true },
      metadata: { capitalAcumulado: 58000, perfilRiesgo: 'moderado' },
    },
  ]

  for (const policy of policies) {
    await prisma.policy.upsert({
      where: { policyNumber: policy.policyNumber },
      update: {},
      create: policy,
    })
  }
  console.log(`Created ${policies.length} policies`)

  // ========================================
  // CREATE CLAIMS
  // ========================================
  console.log('Creating claims...')

  const policy1 = await prisma.policy.findUnique({ where: { policyNumber: 'POL-2024-001' } })
  const policy2 = await prisma.policy.findUnique({ where: { policyNumber: 'POL-2024-002' } })
  const policy4 = await prisma.policy.findUnique({ where: { policyNumber: 'POL-2024-004' } })

  if (policy1 && policy2 && policy4) {
    const claim1 = await prisma.claim.upsert({
      where: { claimNumber: 'SIN-2024-001' },
      update: {},
      create: {
        claimNumber: 'SIN-2024-001',
        policyId: policy1.id,
        userId: createdClients[0].id,
        type: 'Daños por agua',
        description: 'Rotura de tuberia en baño principal causando daños en el suelo y muebles',
        status: 'RESUELTO',
        amount: 2500.00,
        approvedAmount: 2350.00,
        incidentDate: new Date('2024-01-20'),
        reportedDate: new Date('2024-01-20'),
        resolvedDate: new Date('2024-02-05'),
        location: 'Calle Mayor 15, Villajoyosa',
        metadata: { perito: 'Peritaciones Levante', expediente: 'EXP-2024-0123' },
      },
    })

    // Create timeline for claim1
    await prisma.claimTimeline.createMany({
      data: [
        {
          claimId: claim1.id,
          status: 'COMUNICADO',
          title: 'Siniestro comunicado',
          description: 'El cliente ha comunicado el siniestro via telefono',
          createdAt: new Date('2024-01-20T10:30:00'),
        },
        {
          claimId: claim1.id,
          status: 'EN_REVISION',
          title: 'Perito asignado',
          description: 'Se ha asignado perito para valoracion de daños',
          createdAt: new Date('2024-01-21T09:00:00'),
        },
        {
          claimId: claim1.id,
          status: 'APROBADO',
          title: 'Reparacion aprobada',
          description: 'Valoracion aceptada por importe de 2.350€',
          createdAt: new Date('2024-01-25T14:00:00'),
        },
        {
          claimId: claim1.id,
          status: 'RESUELTO',
          title: 'Siniestro resuelto',
          description: 'Reparacion completada y abono realizado',
          createdAt: new Date('2024-02-05T11:00:00'),
        },
      ],
    })

    await prisma.claim.upsert({
      where: { claimNumber: 'SIN-2024-002' },
      update: {},
      create: {
        claimNumber: 'SIN-2024-002',
        policyId: policy2.id,
        userId: createdClients[0].id,
        type: 'Colision',
        description: 'Alcance trasero en semaforo por vehiculo que venia detras',
        status: 'EN_PROCESO',
        amount: 1800.00,
        incidentDate: new Date('2024-03-15'),
        reportedDate: new Date('2024-03-15'),
        location: 'Avenida Marina Baixa, Villajoyosa',
        metadata: { taller: 'AutoPresto Benidorm', parteAmistoso: true },
      },
    })

    await prisma.claim.upsert({
      where: { claimNumber: 'SIN-2024-003' },
      update: {},
      create: {
        claimNumber: 'SIN-2024-003',
        policyId: policy4.id,
        userId: createdClients[1].id,
        type: 'Lunas',
        description: 'Impacto de piedra en parabrisas delantero',
        status: 'RESUELTO',
        amount: 450.00,
        approvedAmount: 450.00,
        incidentDate: new Date('2024-02-28'),
        reportedDate: new Date('2024-02-28'),
        resolvedDate: new Date('2024-03-02'),
        location: 'A-7, KM 142',
        metadata: { servicio: 'Carglass', sustitucion: true },
      },
    })
  }
  console.log('Created claims with timelines')

  // ========================================
  // CREATE POINTS HISTORY
  // ========================================
  console.log('Creating points history...')

  await prisma.pointsHistory.createMany({
    data: [
      { userId: createdClients[0].id, action: 'PERFIL_COMPLETO', points: 100, description: 'Perfil completado al 100%' },
      { userId: createdClients[0].id, action: 'NUEVA_POLIZA', points: 500, description: 'Nueva poliza de hogar contratada' },
      { userId: createdClients[0].id, action: 'NUEVA_POLIZA', points: 500, description: 'Nueva poliza de auto contratada' },
      { userId: createdClients[0].id, action: 'REVIEW', points: 100, description: 'Opinion dejada sobre el servicio' },
      { userId: createdClients[1].id, action: 'REFERIDO_CONVERSION', points: 500, description: 'Tu referido Ana ha contratado una poliza' },
      { userId: createdClients[1].id, action: 'PERFIL_COMPLETO', points: 100, description: 'Perfil completado al 100%' },
      { userId: createdClients[1].id, action: 'NUEVA_POLIZA', points: 500, description: 'Nueva poliza contratada' },
      { userId: createdClients[9].id, action: 'RENOVACION', points: 300, description: 'Renovacion anual de poliza' },
    ],
    skipDuplicates: true,
  })
  console.log('Created points history')

  // ========================================
  // ASSIGN BADGES TO USERS
  // ========================================
  console.log('Assigning badges...')

  const earlyAdopterBadge = await prisma.badge.findUnique({ where: { code: 'EARLY_ADOPTER' } })
  const policyMasterBadge = await prisma.badge.findUnique({ where: { code: 'POLICY_MASTER' } })
  const loyalLegendBadge = await prisma.badge.findUnique({ where: { code: 'LOYAL_LEGEND' } })

  if (earlyAdopterBadge) {
    for (const client of createdClients.slice(0, 5)) {
      await prisma.userBadge.upsert({
        where: { userId_badgeId: { userId: client.id, badgeId: earlyAdopterBadge.id } },
        update: {},
        create: { userId: client.id, badgeId: earlyAdopterBadge.id },
      })
    }
  }

  if (policyMasterBadge && createdClients[1]) {
    await prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: createdClients[1].id, badgeId: policyMasterBadge.id } },
      update: {},
      create: { userId: createdClients[1].id, badgeId: policyMasterBadge.id },
    })
  }

  if (loyalLegendBadge && createdClients[9]) {
    await prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: createdClients[9].id, badgeId: loyalLegendBadge.id } },
      update: {},
      create: { userId: createdClients[9].id, badgeId: loyalLegendBadge.id },
    })
  }
  console.log('Assigned badges')

  // ========================================
  // CREATE NOTIFICATIONS
  // ========================================
  console.log('Creating notifications...')

  await prisma.notification.createMany({
    data: [
      {
        userId: createdClients[0].id,
        title: 'Bienvenida a Soriano Club',
        message: 'Has subido a nivel Oro. Disfruta de un 10% de descuento en tus proximas polizas.',
        type: 'success',
        link: '/soriano-club',
      },
      {
        userId: createdClients[0].id,
        title: 'Renovacion proxima',
        message: 'Tu poliza de hogar se renueva en 30 dias. Revisa las condiciones.',
        type: 'warning',
        link: '/dashboard/polizas',
      },
      {
        userId: createdClients[1].id,
        title: 'Siniestro resuelto',
        message: 'Tu siniestro SIN-2024-003 ha sido resuelto satisfactoriamente.',
        type: 'success',
        link: '/dashboard/siniestros',
      },
    ],
  })
  console.log('Created notifications')

  console.log('')
  console.log('========================================')
  console.log('DATABASE SEED COMPLETED SUCCESSFULLY!')
  console.log('========================================')
  console.log('')
  console.log('Demo credentials:')
  console.log('  Admin: admin@sorianomediadores.es / Soriano2024!')
  console.log('  Client: maria.garcia@example.com / Soriano2024!')
  console.log('')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
