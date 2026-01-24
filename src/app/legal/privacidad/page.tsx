import { Metadata } from 'next'
import { COMPANY_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Soriano Mediadores. Conoce cómo tratamos y protegemos tus datos personales.',
}

export default function PrivacidadPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-display-sm font-display font-bold text-soriano-dark mb-8">
            Política de Privacidad
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-soriano-gray">
              Última actualización: Enero 2024
            </p>

            <h2>1. Responsable del Tratamiento</h2>
            <p>
              <strong>Razón Social:</strong> {COMPANY_INFO.fullName}<br />
              <strong>NIF:</strong> {COMPANY_INFO.legal.nif}<br />
              <strong>Dirección:</strong> {COMPANY_INFO.address.full}<br />
              <strong>Email:</strong> {COMPANY_INFO.email}<br />
              <strong>Teléfono:</strong> {COMPANY_INFO.phone}
            </p>

            <h2>2. Finalidad del Tratamiento</h2>
            <p>En {COMPANY_INFO.name} tratamos la información que nos facilitas con las siguientes finalidades:</p>
            <ul>
              <li>Gestionar la relación contractual de mediación de seguros</li>
              <li>Tramitar solicitudes de información y presupuestos</li>
              <li>Gestionar siniestros y reclamaciones</li>
              <li>Enviar comunicaciones comerciales (con tu consentimiento)</li>
              <li>Cumplir obligaciones legales y regulatorias</li>
            </ul>

            <h2>3. Legitimación</h2>
            <p>La base legal para el tratamiento de tus datos es:</p>
            <ul>
              <li>La ejecución de un contrato de mediación de seguros</li>
              <li>Tu consentimiento expreso para determinados tratamientos</li>
              <li>El cumplimiento de obligaciones legales aplicables</li>
              <li>El interés legítimo de la empresa</li>
            </ul>

            <h2>4. Destinatarios</h2>
            <p>Tus datos podrán ser comunicados a:</p>
            <ul>
              <li>Compañías aseguradoras con las que trabajamos (principalmente Occident)</li>
              <li>Administraciones públicas cuando sea legalmente necesario</li>
              <li>Entidades financieras para la gestión de cobros</li>
              <li>Proveedores de servicios tecnológicos</li>
            </ul>

            <h2>5. Conservación</h2>
            <p>
              Los datos personales se conservarán mientras dure la relación contractual y,
              posteriormente, durante los plazos de prescripción legalmente establecidos
              (mínimo 5 años según la normativa de mediación de seguros).
            </p>

            <h2>6. Derechos</h2>
            <p>Puedes ejercer los siguientes derechos:</p>
            <ul>
              <li><strong>Acceso:</strong> Conocer qué datos tratamos sobre ti</li>
              <li><strong>Rectificación:</strong> Modificar datos incorrectos</li>
              <li><strong>Supresión:</strong> Eliminar tus datos cuando sea posible</li>
              <li><strong>Oposición:</strong> Oponerte a determinados tratamientos</li>
              <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
              <li><strong>Limitación:</strong> Restringir el tratamiento en ciertos casos</li>
            </ul>
            <p>
              Para ejercer estos derechos, contacta con nosotros en {COMPANY_INFO.email}
              indicando "Protección de Datos" en el asunto.
            </p>

            <h2>7. Seguridad</h2>
            <p>
              Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos
              personales contra el tratamiento no autorizado o ilícito y contra su pérdida,
              destrucción o daño accidental.
            </p>

            <h2>8. Cookies</h2>
            <p>
              Este sitio web utiliza cookies. Para más información, consulta nuestra{' '}
              <a href="/legal/cookies">Política de Cookies</a>.
            </p>

            <h2>9. Cambios en la Política</h2>
            <p>
              Nos reservamos el derecho de modificar esta política de privacidad para adaptarla
              a novedades legislativas o jurisprudenciales. Los cambios serán comunicados a
              través de este sitio web.
            </p>

            <h2>10. Reclamaciones</h2>
            <p>
              Si consideras que el tratamiento de tus datos no es adecuado, puedes presentar
              una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
