# Soriano Mediadores - Plataforma Insurtech Premium

> "El Apple del seguro" - Plataforma web premium para Soriano Mediadores de Seguros S.L.

## Descripcion

Plataforma insurtech revolucionaria que transforma la experiencia del cliente de seguros con:

- **Diseno Apple-Style**: UI/UX premium con dark mode completo
- **Asistente SORI IA**: Chat inteligente con Groq + Claude como fallback
- **Gamificacion "Soriano Club"**: Sistema de puntos, niveles y badges
- **Dashboard Premium**: Gestion completa de polizas, recibos, siniestros y documentos
- **Backend Robusto**: NextAuth + Prisma + PostgreSQL

## Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + Framer Motion
- Prisma ORM + PostgreSQL
- NextAuth.js (JWT)
- Groq SDK / Anthropic Claude
- jsPDF para generacion de documentos

## Instalacion

```bash
git clone https://github.com/ramakjama/www.sorianomediadores.es-website.git
cd www.sorianomediadores.es-website
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run dev
```

## Variables de Entorno

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."
GROQ_API_KEY="gsk_..."
ANTHROPIC_API_KEY="sk-ant-..." (opcional)
```

## Estructura del Proyecto

```
src/
├── app/           # Next.js App Router
├── components/    # Componentes React
├── hooks/         # Custom hooks
├── lib/           # Utilidades
└── prisma/        # Schema de BD
```

## Sistema de Gamificacion

| Nivel | Puntos | Descuento |
|-------|--------|-----------|
| Bronce | 0-999 | 0% |
| Plata | 1000-4999 | 5% |
| Oro | 5000-14999 | 10% |
| Platino | 15000+ | 15% |

## Contacto

- **Web**: www.sorianomediadores.es
- **Email**: info@sorianomediadores.es
- **Tel**: +34 966 810 290
- **Direccion**: Calle Constitucion 5, 03570 Villajoyosa (Alicante)

---

Desarrollado con el respaldo de **Occident - Grupo Catalana Occidente**
