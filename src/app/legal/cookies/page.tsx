import { Metadata } from 'next'
import { COMPANY_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de Soriano Mediadores. Conoce qué cookies utilizamos y cómo gestionarlas.',
}

export default function CookiesPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-display-sm font-display font-bold text-soriano-dark mb-8">
            Política de Cookies
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-soriano-gray">
              Última actualización: Enero 2024
            </p>

            <h2>¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo
              cuando visitas un sitio web. Se utilizan ampliamente para hacer que los sitios
              web funcionen de manera más eficiente y para proporcionar información a los
              propietarios del sitio.
            </p>

            <h2>¿Qué tipos de cookies utilizamos?</h2>

            <h3>Cookies estrictamente necesarias</h3>
            <p>
              Son esenciales para que puedas navegar por el sitio web y utilizar sus funciones.
              Sin estas cookies, no podemos proporcionar ciertos servicios.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Propósito</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>session_id</td>
                  <td>Mantener la sesión del usuario</td>
                  <td>Sesión</td>
                </tr>
                <tr>
                  <td>cookie_consent</td>
                  <td>Recordar preferencias de cookies</td>
                  <td>1 año</td>
                </tr>
              </tbody>
            </table>

            <h3>Cookies de rendimiento y análisis</h3>
            <p>
              Nos permiten contar las visitas y fuentes de tráfico para medir y mejorar
              el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más
              y menos populares.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Propósito</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga</td>
                  <td>Google Analytics - Distinguir usuarios</td>
                  <td>2 años</td>
                </tr>
                <tr>
                  <td>_gid</td>
                  <td>Google Analytics - Distinguir usuarios</td>
                  <td>24 horas</td>
                </tr>
                <tr>
                  <td>_gat</td>
                  <td>Google Analytics - Limitar solicitudes</td>
                  <td>1 minuto</td>
                </tr>
              </tbody>
            </table>

            <h3>Cookies de funcionalidad</h3>
            <p>
              Permiten que el sitio web recuerde las opciones que has seleccionado y
              proporcione funciones mejoradas y más personales.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Propósito</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>soriano-storage</td>
                  <td>Almacenar preferencias del usuario</td>
                  <td>1 año</td>
                </tr>
                <tr>
                  <td>calculator_data</td>
                  <td>Guardar datos de calculadoras</td>
                  <td>30 días</td>
                </tr>
              </tbody>
            </table>

            <h2>¿Cómo gestionar las cookies?</h2>
            <p>
              Puedes configurar tu navegador para rechazar todas las cookies o para indicar
              cuándo se envía una cookie. Sin embargo, si no aceptas cookies, es posible que
              no puedas utilizar algunas partes de nuestro sitio web.
            </p>

            <h3>Configuración por navegador:</h3>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener">Microsoft Edge</a></li>
            </ul>

            <h2>Cookies de terceros</h2>
            <p>
              En algunos casos especiales también utilizamos cookies proporcionadas por
              terceros de confianza. La siguiente sección detalla qué cookies de terceros
              puedes encontrar a través de este sitio.
            </p>
            <ul>
              <li>
                <strong>Google Analytics:</strong> Utilizamos Google Analytics para entender
                cómo utilizas el sitio y mejorar tu experiencia.
              </li>
              <li>
                <strong>Google Tag Manager:</strong> Para gestionar etiquetas de marketing
                y análisis.
              </li>
            </ul>

            <h2>Más información</h2>
            <p>
              Si tienes alguna pregunta sobre nuestra política de cookies, puedes contactarnos:
            </p>
            <ul>
              <li>Email: {COMPANY_INFO.email}</li>
              <li>Teléfono: {COMPANY_INFO.phone}</li>
              <li>Dirección: {COMPANY_INFO.address.full}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
