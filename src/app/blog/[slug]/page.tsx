'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Calendar, Clock, ArrowLeft, ArrowRight, Share2,
  Facebook, Twitter, Linkedin, BookOpen, User, Tag
} from 'lucide-react'
import { getBlogPostBySlug, getRelatedPosts, BLOG_CATEGORIES } from '@/lib/blog-data'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug, 3)
  const categoryInfo = BLOG_CATEGORIES.find(c => c.name === post.category)

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F5] to-white dark:from-[#0D0D0D] dark:via-[#111111] dark:to-[#0D0D0D]" />

        <div className="container-premium relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#E30613] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al blog</span>
              </Link>
            </motion.div>

            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#E30613]/10 text-[#E30613] rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-neutral-500 dark:text-neutral-400 mb-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E30613] flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-neutral-800 dark:text-white">{post.author}</div>
                  <div className="text-sm">{post.authorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} de lectura
                </span>
              </div>
            </motion.div>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed"
            >
              {post.excerpt}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Cover Image Placeholder */}
      <section className="pb-12">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="aspect-[16/9] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E30613]/10 to-amber-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-neutral-300 dark:text-neutral-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_280px] gap-12">
              {/* Main content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-neutral-600 dark:prose-p:text-neutral-400 prose-p:leading-relaxed
                  prose-a:text-[#E30613] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-neutral-800 dark:prose-strong:text-white
                  prose-ul:my-6 prose-li:text-neutral-600 dark:prose-li:text-neutral-400
                  prose-blockquote:border-[#E30613] prose-blockquote:bg-neutral-50 dark:prose-blockquote:bg-neutral-900 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-6
                "
              >
                {/* Simulated content based on excerpt */}
                <p className="text-xl font-medium text-neutral-800 dark:text-white !mt-0">
                  {post.excerpt}
                </p>

                <h2>Introduccion</h2>
                <p>
                  En Soriano Mediadores, llevamos mas de 25 años asesorando a familias y empresas de Villajoyosa
                  y la Marina Baixa. Nuestra experiencia nos permite ofrecerte la informacion mas relevante y
                  actualizada sobre este tema.
                </p>

                <p>
                  A lo largo de este articulo, exploraremos los aspectos mas importantes que debes conocer
                  para tomar decisiones informadas. Te proporcionaremos consejos practicos basados en nuestra
                  experiencia y en las mejores practicas del sector.
                </p>

                <h2>Aspectos clave a considerar</h2>
                <p>
                  Cuando hablamos de {post.category.toLowerCase()}, es fundamental entender que cada situacion
                  es unica y requiere un analisis personalizado. Sin embargo, hay principios generales que
                  aplican en la mayoria de los casos.
                </p>

                <ul>
                  <li>Analiza tu situacion personal antes de tomar decisiones</li>
                  <li>Compara diferentes opciones disponibles en el mercado</li>
                  <li>Consulta con un profesional cualificado</li>
                  <li>Lee siempre la letra pequeña de los contratos</li>
                  <li>Mantente informado sobre cambios legislativos</li>
                </ul>

                <blockquote>
                  <p>
                    "La mejor inversion es aquella que te proporciona tranquilidad. No escatimes en proteger
                    lo que mas te importa."
                  </p>
                </blockquote>

                <h2>Nuestra recomendacion</h2>
                <p>
                  Como mediadores de seguros autorizados por la DGSFP, trabajamos exclusivamente con Occident,
                  lo que nos permite ofrecerte las mejores condiciones y un servicio 100% personalizado.
                  No dudes en contactarnos para resolver cualquier duda.
                </p>

                <p>
                  Nuestro equipo esta a tu disposicion para asesorarte sin compromiso. Puedes llamarnos al
                  966 810 290 o visitarnos en nuestra oficina de Villajoyosa.
                </p>

                <h2>Conclusion</h2>
                <p>
                  Esperamos que este articulo te haya resultado util. Recuerda que en Soriano Mediadores
                  estamos para ayudarte a proteger lo que mas te importa, con la confianza de mas de 25 años
                  de experiencia y el respaldo de Occident.
                </p>
              </motion.article>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Share */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6"
                >
                  <h3 className="font-bold text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Compartir
                  </h3>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6"
                >
                  <h3 className="font-bold text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Etiquetas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full text-sm border border-neutral-200 dark:border-neutral-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6"
                >
                  <h3 className="font-bold text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Autor
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#E30613] flex items-center justify-center text-white font-bold text-lg">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-neutral-800 dark:text-white">{post.author}</div>
                      <div className="text-sm text-neutral-500">{post.authorRole}</div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-gradient-to-br from-[#E30613] to-[#CC050F] rounded-2xl p-6 text-white"
                >
                  <h3 className="font-bold text-lg mb-2">¿Necesitas asesoramiento?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Nuestro equipo esta listo para ayudarte con tus dudas sobre seguros.
                  </p>
                  <Link href="/contacto">
                    <button className="w-full px-4 py-3 bg-white text-[#E30613] font-semibold rounded-xl hover:bg-neutral-100 transition-colors">
                      Contactar ahora
                    </button>
                  </Link>
                </motion.div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#F5F5F5] dark:bg-[#111111]">
          <div className="container-premium">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-10 text-center">
              Articulos relacionados
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#E30613]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#E30613] text-white text-xs font-medium rounded-full">
                        {relatedPost.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
                        <span>{new Date(relatedPost.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                      <h3 className="font-bold text-neutral-800 dark:text-white group-hover:text-[#E30613] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-white dark:bg-[#0D0D0D]">
        <div className="container-premium">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Suscribete a nuestra newsletter
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Recibe consejos y novedades sobre seguros directamente en tu email.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-5 py-3.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#E30613]/50 text-neutral-800 dark:text-white"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#E30613] text-white font-semibold rounded-xl hover:bg-[#CC050F] transition-colors"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
