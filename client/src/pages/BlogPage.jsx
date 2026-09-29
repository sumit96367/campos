import { useState, useMemo, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import { BLOG_POSTS } from '../data/blogData'

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)

  // Handle direct link with ?post=slug or direct selection
  useEffect(() => {
    const slug = searchParams.get('post')
    if (slug) {
      const found = BLOG_POSTS.find((p) => p.slug === slug)
      if (found) {
        setSelectedPost(found)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      setSelectedPost(null)
    }
  }, [searchParams])

  const categories = useMemo(() => {
    return ['All', ...new Set(BLOG_POSTS.map((p) => p.category))]
  }, [])

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      const matchesQuery =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, searchQuery])

  const featuredPost = filteredPosts[0] || BLOG_POSTS[0]
  const remainingPosts = filteredPosts.slice(1)

  const openPost = (post) => {
    setSearchParams({ post: post.slug })
    setSelectedPost(post)
  }

  const closePost = () => {
    setSearchParams({})
    setSelectedPost(null)
  }

  return (
    <PageTransition>
      <Helmet>
        <title>
          {selectedPost
            ? `${selectedPost.title} | Blog | Campos Family Vineyards`
            : 'Blog & Stories | Campos Family Vineyards'}
        </title>
        <meta
          name="description"
          content={
            selectedPost
              ? selectedPost.excerpt.slice(0, 160)
              : 'Read stories, vineyard updates, harvest news, event highlights, and winemaking traditions from Campos Family Vineyards in Byron, California.'
          }
        />
      </Helmet>

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-charcoal text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/30 via-transparent to-transparent pointer-events-none" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="eyebrow text-gold block mb-3">
              Stories · News · Vineyard Life
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-hero text-cream mb-6">
              The Campos Journal
            </motion.h1>
            <motion.p variants={fadeUp} className="text-cream/70 font-sans text-base md:text-lg leading-relaxed mb-8">
              Reflections on harvest, celebrations at the estate, winemaking craft, and stories from our vibrant Byron community.
            </motion.p>

            {/* Search Box */}
            <motion.div variants={fadeUp} className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search articles, guides, recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-cream placeholder-cream/40 focus:outline-none focus:border-gold text-sm backdrop-blur-md transition-all"
              />
              <svg
                className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream text-xs uppercase"
                >
                  ✕
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Selected Full Article View */}
      {selectedPost ? (
        <section className="section-py bg-ivory min-h-screen">
          <div className="section-container max-w-4xl mx-auto">
            <button
              onClick={closePost}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-charcoal mb-8 transition-colors group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to all articles</span>
            </button>

            <article className="bg-cream rounded-2xl border border-charcoal/5 shadow-md overflow-hidden p-6 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-sans uppercase tracking-wider bg-gold/15 text-gold font-semibold">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-charcoal/50 font-sans">
                  Published {selectedPost.formattedDate}
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-8 leading-tight">
                {selectedPost.title}
              </h1>

              {selectedPost.image && (
                <div className="aspect-[16/9] mb-10 overflow-hidden rounded-xl bg-charcoal">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Body Content */}
              <div
                className="font-sans text-charcoal/80 text-base md:text-lg leading-relaxed space-y-5 prose prose-stone max-w-none [&>p]:mb-4 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:text-charcoal [&>h2]:mt-8 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>a]:text-gold [&>a]:underline"
                dangerouslySetInnerHTML={{ __html: selectedPost.contentHtml }}
              />

              <hr className="my-10 border-charcoal/10" />

              {/* Author & Footer of Post */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center font-serif text-lg text-gold font-bold">
                    CFV
                  </div>
                  <div>
                    <div className="font-serif text-charcoal text-sm">Campos Family Vineyards</div>
                    <div className="text-xs font-sans text-charcoal/50">Byron, California</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: selectedPost.title,
                          url: window.location.href,
                        })
                      } else {
                        navigator.clipboard.writeText(window.location.href)
                        alert('Article link copied to clipboard!')
                      }
                    }}
                    className="btn-secondary text-xs border-charcoal/20 text-charcoal py-2 px-4 inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>Share</span>
                  </button>

                  <button
                    onClick={closePost}
                    className="btn-primary text-xs py-2 px-4"
                  >
                    View All Posts
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      ) : (
        /* Blog Index View */
        <section className="section-py bg-ivory min-h-[60vh]">
          <div className="section-container">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-14">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full font-sans text-xs md:text-sm tracking-wide uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-charcoal text-gold shadow-md scale-105'
                      : 'bg-cream text-charcoal/70 hover:text-charcoal hover:bg-champagne'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-cream rounded-2xl border border-cream/20 max-w-lg mx-auto">
                <p className="font-serif text-2xl text-charcoal mb-2">No articles found</p>
                <p className="text-sm font-sans text-charcoal/60 mb-6">
                  No blog stories match your current filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('All')
                  }}
                  className="btn-primary text-xs"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Featured Hero Article (first matching) */}
                {featuredPost && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-14 bg-cream rounded-2xl border border-charcoal/5 shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => openPost(featuredPost)}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                      <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-charcoal relative">
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest text-gold">
                          Featured Story
                        </div>
                      </div>
                      <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-sans uppercase tracking-widest text-gold font-semibold">
                              {featuredPost.category}
                            </span>
                            <span className="text-xs text-charcoal/40 font-sans">
                              {featuredPost.formattedDate}
                            </span>
                          </div>
                          <h2 className="font-serif text-2xl lg:text-3xl text-charcoal mb-4 hover:text-gold transition-colors">
                            {featuredPost.title}
                          </h2>
                          <p className="text-sm font-sans text-charcoal/70 leading-relaxed mb-6 line-clamp-4">
                            {featuredPost.excerpt}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-gold font-semibold group">
                          <span>Read Full Story</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Remaining Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post, i) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => openPost(post)}
                      className="bg-cream rounded-xl border border-charcoal/5 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-gold/30 transition-all duration-300 cursor-pointer group"
                    >
                      <div>
                        <div className="aspect-[16/10] overflow-hidden bg-charcoal relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-sans uppercase tracking-widest text-gold">
                            {post.category}
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="text-xs text-charcoal/40 font-sans mb-2">
                            {post.formattedDate}
                          </div>
                          <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-gold transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs font-sans text-charcoal/65 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="pt-4 border-t border-charcoal/5 flex items-center justify-between text-xs font-sans uppercase tracking-wider text-gold group-hover:text-gold/80">
                          <span>Read Article</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Newsletter / Join Community CTA */}
      <section className="section-py bg-charcoal text-cream text-center">
        <div className="section-container max-w-2xl mx-auto">
          <span className="eyebrow text-gold block mb-3">Stay Connected</span>
          <h2 className="heading-section text-cream mb-4">Subscribe to Vineyard Dispatches</h2>
          <p className="text-cream/70 font-sans text-sm md:text-base leading-relaxed mb-8">
            Receive announcements on limited wine releases, harvest dinners, private concert tickets, and stories directly in your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thank you for subscribing to the Campos Family Vineyards newsletter!')
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-cream placeholder-cream/40 focus:outline-none focus:border-gold text-sm"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </PageTransition>
  )
}

export default BlogPage
