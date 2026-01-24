'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen, Search } from 'lucide-react'
import { BLOG_POSTS, BLOG_CATEGORIES, getFeaturedPosts } from '@/lib/blog-data'

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [visiblePosts, setVisiblePosts] = useState(12)

  const featuredPosts = getFeaturedPosts()

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'todos' || post.category.toLowerCase() === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const regularPosts = filteredPosts.filter(post => !post.featured)
  const displayedPosts = regularPosts.slice(0, visiblePosts)

  const getCategoryCount = (categorySlug: string) => {
    if (categorySlug === 'todos') return BLOG_POSTS.length
    return BLOG_POSTS.filter(post => post.category.toLowerCase() === categorySlug).length
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F5] to-white dark:from-[#0D0D0D] dark:via-[#111111] dark:to-[#0D0D0D]" />

        <div className="container-premium relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#E30613]/10 rounded-full mb-6"
            >
              <BookOpen className="w-4 h-4 text-[#E30613]" />
              <span className="text-sm font-semibold text-[#E30613]">Blog</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight"
            >
              Consejos y{' '}
              <span className="bg-gradient-to-r from-[#E30613] to-[#CC050F] bg-clip-text text-transparent">
                actualidad
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-8"
            >
              50 articulos sobre seguros, economia, salud, tecnologia y mas.
              Todo lo que necesitas saber para tomar mejores decisiones.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar articulos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#E30613]/50 text-neutral-800 dark:text-white"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D]">
        <div className="container-premium">
          <div className="flex flex-wrap gap-2 justify-center">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => setActiveCategory(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.slug
                    ? 'bg-[#E30613] text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {category.name} ({getCategoryCount(category.slug)})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured posts */}
      {activeCategory === 'todos' && searchTerm === '' && (
        <section className="py-16 bg-white dark:bg-[#0D0D0D]">
          <div className="container-premium">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-8">
              Articulos destacados
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {featuredPosts.slice(0, 6).map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-neutral-50 dark:bg-neutral-900 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-[16/9] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#E30613]/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-[#E30613] text-white text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                        Destacado
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-3 group-hover:text-[#E30613] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-1 text-sm font-medium text-[#E30613] group-hover:gap-2 transition-all">
                        Leer articulo
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All posts */}
      <section className="py-16 bg-[#F5F5F5] dark:bg-[#111111]">
        <div className="container-premium">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-8">
            {activeCategory === 'todos' ? 'Todos los articulos' : `Articulos de ${BLOG_CATEGORIES.find(c => c.slug === activeCategory)?.name}`}
            <span className="text-neutral-500 font-normal ml-2">({filteredPosts.length})</span>
          </h2>

          {displayedPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                No se encontraron articulos con los filtros seleccionados.
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPosts.map((post, index) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 6) * 0.05 }}
                      className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden hover:shadow-lg border border-neutral-100 dark:border-neutral-800 transition-all duration-300"
                    >
                      <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E30613]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute top-3 left-3 px-3 py-1 bg-[#E30613] text-white text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="font-bold text-neutral-800 dark:text-white mb-2 group-hover:text-[#E30613] transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-neutral-500">{post.author}</span>
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#E30613] group-hover:gap-2 transition-all">
                            Leer
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>

              {/* Load more */}
              {visiblePosts < regularPosts.length && (
                <div className="text-center mt-12">
                  <button
                    type="button"
                    onClick={() => setVisiblePosts(prev => prev + 12)}
                    className="px-8 py-3.5 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Cargar mas articulos ({regularPosts.length - visiblePosts} restantes)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white dark:bg-[#0D0D0D]">
        <div className="container-premium">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-4">
              Suscribete a nuestra newsletter
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Recibe consejos y novedades sobre seguros directamente en tu email.
              Sin spam, solo contenido util.
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

            <p className="text-sm text-neutral-500 mt-4">
              Al suscribirte aceptas nuestra{' '}
              <Link href="/legal/privacidad" className="text-[#E30613] hover:underline">
                Politica de Privacidad
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
