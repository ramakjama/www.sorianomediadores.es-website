# Guía de Deploy en Hostinger - Soriano Mediadores

## ⚠️ IMPORTANTE: Requisito de Node.js

Este proyecto requiere **Node.js 18 o 20 LTS** para compilar correctamente.

Tu versión actual (Node.js 22) tiene un bug conocido que afecta al build de Next.js.

### Solución: Usar Node.js 20 LTS

**Opción 1: Con NVM (Node Version Manager)**
```bash
# Instalar NVM si no lo tienes: https://github.com/nvm-sh/nvm
nvm install 20
nvm use 20
node --version  # Debe mostrar v20.x.x
```

**Opción 2: Instalar Node.js 20 directamente**
Descarga e instala desde: https://nodejs.org/en/download/

---

## Pasos para el Deploy

### 1. Verificar versión de Node.js

```bash
node --version
# Debe ser v18.x.x o v20.x.x
```

### 2. Instalar dependencias

```bash
cd soriano-web-premium
npm install
```

### 3. Generar build de producción

```bash
npm run build
```

Esto generará una carpeta `out/` con todos los archivos estáticos listos para Hostinger.

### 4. Subir archivos a Hostinger

#### Opción A: Via File Manager (Recomendada)

1. Accede al panel de Hostinger: https://hpanel.hostinger.com
2. Ve a "Archivos" → "Administrador de archivos"
3. Navega a `public_html`
4. **Elimina** todo el contenido actual (haz backup primero si necesitas)
5. Sube todo el contenido de la carpeta `out/`
6. Sube el archivo `.htaccess` a la raíz de `public_html`

#### Opción B: Via FTP (FileZilla)

```
Host: ftp.sorianomediadores.es
Puerto: 21
Usuario: (ver en panel Hostinger → FTP)
Contraseña: (ver en panel Hostinger → FTP)
```

1. Conecta con FileZilla
2. Navega a `public_html` en el servidor
3. Sube el contenido de `out/`
4. Sube `.htaccess`

### 5. Configurar SSL (Si no está activo)

1. En el panel de Hostinger, ve a "Seguridad" → "SSL"
2. Activa "SSL Gratis" (Let's Encrypt)
3. Selecciona tu dominio
4. Espera la activación

### 6. Verificar el deploy

Visita https://www.sorianomediadores.es y comprueba:

- ✅ Página principal carga correctamente
- ✅ Menú de navegación funciona
- ✅ Calculadoras de seguros
- ✅ Formulario de contacto
- ✅ Portal de clientes (/acceso-clientes)
- ✅ Portal de empleados (/acceso-empleados)
- ✅ Blog (/blog)
- ✅ Chatbot flotante (esquina inferior derecha)
- ✅ Versión móvil responsive

---

## Estructura del proyecto

```
soriano-web-premium/
├── src/
│   ├── app/                 # Páginas de Next.js
│   │   ├── page.tsx        # Página principal
│   │   ├── layout.tsx      # Layout global
│   │   ├── globals.css     # Estilos globales
│   │   ├── seguros/
│   │   ├── contacto/
│   │   ├── nosotros/
│   │   ├── blog/
│   │   ├── empresas/
│   │   ├── acceso-clientes/
│   │   ├── acceso-empleados/
│   │   └── legal/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   ├── home/           # Secciones del Home
│   │   └── ui/             # Componentes reutilizables
│   ├── lib/                # Utilidades y constantes
│   └── store/              # Estado global (Zustand)
├── public/
│   ├── manifest.json       # PWA
│   └── robots.txt          # SEO
├── package.json
├── tailwind.config.ts
├── next.config.js
└── .htaccess               # Apache config para Hostinger
```

---

## Características de la Web

### Diseño y UX Premium
- Diseño moderno y responsivo
- Animaciones fluidas con Framer Motion
- Sistema de colores corporativo
- Tipografía Inter + Plus Jakarta Sans
- Glassmorphism y gradientes premium

### Funcionalidades
- 🤖 **Chatbot interactivo** - Asistente virtual 24/7
- 🧮 **Calculadora de seguros** - Presupuestos instantáneos
- 📝 **Formulario de contacto** - Validación completa
- 🔐 **Portal de clientes** - Login y registro
- 👨‍💼 **Portal de empleados** - Acceso interno
- 📰 **Blog** - Artículos y consejos

### SEO y Performance
- Meta tags optimizados
- Schema.org para SEO local
- Sitemap XML automático
- Robots.txt configurado
- Caché optimizada (.htaccess)
- PWA ready

### Páginas Incluidas
| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con hero animado |
| `/seguros` | Catálogo de seguros |
| `/contacto` | Formulario de contacto |
| `/nosotros` | Historia y valores |
| `/blog` | Artículos y consejos |
| `/empresas` | Seguros para empresas |
| `/acceso-clientes` | Portal de clientes |
| `/acceso-empleados` | Portal interno |
| `/legal/*` | Páginas legales |

---

## Solución de problemas

### Error "generate is not a function" al compilar

**Causa:** Estás usando Node.js 22 que tiene un bug conocido.
**Solución:** Usa Node.js 18 o 20 LTS.

### Las rutas dan error 404

1. Verifica que `.htaccess` esté en `public_html`
2. En Hostinger → PHP → Activa mod_rewrite

### Error 500 Internal Server Error

1. Revisa logs: Hostinger → Avanzado → Logs de error
2. Verifica permisos de archivos (644 para archivos, 755 para carpetas)

### El chatbot no aparece

1. Limpia caché del navegador (Ctrl+Shift+R)
2. Verifica en F12 → Console que no hay errores de JavaScript

### Imágenes no cargan

1. Verifica rutas correctas (case-sensitive en Linux)
2. Comprueba permisos (644)

---

## Actualizaciones futuras

```bash
# 1. Hacer cambios en el código
# 2. Compilar
npm run build

# 3. Subir carpeta out/ a Hostinger
```

---

## Stack Tecnológico

- **Framework:** Next.js 15 (React 19)
- **Estilos:** Tailwind CSS 3.4
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Estado:** Zustand
- **Forms:** React Hook Form + Zod
- **Hosting:** Hostinger (Static Export)

---

## Contacto

- **Soriano Mediadores:** info@sorianomediadores.es
- **Soporte Hostinger:** https://support.hostinger.es
- **Documentación Next.js:** https://nextjs.org/docs

---

**🚀 ¡La mejor web de seguros del sector está lista!**
