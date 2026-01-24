import { Metadata } from 'next'
import { COMPANY_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal de Soriano Mediadores. Información legal sobre la empresa y condiciones de uso del sitio web.',
}

export default function AvisoLegalPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-display-sm font-display font-bold text-soriano-dark mb-8">
            Aviso Legal
          </h1>

          <div className="prose prose-lg max-w-none">
            <h2>1. Datos identificativos</h2>
            <p>
              En cumplimiento con el deber de información recogido en el artículo 10 de la
              Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y
              del Comercio Electrónico, a continuación se reflejan los siguientes datos:
            </p>
            <ul>
              <li><strong>Denominación social:</strong> {COMPANY_INFO.fullName}</li>
              <li><strong>NIF:</strong> {COMPANY_INFO.legal.nif}</li>
              <li><strong>Domicilio social:</strong> {COMPANY_INFO.address.full}</li>
              <li><strong>Teléfono:</strong> {COMPANY_INFO.phone}</li>
              <li><strong>Email:</strong> {COMPANY_INFO.email}</li>
              <li><strong>Registro Mercantil:</strong> {COMPANY_INFO.legal.registroMercantil}</li>
              <li><strong>Nº Registro DGSFP:</strong> {COMPANY_INFO.legal.dgsfp}</li>
            </ul>

            <h2>2. Actividad</h2>
            <p>
              {COMPANY_INFO.fullName} es un mediador de seguros inscrito en el Registro
              Administrativo Especial de Mediadores de Seguros, Corredores de Reaseguros y
              sus Altos Cargos de la Dirección General de Seguros y Fondos de Pensiones (DGSFP)
              con el número {COMPANY_INFO.legal.dgsfp}.
            </p>
            <p>
              Como mediador de seguros, actuamos de forma independiente respecto de las entidades
              aseguradoras, asesorando a nuestros clientes en la búsqueda de las coberturas que
              mejor se adapten a sus necesidades.
            </p>

            <h2>3. Condiciones de uso</h2>
            <p>
              El acceso a este sitio web atribuye la condición de usuario e implica la aceptación
              plena y sin reservas de todas y cada una de las disposiciones incluidas en este
              Aviso Legal.
            </p>
            <p>
              El usuario se compromete a:
            </p>
            <ul>
              <li>Hacer un uso adecuado de los contenidos y servicios ofrecidos</li>
              <li>No realizar actividades ilícitas o contrarias a la buena fe</li>
              <li>No difundir contenidos que atenten contra los derechos de terceros</li>
              <li>No introducir virus informáticos o sistemas que puedan dañar los sistemas</li>
            </ul>

            <h2>4. Propiedad intelectual e industrial</h2>
            <p>
              Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes,
              iconos, tecnología, software, enlaces y demás contenidos audiovisuales o sonoros),
              así como su diseño gráfico y códigos fuente, son propiedad intelectual de
              {COMPANY_INFO.name} o de terceros que han autorizado su uso.
            </p>
            <p>
              La reproducción, distribución, comunicación pública, transformación o cualquier
              otra actividad similar o análoga, de la totalidad o parte de los contenidos de
              este sitio web, queda totalmente prohibida sin el consentimiento previo y expreso.
            </p>

            <h2>5. Exclusión de responsabilidad</h2>
            <p>
              {COMPANY_INFO.name} no se hace responsable de:
            </p>
            <ul>
              <li>
                La información y contenidos almacenados en foros, chats, generadores de blogs,
                comentarios, redes sociales o cualquier otro medio que permita a terceros
                publicar contenidos
              </li>
              <li>
                Los posibles daños o perjuicios que se pudieran derivar de interferencias,
                omisiones, interrupciones, virus informáticos, averías y/o desconexiones
              </li>
              <li>
                Los daños que pudieran causarse por personas que vulneren los sistemas de
                seguridad
              </li>
            </ul>

            <h2>6. Enlaces a terceros</h2>
            <p>
              Este sitio web puede incluir enlaces a sitios de terceros. Las páginas pertenecientes
              a estos terceros no han sido revisadas ni son objeto de controles por nuestra parte.
              En ningún caso {COMPANY_INFO.name} será responsable de los contenidos de algún sitio
              web vinculado.
            </p>

            <h2>7. Modificaciones</h2>
            <p>
              {COMPANY_INFO.name} se reserva el derecho de efectuar sin previo aviso las
              modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir
              o añadir tanto los contenidos y servicios que se presten a través de la misma
              como la forma en la que éstos aparezcan presentados o localizados.
            </p>

            <h2>8. Legislación aplicable y jurisdicción</h2>
            <p>
              La relación entre {COMPANY_INFO.name} y el usuario se regirá por la normativa
              española vigente. Para la resolución de cualquier controversia, las partes se
              someten a los Juzgados y Tribunales del domicilio del usuario.
            </p>

            <h2>9. Contacto</h2>
            <p>
              Para cualquier consulta o sugerencia sobre este Aviso Legal, puede contactar
              con nosotros a través de:
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
