'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface SEOImageProps extends Omit<ImageProps, 'alt'> {
    alt: string // Make alt required
    caption?: string
    priority?: boolean
    className?: string
    containerClassName?: string
    showCaption?: boolean
}

/**
 * SEO-Optimized Image Component
 * 
 * Features:
 * - Required alt text for accessibility
 * - Automatic lazy loading (unless priority set)
 * - Blur placeholder for better CLS
 * - Caption support for context
 * - Proper loading states
 */
export function SEOImage({
    alt,
    caption,
    priority = false,
    className = '',
    containerClassName = '',
    showCaption = true,
    src,
    width,
    height,
    ...props
}: SEOImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)

    // Generate a descriptive alt if none provided
    const effectiveAlt = alt || 'AI tool illustration - AI Fuel Hub'

    // Fallback for error state
    if (hasError) {
        return (
            <div
                className={`bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${containerClassName}`}
                style={{ width: width || '100%', height: height || 200 }}
                role="img"
                aria-label={effectiveAlt}
            >
                <span className="text-gray-400 text-sm">Image unavailable</span>
            </div>
        )
    }

    return (
        <figure className={`relative ${containerClassName}`}>
            <Image
                src={src}
                alt={effectiveAlt}
                width={width}
                height={height}
                priority={priority}
                loading={priority ? undefined : 'lazy'}
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                quality={85}
                {...props}
            />

            {/* Loading placeholder */}
            {!isLoaded && !hasError && (
                <div
                    className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse"
                    style={{ width: width || '100%', height: height || 200 }}
                />
            )}

            {/* Caption */}
            {caption && showCaption && (
                <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}

// Helper to generate SEO-friendly alt text
export function generateAltText(
    toolName?: string,
    context?: string,
    type: 'screenshot' | 'logo' | 'illustration' | 'diagram' | 'photo' = 'illustration'
): string {
    const parts: string[] = []

    if (toolName) {
        parts.push(toolName)
    }

    switch (type) {
        case 'screenshot':
            parts.push('interface screenshot')
            break
        case 'logo':
            parts.push('logo')
            break
        case 'diagram':
            parts.push('workflow diagram')
            break
        case 'photo':
            parts.push('photo')
            break
        default:
            parts.push('illustration')
    }

    if (context) {
        parts.push(`- ${context}`)
    }

    parts.push('| AI Fuel Hub')

    return parts.join(' ')
}

export default SEOImage
