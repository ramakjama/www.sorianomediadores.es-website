/**
 * CATÁLOGO COMPLETO DE PRODUCTOS DE SEGUROS OCCIDENT
 * Organizado por categorías con toda la información necesaria
 */

export interface InsuranceProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDesc: string;
  target: ('particulares' | 'autonomos' | 'empresas')[];
  icon: string;
  image: string;
  priceFrom: string;
  features: string[];
  benefits: string[];
  coverage: string[];
}

// ============================================================================
// PRODUCTOS COMPLETOS DE OCCIDENT
// ============================================================================

export const ALL_INSURANCE_PRODUCTS: InsuranceProduct[] = [
  // VEHÍCULOS
  {
    id: 'auto',
    name: 'Seguro de Automóviles',
    slug: 'automoviles',
    category: 'Vehículos',
    description: 'Protege tu coche con las mejores coberturas del mercado. Desde terceros básico hasta todo riesgo sin franquicia.',
    shortDesc: 'Protección completa para tu vehículo',
    target: ['particulares', 'autonomos', 'empresas'],
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200',
    priceFrom: 'desde 180€/año',
    features: [
      'Asistencia en carretera 24/7',
      'Vehículo de sustitución',
      'Red de talleres AutoPresto',
      'Defensa jurídica incluida',
      'Tramitación de multas',
    ],
    benefits: [
      'Sin permanencia',
      'Pago fraccionado sin intereses',
      'Descuentos por buen conductor',
    ],
    coverage: [
      'RC ilimitada',
      'Daños propios',
      'Robo e incendio',
      'Lunas y faros',
    ],
  },
  {
    id: 'moto',
    name: 'Seguro de Motos y Patinetes',
    slug: 'motos-patinetes',
    category: 'Vehículos',
    description: 'Libertad sobre dos ruedas con total protección. Coberturas específicas para motocicletas y vehículos de movilidad personal.',
    shortDesc: 'Protección para motos y VMP',
    target: ['particulares', 'autonomos'],
    icon: 'Bike',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200',
    priceFrom: 'desde 120€/año',
    features: [
      'Cobertura de equipamiento',
      'Asistencia especializada',
      'RC ilimitada',
      'Defensa jurídica',
    ],
    benefits: [
      'Descuentos por antigüedad',
      'Sin recargo conductor novel',
    ],
    coverage: [
      'Daños propios',
      'Robo total y parcial',
      'Accesorios',
    ],
  },
  {
    id: 'flotas',
    name: 'Seguro de Flotas',
    slug: 'flotas',
    category: 'Vehículos',
    description: 'Gestión integral de flotas empresariales con descuentos por volumen y servicios adicionales.',
    shortDesc: 'Gestión de flotas empresariales',
    target: ['empresas'],
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200',
    priceFrom: 'consultar',
    features: [
      'Gestión centralizada online',
      'Descuentos por volumen',
      'Vehículos de sustitución',
      'Informes de siniestralidad',
    ],
    benefits: [
      'Facturación única',
      'Altas y bajas inmediatas',
    ],
    coverage: [
      'RC ilimitada',
      'Todo riesgo disponible',
    ],
  },

  // HOGAR Y MULTIRRIESGOS
  {
    id: 'hogar',
    name: 'Seguro de Hogar',
    slug: 'hogar',
    category: 'Multirriesgos',
    description: 'Tu hogar, tu refugio. Protégelo como se merece con cobertura completa contra incendios, robos, daños por agua y más.',
    shortDesc: 'Protección integral para tu hogar',
    target: ['particulares'],
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200',
    priceFrom: 'desde 150€/año',
    features: [
      'Incendio y daños por agua',
      'Robo y vandalismo',
      'RC familiar',
      'Asistencia hogar 24h',
      'Bricohogar incluido',
    ],
    benefits: [
      'Sin franquicia',
      'Revalorización automática',
    ],
    coverage: [
      'Continente y contenido',
      'RC hasta 600.000€',
    ],
  },
  {
    id: 'comunidades',
    name: 'Seguro de Comunidades',
    slug: 'comunidades',
    category: 'Multirriesgos',
    description: 'Protección integral para comunidades de propietarios. Cubre edificio, zonas comunes y responsabilidad civil.',
    shortDesc: 'Para comunidades de vecinos',
    target: ['particulares', 'empresas'],
    icon: 'Building',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
    priceFrom: 'consultar',
    features: [
      'Daños al edificio',
      'RC de la comunidad',
      'Defensa jurídica',
      'Asistencia 24h',
    ],
    benefits: [
      'Gestión online',
      'Peritación rápida',
    ],
    coverage: [
      'Continente completo',
      'RC hasta 1.200.000€',
    ],
  },
  {
    id: 'comercios',
    name: 'Seguro de Comercios',
    slug: 'comercios',
    category: 'Multirriesgos',
    description: 'Protección completa para tu negocio. Protege local, mercancías, equipos y responsabilidad civil.',
    shortDesc: 'Multirriesgo para comercios',
    target: ['autonomos', 'empresas'],
    icon: 'Store',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
    priceFrom: 'desde 280€/año',
    features: [
      'Continente y contenido',
      'Pérdida de beneficios',
      'Rotura de maquinaria',
      'RC de explotación',
    ],
    benefits: [
      'Cobertura 24/7',
      'Reposición a nuevo',
    ],
    coverage: [
      'Local comercial',
      'Mercancías',
      'RC hasta 600.000€',
    ],
  },
  {
    id: 'pyme',
    name: 'Seguro PYME',
    slug: 'pyme',
    category: 'Multirriesgos',
    description: 'Solución integral para pequeñas y medianas empresas. Todo en una sola póliza.',
    shortDesc: 'Multirriesgo empresarial completo',
    target: ['empresas'],
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
    priceFrom: 'consultar',
    features: [
      'Multirriesgo completo',
      'RC de explotación',
      'Pérdida de beneficios',
      'Equipos electrónicos',
    ],
    benefits: [
      'Póliza todo en uno',
      'Asesor dedicado',
    ],
    coverage: [
      'Instalaciones',
      'Maquinaria',
      'RC hasta 1.200.000€',
    ],
  },

  // VIDA Y SALUD
  {
    id: 'vida',
    name: 'Seguro de Vida',
    slug: 'vida',
    category: 'Vida',
    description: 'Protege el futuro de los tuyos. Capital asegurado flexible y coberturas adicionales disponibles.',
    shortDesc: 'Protección para tu familia',
    target: ['particulares', 'autonomos'],
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200',
    priceFrom: 'desde 8€/mes',
    features: [
      'Fallecimiento',
      'Invalidez permanente',
      'Enfermedades graves',
      'Sin reconocimiento médico hasta 50.000€',
    ],
    benefits: [
      'Capital flexible',
      'Coberturas adicionales',
    ],
    coverage: [
      'Capital desde 30.000€',
      'Hasta 600.000€',
    ],
  },
  {
    id: 'decesos',
    name: 'Seguro de Decesos',
    slug: 'decesos',
    category: 'Vida',
    description: 'Tranquilidad en los momentos difíciles. Gestión completa del sepelio con cobertura mundial.',
    shortDesc: 'Gestión completa del sepelio',
    target: ['particulares'],
    icon: 'Shield',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200',
    priceFrom: 'desde 6€/mes',
    features: [
      'Gestión completa',
      'Cobertura mundial',
      'Asistencia familiar',
      'Testamento online',
    ],
    benefits: [
      'Sin carencias',
      'Revalorización automática',
    ],
    coverage: [
      'Capital hasta 10.000€',
      'Repatriación incluida',
    ],
  },
  {
    id: 'salud',
    name: 'Seguro de Salud',
    slug: 'salud',
    category: 'Salud',
    description: 'Tu salud es lo primero. Cuadro médico de 44.000 servicios con videoconsulta 24h.',
    shortDesc: 'Asistencia sanitaria completa',
    target: ['particulares', 'autonomos', 'empresas'],
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200',
    priceFrom: 'desde 35€/mes',
    features: [
      '44.000 servicios médicos',
      'Videoconsulta 24h',
      'Segunda opinión médica',
      'Sin carencias',
    ],
    benefits: [
      'App móvil',
      'Cita online',
    ],
    coverage: [
      'Medicina general',
      'Especialistas',
      'Hospitalizaciones',
    ],
  },

  // AHORRO
  {
    id: 'ahorro',
    name: 'Ahorro y Jubilación',
    slug: 'ahorro',
    category: 'Ahorro',
    description: 'Planifica tu futuro financiero. PIAS, planes de pensiones y fondos de inversión.',
    shortDesc: 'Ahorro para tu jubilación',
    target: ['particulares', 'autonomos'],
    icon: 'PiggyBank',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200',
    priceFrom: 'desde 50€/mes',
    features: [
      'Ventajas fiscales',
      'Aportaciones flexibles',
      'Diferentes perfiles de riesgo',
      'Gestión profesional',
    ],
    benefits: [
      'Desgrava en IRPF',
      'Rentabilidad a largo plazo',
    ],
    coverage: [
      'Ahorro garantizado',
      'Complemento jubilación',
    ],
  },

  // OTROS
  {
    id: 'mascotas',
    name: 'Seguro de Mascotas',
    slug: 'mascotas',
    category: 'Mascotas',
    description: 'Cuida de tu mascota con las mejores coberturas veterinarias y RC por daños a terceros.',
    shortDesc: 'Salud para tu mascota',
    target: ['particulares'],
    icon: 'Dog',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200',
    priceFrom: 'desde 12€/mes',
    features: [
      'Asistencia veterinaria',
      'Cirugías',
      'Medicamentos',
      'RC por daños',
    ],
    benefits: [
      'Red de clínicas',
      'Urgencias 24h',
    ],
    coverage: [
      'Gastos hasta 3.000€/año',
      'RC hasta 120.000€',
    ],
  },
  {
    id: 'viajes',
    name: 'Seguro de Viajes',
    slug: 'viajes',
    category: 'Viajes',
    description: 'Viaja tranquilo con asistencia médica, cancelación y pérdida de equipaje. Cobertura mundial.',
    shortDesc: 'Protección en tus viajes',
    target: ['particulares', 'empresas'],
    icon: 'Plane',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200',
    priceFrom: 'desde 15€',
    features: [
      'Asistencia médica',
      'Cancelación',
      'Pérdida de equipaje',
      'Repatriación',
    ],
    benefits: [
      'Asistencia 24/7',
      'Cobertura COVID-19',
    ],
    coverage: [
      'Gastos médicos hasta 50.000€',
      'Cancelación hasta 3.000€',
    ],
  },
  {
    id: 'accidentes',
    name: 'Seguro de Accidentes',
    slug: 'accidentes',
    category: 'Accidentes',
    description: 'Protección económica ante accidentes. Fallecimiento e invalidez con cobertura 24/7.',
    shortDesc: 'Protección ante accidentes',
    target: ['particulares', 'autonomos'],
    icon: 'AlertTriangle',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200',
    priceFrom: 'desde 6€/mes',
    features: [
      'Fallecimiento por accidente',
      'Invalidez permanente',
      'Asistencia sanitaria',
      'Cobertura 24/7',
    ],
    benefits: [
      'Mundial',
      'Sin reconocimiento médico',
    ],
    coverage: [
      'Capital hasta 300.000€',
    ],
  },
  {
    id: 'rc-profesional',
    name: 'RC Profesional',
    slug: 'rc-profesional',
    category: 'Responsabilidad Civil',
    description: 'Responsabilidad civil profesional adaptada a cada profesión. Protección ante reclamaciones.',
    shortDesc: 'RC para profesionales',
    target: ['autonomos', 'empresas'],
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200',
    priceFrom: 'desde 180€/año',
    features: [
      'Errores y omisiones',
      'Defensa jurídica',
      'Fianzas',
      'Gastos de defensa',
    ],
    benefits: [
      'Adaptado a cada profesión',
      'Cobertura retroactiva',
    ],
    coverage: [
      'Hasta 1.200.000€',
    ],
  },
  {
    id: 'juridica',
    name: 'Protección Jurídica',
    slug: 'proteccion-juridica',
    category: 'Protección Jurídica',
    description: 'Defensa legal en todas las áreas. Asesoramiento y defensa jurídica incluida.',
    shortDesc: 'Defensa legal completa',
    target: ['particulares', 'autonomos', 'empresas'],
    icon: 'Scale',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200',
    priceFrom: 'desde 45€/año',
    features: [
      'Defensa en multas',
      'Conflictos laborales',
      'Asesoramiento 24/7',
      'Abogados especializados',
    ],
    benefits: [
      'Sin franquicia',
      'Cobertura integral',
    ],
    coverage: [
      'Hasta 30.000€ por siniestro',
    ],
  },
  {
    id: 'ciberseguros',
    name: 'Ciberseguros',
    slug: 'ciberseguros',
    category: 'Ciberseguros',
    description: 'Protección digital ante fraude online, robo de identidad y ciberataques.',
    shortDesc: 'Protección digital',
    target: ['particulares', 'empresas'],
    icon: 'Shield',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200',
    priceFrom: 'desde 45€/año',
    features: [
      'Fraude online',
      'Robo de identidad',
      'Ciberataques',
      'Asistencia técnica',
    ],
    benefits: [
      'Asistencia 24/7',
      'Recuperación de datos',
    ],
    coverage: [
      'Hasta 10.000€ en fraudes',
    ],
  },
];

// ============================================================================
// UTILIDADES
// ============================================================================

export function getProductsByTarget(target: 'particulares' | 'autonomos' | 'empresas'): InsuranceProduct[] {
  return ALL_INSURANCE_PRODUCTS.filter(p => p.target.includes(target));
}

export function getProductBySlug(slug: string): InsuranceProduct | undefined {
  return ALL_INSURANCE_PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): InsuranceProduct[] {
  return ALL_INSURANCE_PRODUCTS.filter(p => p.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(ALL_INSURANCE_PRODUCTS.map(p => p.category))];
}

export const TOTAL_PRODUCTS = ALL_INSURANCE_PRODUCTS.length;
