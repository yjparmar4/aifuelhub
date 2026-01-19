import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Search } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Page Not Found | AI Fuel Hub',
    description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="space-y-6 max-w-md">
                <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-t from-muted to-muted-foreground/50 opacity-50">
                    404
                </h1>

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Page not found
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link href="/">
                        <Button size="lg" className="w-full sm:w-auto gap-2">
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/ai-tools">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                            <Search className="w-4 h-4" />
                            Browse Tools
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
