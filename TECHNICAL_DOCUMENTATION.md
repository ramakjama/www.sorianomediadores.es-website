# SORIANO MEDIADORES - DOCUMENTACION TECNICA

## Plataforma Insurtech Premium

**Version:** 1.0.0
**Fecha:** Enero 2025
**Proyecto:** soriano-web-premium

---

## 1. STACK TECNOLOGICO

### Frontend
| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Next.js | 14.2.15 | Framework React con App Router |
| React | 18.3.1 | Libreria UI |
| TypeScript | 5.9.3 | Tipado estatico |
| Tailwind CSS | 3.4.16 | Estilos utility-first |
| Framer Motion | 12.0.0 | Animaciones |
| Lucide React | 0.469.0 | Iconos |

### Backend
| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Next.js API Routes | 14.2 | APIs REST |
| Prisma | 5.22.0 | ORM |
| PostgreSQL | - | Base de datos |
| NextAuth.js | 4.24.13 | Autenticacion |
| bcryptjs | 3.0.3 | Hashing passwords |

### IA / Chat
| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Anthropic SDK | 0.71.2 | Claude API (SORI AI) |
| OpenAI SDK | - | Backup/alternativa |

### Estado y Data Fetching
| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| TanStack Query | 5.90.20 | Server state |
| Zustand | 5.0.2 | Client state |
| React Hook Form | 7.54.0 | Formularios |
| Zod | 3.25.76 | Validacion schemas |

### UI Components
| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Headless UI | 2.2.0 | Componentes accesibles |
| Recharts | 2.15.0 | Graficos |
| Swiper | 11.2.0 | Carruseles |
| React Hot Toast | 2.5.0 | Notificaciones |
| next-themes | 0.4.6 | Dark mode |

---

## 2. ARQUITECTURA DEL PROYECTO

```
soriano-web-premium/
├── prisma/
│   ├── schema.prisma          # Modelos de base de datos
│   └── seed.ts                # Datos iniciales
├── public/
│   ├── favicon.svg            # Icono del sitio
│   ├── icon.svg               # Icono PWA
│   └── manifest.json          # Configuracion PWA
├── src/
│   ├── app/                   # App Router (Next.js 14)
│   │   ├── (dashboard)/       # Rutas protegidas
│   │   │   ├── dashboard/
│   │   │   ├── siniestros/
│   │   │   └── soriano-club/
│   │   ├── api/               # API Routes
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   ├── claims/
│   │   │   ├── gamification/
│   │   │   ├── policies/
│   │   │   └── users/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── seguros/
│   │   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── legal/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── home/              # Componentes de home
│   │   ├── layout/            # Navbar, Footer
│   │   ├── providers/         # Context providers
│   │   └── ui/                # Componentes reutilizables
│   └── lib/
│       ├── ai/                # SORI AI (Claude)
│       ├── auth.ts            # Configuracion NextAuth
│       ├── prisma.ts          # Cliente Prisma
│       ├── constants.ts       # Constantes globales
│       └── blog-data.ts       # Datos del blog (50 articulos)
├── .env                       # Variables de entorno
├── next.config.js             # Configuracion Next.js
├── tailwind.config.js         # Configuracion Tailwind
└── package.json
```

---

## 3. BASE DE DATOS (Prisma Schema)

### Modelos Principales

```prisma
// Usuario
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String?
  name          String?
  phone         String?
  role          Role      @default(CLIENTE)
  level         Level     @default(BRONCE)
  points        Int       @default(0)
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  policies      Policy[]
  claims        Claim[]
  conversations Conversation[]
  badges        UserBadge[]
  referrals     Referral[]
  pointsHistory PointsHistory[]
}

// Poliza
model Policy {
  id           String       @id @default(cuid())
  policyNumber String       @unique
  type         PolicyType
  status       PolicyStatus @default(ACTIVA)
  startDate    DateTime
  endDate      DateTime
  premium      Float
  userId       String
  user         User         @relation(fields: [userId])
  claims       Claim[]
  createdAt    DateTime     @default(now())
}

// Siniestro
model Claim {
  id          String      @id @default(cuid())
  claimNumber String      @unique
  type        String
  status      ClaimStatus @default(COMUNICADO)
  description String
  amount      Float?
  policyId    String
  policy      Policy      @relation(fields: [policyId])
  userId      String
  user        User        @relation(fields: [userId])
  timeline    ClaimEvent[]
  createdAt   DateTime    @default(now())
}

// Conversacion Chat
model Conversation {
  id        String        @id @default(cuid())
  userId    String
  user      User          @relation(fields: [userId])
  title     String?
  messages  ChatMessage[]
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
}

// Insignia (Gamificacion)
model Badge {
  id          String      @id @default(cuid())
  name        String      @unique
  description String
  icon        String
  category    String
  requirement Int         @default(0)
  users       UserBadge[]
}
```

### Enums

```prisma
enum Role {
  CLIENTE
  EMPLEADO
  ADMIN
}

enum Level {
  BRONCE    // 0-999 puntos
  PLATA     // 1000-4999 puntos
  ORO       // 5000-14999 puntos
  PLATINO   // 15000+ puntos
}

enum PolicyType {
  AUTO
  MOTO
  HOGAR
  VIDA
  SALUD
  AHORRO
  DECESOS
  COMUNIDADES
  RC_PROFESIONAL
  MULTIRRIESGO
}

enum ClaimStatus {
  COMUNICADO
  DOCUMENTACION
  EN_REVISION
  APROBADO
  EN_PROCESO
  RESUELTO
  RECHAZADO
}
```

---

## 4. APIs REST

### Autenticacion
| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/[...nextauth]` | Login/Logout (NextAuth) |

### Chat (SORI AI)
| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/chat` | Obtener conversaciones |
| POST | `/api/chat` | Enviar mensaje a SORI |

### Polizas
| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/policies` | Listar polizas del usuario |
| GET | `/api/policies/[id]` | Detalle de poliza |

### Siniestros
| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/claims` | Listar siniestros |
| POST | `/api/claims` | Crear siniestro |
| GET | `/api/claims/[id]` | Detalle siniestro |

### Gamificacion
| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/gamification` | Puntos, nivel, badges |
| GET | `/api/gamification/leaderboard` | Ranking |

---

## 5. SORI AI - Asistente Virtual

### Configuracion
```typescript
// src/lib/ai/claude-client.ts
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Modelo: claude-sonnet-4-20250514
// Max tokens: 1024
// System prompt: SORI_SYSTEM_PROMPT + SORI_KNOWLEDGE_BASE
```

### Capacidades de SORI
- Responder preguntas sobre seguros
- Informar sobre productos Occident
- Guiar en proceso de siniestros
- Onboarding de nuevos clientes
- Derivar a agentes humanos cuando necesario

### Fallback
Si la API de Claude no esta disponible, SORI usa respuestas pre-programadas inteligentes basadas en keywords.

---

## 6. GAMIFICACION - SORIANO CLUB

### Sistema de Puntos
| Accion | Puntos |
|--------|--------|
| Perfil completo | 100 |
| Nueva poliza | 500 |
| Renovacion | 300 |
| Referido registrado | 200 |
| Referido convierte | 500 |
| Chat con SORI (1/dia) | 10 |
| Dejar review | 100 |

### Niveles
| Nivel | Puntos | Descuento | Color |
|-------|--------|-----------|-------|
| Bronce | 0-999 | 0% | #CD7F32 |
| Plata | 1000-4999 | 5% | #C0C0C0 |
| Oro | 5000-14999 | 10% | #FFD700 |
| Platino | 15000+ | 15% | #E5E4E2 |

### Badges (9)
1. Early Adopter - Primeros 100 usuarios
2. Asegurado Total - 5+ polizas
3. Embajador - 10+ referidos
4. Leyenda Fiel - 5+ anos cliente
5. Amigo de SORI - 50+ conversaciones
6. Sin Siniestros - 3 anos sin claims
7. Cobertura Total - Todas las coberturas
8. Digital First - App usuario frecuente
9. Comunidad Activa - Participacion activa

---

## 7. RUTAS Y PAGINAS

### Publicas
| Ruta | Descripcion |
|------|-------------|
| `/` | Home |
| `/seguros` | Catalogo de seguros |
| `/seguros/[slug]` | Detalle de producto |
| `/blog` | Blog (50 articulos) |
| `/blog/[slug]` | Articulo individual |
| `/quienes-somos` | Equipo (8 miembros) |
| `/comunidad` | Soriano Club info |
| `/contacto` | Formulario contacto |
| `/particulares` | Seguros particulares |
| `/autonomos` | Seguros autonomos |
| `/empresas` | Seguros empresas |
| `/legal/*` | Paginas legales |

### Protegidas (requieren login)
| Ruta | Descripcion |
|------|-------------|
| `/dashboard` | Panel principal |
| `/polizas` | Mis polizas |
| `/siniestros` | Mis siniestros |
| `/soriano-club` | Mi nivel y puntos |
| `/documentos` | Mis documentos |
| `/perfil` | Mi perfil |

### Autenticacion
| Ruta | Descripcion |
|------|-------------|
| `/acceso-clientes` | Login clientes |
| `/acceso-empleados` | Login empleados |

---

## 8. VARIABLES DE ENTORNO

```env
# Base de datos
DATABASE_URL="prisma+postgres://..."

# NextAuth
NEXTAUTH_URL="http://localhost:4001"
NEXTAUTH_SECRET="soriano-mediadores-secret-key-2024-premium-insurtech"

# APIs de IA
ANTHROPIC_API_KEY="sk-ant-api03-..."
OPENAI_API_KEY="sk-proj-..."
```

---

## 9. OPTIMIZACIONES DE RENDIMIENTO

### Next.js Config
```javascript
// next.config.js
{
  trailingSlash: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'recharts',
      '@headlessui/react',
      'date-fns',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 ano
  },
}
```

### Lazy Loading
- ChatWidget: `dynamic()` con `ssr: false`
- Toaster: `dynamic()` con `ssr: false`
- Componentes below-the-fold en Home

### Animaciones CSS
- Keyframes optimizados (opacity + transform)
- Sin Framer Motion en componentes criticos
- `prefers-reduced-motion` respetado

---

## 10. PALETA DE COLORES

### Marca Occident
| Color | Hex | Uso |
|-------|-----|-----|
| Rojo primario | #E30613 | CTAs, acentos |
| Rojo hover | #CC050F | Hover states |
| Rojo dark | #B00410 | Active states |

### Superficies Light
| Color | Hex | Uso |
|-------|-----|-----|
| Primary | #FAFAFA | Fondo principal |
| Secondary | #F5F5F5 | Secciones alternas |
| Elevated | #FFFFFF | Cards |

### Superficies Dark
| Color | Hex | Uso |
|-------|-----|-----|
| Primary | #0D0D0D | Fondo principal |
| Secondary | #111111 | Secciones alternas |
| Elevated | #171717 | Cards |

---

## 11. COMANDOS

```bash
# Desarrollo
npm run dev              # Inicia servidor dev
npm run build            # Build produccion
npm run start            # Inicia produccion
npm run lint             # ESLint

# Base de datos
npx prisma generate      # Genera cliente
npx prisma db push       # Push schema
npx prisma db seed       # Ejecuta seed
npx prisma studio        # GUI base de datos

# TypeScript
npx tsc --noEmit         # Verifica tipos
```

---

## 12. EQUIPO SORIANO MEDIADORES

| Nombre | Puesto | Email |
|--------|--------|-------|
| Ramon Soriano Agullo | Director | ramon.soriano@sorianomediadores.es |
| Hector Nolivos Alvarez | Responsable TIC | hector.nolivos@sorianomediadores.es |
| Pau Ripoll Llorca | Subdirector | pau.ripoll@sorianomediadores.es |
| Juan Ignacio Perez | Resp. Asesor Comercial | juan.ignacio@sorianomediadores.es |
| Toni Medina Llorca | Asesor Comercial | toni.medina@sorianomediadores.es |
| Alberto Alcala Tomas | Agente Atencion Cliente | alberto.alcala@sorianomediadores.es |
| Laura Fernandez Such | Resp. Agente Atencion | laura.fernandez@sorianomediadores.es |
| Tania Zhyla | Asesora Comercial | - |

---

## 13. CONTACTO EMPRESA

**Soriano Mediadores de Seguros S.L.**
- Direccion: Calle Constitucion 5, 03570 Villajoyosa (Alicante)
- Telefono: 966 810 290
- Email: info@sorianomediadores.es
- Horario: L-V 9:00-17:00

---

## 14. PENDIENTES (Assets)

| Asset | Estado |
|-------|--------|
| Logo Soriano Mediadores | Pendiente |
| Logo Occident | Pendiente |
| Favicon real | Pendiente |
| Fotos equipo (8) | Pendiente |
| Apple touch icon | Pendiente |

---

*Documento generado automaticamente - Enero 2025*
