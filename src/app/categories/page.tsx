import { db } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SITE_URL } from '@/lib/seo'

export const metadata = {
    title: 'AI Tool Categories | AI Fuel Hub',
    description: 'Browse our comprehensive directory of AI tools organized by category. Find the perfect AI solution for writing, coding, design, and more.',
    alternates: {
        canonical: `${SITE_URL}/categories`,
    },
}

export default async function CategoriesPage() {
    const categories = await db.category.findMany({
        where: { published: true },
        include: {
            _count: {
                select: { tools: true }
            }
        },
        orderBy: { name: 'asc' }
    })

    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Browse AI Categories
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore our curated collection of AI tools across different domains.
                        From content creation to coding, find the right tools for your workflow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/categories/${category.slug}`}>
                            <Card className="h-full hover:border-primary/50 hover:bg-white/5 transition-all group cursor-pointer border-white/10">
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                            {category.icon || '⚡'}
                                        </span>
                                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                            {category._count.tools} Tools
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                        {category.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {category.description || `Discover the best ${category.name} tools powered by AI.`}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
