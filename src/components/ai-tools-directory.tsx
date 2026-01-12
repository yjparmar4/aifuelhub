'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ToolCard } from '@/components/tool-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, SlidersHorizontal, Loader2, Star, Check, X, Filter, Zap, LayoutGrid, ListFilter } from 'lucide-react'
import { SidebarAd } from '@/components/ad-placeholder'
import { Tool, Category } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function AIToolsContent({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const router = useRouter()
  const pathname = usePathname()
  const currentSearchParams = useSearchParams()

  const [tools, setTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  // Filter States
  const [searchTerm, setSearchTerm] = useState(typeof searchParams.search === 'string' ? searchParams.search : '')
  const [selectedCategory, setSelectedCategory] = useState<string>(typeof searchParams.category === 'string' ? searchParams.category : '')
  const [selectedPricing, setSelectedPricing] = useState<string[]>(
    typeof searchParams.pricingType === 'string'
      ? searchParams.pricingType.split(',')
      : typeof searchParams.pricing === 'string'
        ? searchParams.pricing.split(',')
        : []
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(
    typeof searchParams.tags === 'string' ? searchParams.tags.split(',').filter(Boolean) : []
  )
  const [selectedRating, setSelectedRating] = useState<number | null>(
    typeof searchParams.rating === 'string' ? parseInt(searchParams.rating) : null
  )
  const [sortOption, setSortOption] = useState('popular')

  // Effect to sync page from URL
  useEffect(() => {
    const urlPage = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
    if (Number.isFinite(urlPage) && urlPage > 0 && urlPage !== page) {
      setPage(urlPage)
    }
  }, [searchParams.page])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentSearch = typeof searchParams.search === 'string' ? searchParams.search : ''
      if (searchTerm !== currentSearch) {
        updateUrl({ search: searchTerm || null, page: 1 })
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Sync state from URL
  useEffect(() => {
    const urlPricing = typeof searchParams.pricingType === 'string' ? searchParams.pricingType : typeof searchParams.pricing === 'string' ? searchParams.pricing : ''
    const nextPricing = urlPricing ? urlPricing.split(',').filter(Boolean) : []
    if (selectedPricing.join(',') !== nextPricing.join(',')) {
      setSelectedPricing(nextPricing)
    }
  }, [searchParams.pricingType, searchParams.pricing])

  useEffect(() => {
    const urlTags = typeof searchParams.tags === 'string' ? searchParams.tags : ''
    const nextTags = urlTags ? urlTags.split(',').filter(Boolean) : []
    if (selectedTags.join(',') !== nextTags.join(',')) {
      setSelectedTags(nextTags)
    }
  }, [searchParams.tags])

  // Fetch Metadata (Categories)
  useEffect(() => {
    async function fetchMeta() {
      try {
        const categoriesRes = await fetch('/api/categories')
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData.categories || [])
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchMeta()
  }, [])

  // Fetch Tools
  useEffect(() => {
    async function fetchTools() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('page', page.toString())
        params.set('limit', '12') // Keeps grid consistent
        if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory)
        if (selectedPricing.length > 0) params.set('pricingType', selectedPricing.join(','))
        if (selectedRating) params.set('rating', selectedRating.toString())
        if (selectedTags.length > 0) params.set('tags', selectedTags.join(','))
        if (searchTerm) params.set('search', searchTerm)
        if (sortOption) params.set('sort', sortOption)

        const toolsRes = await fetch(`/api/tools?${params.toString()}`)
        const toolsData = await toolsRes.json()

        setTools(toolsData.tools || [])
        setTotalPages(toolsData.pagination?.totalPages || 1)
        setTotal(toolsData.pagination?.total || 0)
      } catch (error) {
        console.error('Error fetching tools:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [page, selectedCategory, selectedPricing, selectedTags, selectedRating, sortOption, searchTerm])

  const updateUrl = (updates: any) => {
    const params = new URLSearchParams(currentSearchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleCategoryChange = (slug: string) => {
    const newCategory = slug === selectedCategory ? '' : slug
    setSelectedCategory(newCategory)
    setPage(1)
    updateUrl({ category: newCategory || null, page: 1 })
  }

  const handlePricingChange = (type: string) => {
    const newPricing = selectedPricing.includes(type)
      ? selectedPricing.filter(t => t !== type)
      : [...selectedPricing, type]
    setSelectedPricing(newPricing)
    setPage(1)
    updateUrl({ pricingType: newPricing.length > 0 ? newPricing.join(',') : null, page: 1 })
  }

  const handleRatingChange = (rating: number) => {
    const newRating = rating === selectedRating ? null : rating
    setSelectedRating(newRating)
    setPage(1)
    updateUrl({ rating: newRating, page: 1 })
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedPricing([])
    setSelectedTags([])
    setSelectedRating(null)
    setSearchTerm('')
    setPage(1)
    router.push(pathname)
  }

  const hasActiveFilters = selectedCategory || selectedPricing.length > 0 || selectedTags.length > 0 || selectedRating || searchTerm

  // --- SUB-COMPONENTS ---

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2 text-slate-500">
          Categories
        </h3>
        <ScrollArea className="h-[400px] -ml-2 pl-2">
          <div className="space-y-1">
            <button
              onClick={() => handleCategoryChange('')}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 font-medium",
                selectedCategory === ''
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 font-medium",
                  selectedCategory === cat.slug
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <span className="text-lg opacity-80">{cat.icon || '📦'}</span>
                <span className="truncate flex-1">{cat.name}</span>
                {selectedCategory === cat.slug && <Check className="w-4 h-4 text-white shrink-0" />}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="h-px bg-slate-200 w-full" />

      {/* Pricing */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2 text-slate-500">
          Pricing
        </h3>
        <div className="space-y-2">
          {['Free', 'Freemium', 'Paid', 'Free Trial'].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group py-1">
              <Checkbox
                checked={selectedPricing.includes(type)}
                onCheckedChange={() => handlePricingChange(type)}
                className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 rounded w-4 h-4"
              />
              <span className={`text-sm group-hover:text-slate-900 transition-colors ${selectedPricing.includes(type) ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-200 w-full" />

      {/* Rating */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2 text-slate-500">
          Rating
        </h3>
        <div className="space-y-2">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() => handleRatingChange(stars)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors border",
                selectedRating === stars
                  ? 'border-amber-400 bg-amber-50 text-amber-900 font-medium'
                  : 'border-transparent text-slate-600 hover:bg-slate-50'
              )}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < stars ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                ))}
              </div>
              <span className="text-xs">& Up</span>
              {selectedRating === stars && <Check className="w-4 h-4 text-amber-600 ml-auto" />}
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar Ad Area */}
      <div className="pt-4">
        <SidebarAd />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* 1. Minimal Hero Section */}
      <header className="border-b border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 bg-white border-slate-200 text-slate-600 font-medium px-4 py-1.5 shadow-sm">
            Directory
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Find the Best AI Tools
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse our curated collection of <span className="text-slate-900 font-semibold">{total > 0 ? total.toLocaleString() : '100+'}</span> tools. Compare features, pricing, and user reviews to make smarter decisions.
          </p>

          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-slate-500 transition-colors" />
            <input
              type="text"
              placeholder="Search tools, categories, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full py-4 pl-12 pr-12 shadow-sm hover:shadow-md focus:shadow-md focus:border-indigo-500 focus:outline-none transition-all text-base placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Content Layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-slate-900 text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-red-500 hover:underline font-medium">Reset</button>
                )}
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-h-[500px]">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 border-slate-200">
                      <SlidersHorizontal className="w-4 h-4" /> Filters
                      {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                    <SheetHeader className="mb-6 text-left">
                      <SheetTitle className="flex items-center gap-2">Filters</SheetTitle>
                    </SheetHeader>
                    <FilterSidebar />
                  </SheetContent>
                </Sheet>
              </div>

              <div className="text-slate-600 font-medium">
                Showing <span className="text-slate-900 font-bold">{tools.length}</span> results
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 hidden sm:inline">Sort by:</span>
                <Select value={sortOption} onValueChange={(val) => { setSortOption(val); updateUrl({ sort: val }); }}>
                  <SelectTrigger className="w-[180px] border-slate-200 bg-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest Added</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters List */}
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-wrap gap-2 mb-8 overflow-hidden"
                >
                  {searchTerm && (
                    <Badge variant="secondary" className="px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100 gap-1.5 transition-colors">
                      "{searchTerm}"
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                    </Badge>
                  )}
                  {selectedCategory && (
                    <Badge variant="secondary" className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 gap-1.5 transition-colors">
                      {categories.find(c => c.slug === selectedCategory)?.name}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategoryChange(selectedCategory)} />
                    </Badge>
                  )}
                  {selectedPricing.map(price => (
                    <Badge key={price} variant="secondary" className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 gap-1.5 transition-colors">
                      {price}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => handlePricingChange(price)} />
                    </Badge>
                  ))}
                  <button onClick={clearFilters} className="text-sm text-slate-500 hover:text-slate-900 px-2 py-1 underline">
                    Clear all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tools List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-[320px] bg-slate-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : tools.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-16 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No tools found</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                  We couldn't find any tools matching your criteria. Try adjusting your filters or search term.
                </p>
                <Button onClick={clearFilters} variant="outline" className="border-slate-300">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      layout
                    >
                      <ToolCard tool={tool} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => page > 1 && setPage(p => p - 1)}
                        className={cn("cursor-pointer", page === 1 && "pointer-events-none opacity-50")}
                      />
                    </PaginationItem>

                    {/* Simplified Pagination for Cleaner Look - Mobile optimized */}
                    <div className="flex items-center gap-1 mx-2">
                      <span className="text-sm font-medium text-slate-600">Page {page} of {totalPages}</span>
                    </div>

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => page < totalPages && setPage(p => p + 1)}
                        className={cn("cursor-pointer", page === totalPages && "pointer-events-none opacity-50")}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  )
}

export default function AIToolsDirectory({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    }>
      <AIToolsContent searchParams={searchParams} />
    </Suspense>
  )
}
