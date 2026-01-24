'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Cómo elegir el mejor seguro de hogar para tu vivienda',
    excerpt: 'Descubre los factores clave que debes considerar al contratar un seguro de hogar y evita sorpresas desagradables.',
    category: 'Hogar',
    date: '2024-01-15',
    readTime: '5 min',
    image: '/blog/hogar.jpg',
    slug: 'elegir-mejor-seguro-hogar',
  },
  {
    id: 2,
    title: '10 consejos para ahorrar en tu seguro de coche',
    excerpt: 'Aprende estrategias efectivas para reducir la prima de tu seguro de auto sin sacrificar coberturas importantes.',
    category: 'Auto',
    date: '2024-01-10',
    readTime: '7 min',
    image: '/blog/coche.jpg',
    slug: 'consejos-ahorrar-seguro-coche',
  },
  {
    id: 3,
    title: '¿Por qué es importante tener un seguro de vida?',
    excerpt: 'El seguro de vida es una herramienta esencial para proteger el futuro financiero de tu familia. Te explicamos por qué.',
    category: 'Vida',
    date: '2024-01-05',
    readTime: '6 min',
    image: '/blog/vida.jpg',
    slug: 'importancia-seguro-vida',
  },
]

export function BlogPreview() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6"
            >
              <BookOpen className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Blog</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-display-md md:text-display-lg font-display font-bold text-soriano-dark"
            >
              Consejos y{' '}
              <span className="gradient-text">actualidad</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/blog">
              <button className="btn-ghost group">
                Ver todos los artículos
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* Image placeholder */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4">
                      <span className="badge-primary">{post.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-soriano-gray mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-soriano-dark mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-soriano-gray text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
                      Leer más
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
