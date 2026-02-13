import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Book, Globe, Search, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'AI Fuel Hub API Documentation',
    description: 'Documentation for AI Fuel Hub public API. Build AI applications with our comprehensive directory data.',
};

export default function ApiDocsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-4xl font-bold mb-4">AI Fuel Hub API</h1>
                <p className="text-xl text-muted-foreground">
                    Public API for accessing our AI tool directory. Optimized for AI agents and developers.
                </p>
            </div>

            <div className="grid gap-8">
                {/* Quick Links */}
                <div className="flex flex-wrap gap-4">
                    <Button asChild variant="outline">
                        <Link href="/openapi.yaml" target="_blank">
                            <Book className="w-4 h-4 mr-2" />
                            OpenAPI Spec
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/.well-known/ai-plugin.json" target="_blank">
                            <Globe className="w-4 h-4 mr-2" />
                            AI Plugin Manifest
                        </Link>
                    </Button>
                </div>

                {/* Endpoints */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Endpoints</h2>

                    {/* Search Endpoint */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-mono">GET</span>
                                <span className="font-mono text-lg">/api/search</span>
                            </CardTitle>
                            <CardDescription>Search for tools, blog posts, and categories.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Parameters</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li><code className="bg-muted px-1 rounded">q</code> (required): Search query</li>
                                    <li><code className="bg-muted px-1 rounded">type</code> (optional): 'all', 'tools', 'blog', 'categories'</li>
                                    <li><code className="bg-muted px-1 rounded">limit</code> (optional): Number of results</li>
                                </ul>
                            </div>
                            <div className="bg-muted p-4 rounded-md">
                                <code className="text-sm">
                                    curl https://aifuelhub.com/api/search?q=chatgpt&limit=5
                                </code>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tools List Endpoint */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-mono">GET</span>
                                <span className="font-mono text-lg">/api/tools</span>
                            </CardTitle>
                            <CardDescription>List and filter AI tools.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Parameters</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li><code className="bg-muted px-1 rounded">category</code> (optional): Filter by category slug</li>
                                    <li><code className="bg-muted px-1 rounded">pricingType</code> (optional): Filter by pricing</li>
                                    <li><code className="bg-muted px-1 rounded">sort</code> (optional): 'popular', 'newest', 'rating'</li>
                                </ul>
                            </div>
                            <div className="bg-muted p-4 rounded-md">
                                <code className="text-sm">
                                    curl https://aifuelhub.com/api/tools?sort=newest&limit=10
                                </code>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tool Details Endpoint */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-mono">GET</span>
                                <span className="font-mono text-lg">/api/tools/:slug</span>
                            </CardTitle>
                            <CardDescription>Get detailed information about a specific tool.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Parameters</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li><code className="bg-muted px-1 rounded">slug</code> (required): The tool's unique slug</li>
                                </ul>
                            </div>
                            <div className="bg-muted p-4 rounded-md">
                                <code className="text-sm">
                                    curl https://aifuelhub.com/api/tools/chatgpt
                                </code>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
