/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    // Performance optimizations
    reactStrictMode: true,
    // Compression
    compress: true,

    experimental: {
        // ppr: true, (Disabled for now to fix build issues)
    },

    typescript: {
        ignoreBuildErrors: true,
    },

    // Image optimization
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },

    // Headers for performance and SEO
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    // DNS Prefetch
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    // Security Headers
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    },
                    // HSTS for security
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload'
                    },
                    // CSP - Enhanced for AI and global resources
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://platform.twitter.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com; frame-src https://platform.twitter.com https://www.facebook.com https://www.youtube.com; object-src 'none';"
                    },
                    // AI Search Engine Directives
                    {
                        key: 'X-Robots-Tag',
                        value: 'index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1'
                    },
                    // Cross-Origin policies
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin-allow-popups'
                    }
                ]
            },
            // Cache-Control headers for static assets (images, fonts, etc.)
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            },
            {
                source: '/_next/image/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            },
            {
                source: '/fonts/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            },
            // Cache for other static file types
            {
                source: '/:path*.(jpg|jpeg|png|gif|webp|avif|svg|ico)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            }
        ]
    },

    // Redirects
    async redirects() {
        return [
            // WWW to non-WWW redirect (301 permanent)
            // This ensures canonical URL consistency for SEO
            // WWW to non-WWW redirect removed to prevent conflicts with Vercel settings
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
            {
                source: '/submit',
                destination: '/submit-tool',
                permanent: true,
            },
            {
                source: '/privacy',
                destination: '/privacy-policy',
                permanent: true,
            },
            {
                source: '/terms',
                destination: '/terms-and-conditions',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
