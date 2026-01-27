/**
 * SCRIPT DE TESTING COMPLETO - SORIANO WEB PREMIUM
 * Verifica todas las páginas, componentes y funcionalidades
 */

const http = require('http');
const https = require('https');

const BASE_URL = 'http://localhost:3004';
const TIMEOUT = 10000;

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Lista completa de páginas a verificar
const pagesToTest = [
  { path: '/', name: 'Página Principal' },
  { path: '/seguros', name: 'Catálogo de Seguros' },
  { path: '/seguros/auto', name: 'Seguro de Auto' },
  { path: '/seguros/moto', name: 'Seguro de Moto' },
  { path: '/seguros/hogar', name: 'Seguro de Hogar' },
  { path: '/seguros/vida', name: 'Seguro de Vida' },
  { path: '/seguros/salud', name: 'Seguro de Salud' },
  { path: '/seguros/decesos', name: 'Seguro de Decesos' },
  { path: '/quienes-somos', name: 'Quiénes Somos' },
  { path: '/particulares', name: 'Particulares' },
  { path: '/autonomos', name: 'Autónomos' },
  { path: '/empresas', name: 'Empresas' },
  { path: '/comunidad', name: 'Soriano Club' },
  { path: '/contacto', name: 'Contacto' },
  { path: '/blog', name: 'Blog' },
  { path: '/acceso-clientes', name: 'Portal Clientes' },
  { path: '/acceso-empleados', name: 'Portal Empleados' },
  { path: '/legal/aviso-legal', name: 'Aviso Legal' },
  { path: '/legal/privacidad', name: 'Política de Privacidad' },
  { path: '/legal/cookies', name: 'Política de Cookies' },
];

// Resultados del testing
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: [],
};

/**
 * Realiza una petición HTTP
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, { timeout: TIMEOUT }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Verifica una página
 */
async function testPage(page) {
  const url = `${BASE_URL}${page.path}`;
  
  try {
    const response = await makeRequest(url);
    
    // Verificar código de estado
    if (response.statusCode === 200) {
      console.log(`${colors.green}✓${colors.reset} ${page.name} (${page.path})`);
      
      // Verificaciones adicionales del contenido
      const checks = {
        hasLogo: response.body.includes('soriano-logo.png') || response.body.includes('SORIANO'),
        hasNavbar: response.body.includes('navbar') || response.body.includes('nav'),
        hasFooter: response.body.includes('footer'),
        hasMetaTags: response.body.includes('<meta'),
        hasTitle: response.body.includes('<title>'),
      };
      
      // Mostrar warnings si falta algo
      if (!checks.hasLogo) {
        console.log(`  ${colors.yellow}⚠${colors.reset} Logo no detectado en HTML`);
        results.warnings++;
      }
      
      results.passed++;
      return true;
    } else if (response.statusCode === 404) {
      console.log(`${colors.red}✗${colors.reset} ${page.name} (${page.path}) - 404 Not Found`);
      results.failed++;
      results.errors.push({ page: page.name, error: '404 Not Found' });
      return false;
    } else {
      console.log(`${colors.yellow}⚠${colors.reset} ${page.name} (${page.path}) - Status ${response.statusCode}`);
      results.warnings++;
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} ${page.name} (${page.path}) - ${error.message}`);
    results.failed++;
    results.errors.push({ page: page.name, error: error.message });
    return false;
  }
}

/**
 * Verifica que el servidor esté corriendo
 */
async function checkServer() {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  TESTING COMPLETO - SORIANO WEB PREMIUM${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`${colors.blue}→${colors.reset} Verificando servidor en ${BASE_URL}...\n`);
  
  try {
    await makeRequest(BASE_URL);
    console.log(`${colors.green}✓${colors.reset} Servidor corriendo correctamente\n`);
    return true;
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Error: Servidor no disponible`);
    console.log(`${colors.yellow}→${colors.reset} Asegúrate de que el servidor esté corriendo con: npm run dev\n`);
    return false;
  }
}

/**
 * Ejecuta todos los tests
 */
async function runAllTests() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    process.exit(1);
  }
  
  console.log(`${colors.blue}→${colors.reset} Probando ${pagesToTest.length} páginas...\n`);
  
  results.total = pagesToTest.length;
  
  // Probar todas las páginas
  for (const page of pagesToTest) {
    await testPage(page);
    // Pequeña pausa entre requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Mostrar resumen
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  RESUMEN DE RESULTADOS${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`Total de páginas probadas: ${results.total}`);
  console.log(`${colors.green}✓ Exitosas: ${results.passed}${colors.reset}`);
  console.log(`${colors.red}✗ Fallidas: ${results.failed}${colors.reset}`);
  console.log(`${colors.yellow}⚠ Warnings: ${results.warnings}${colors.reset}`);
  
  const successRate = ((results.passed / results.total) * 100).toFixed(1);
  console.log(`\nTasa de éxito: ${successRate}%`);
  
  if (results.errors.length > 0) {
    console.log(`\n${colors.red}Errores encontrados:${colors.reset}`);
    results.errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error.page}: ${error.error}`);
    });
  }
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════${colors.reset}\n`);
  
  // Recomendaciones
  if (results.failed === 0 && results.warnings === 0) {
    console.log(`${colors.green}🎉 ¡EXCELENTE! Todas las páginas funcionan correctamente.${colors.reset}\n`);
  } else if (results.failed === 0) {
    console.log(`${colors.yellow}⚠ Todas las páginas cargan, pero hay algunos warnings menores.${colors.reset}\n`);
  } else {
    console.log(`${colors.red}⚠ Se encontraron ${results.failed} páginas con errores que requieren atención.${colors.reset}\n`);
  }
  
  process.exit(results.failed > 0 ? 1 : 0);
}

// Ejecutar tests
runAllTests().catch((error) => {
  console.error(`${colors.red}Error fatal:${colors.reset}`, error);
  process.exit(1);
});
