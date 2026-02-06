import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  containerClassName?: string
  caption?: string
  credit?: string
  itemProp?: string
  sizes?: string
  loading?: 'eager' | 'lazy'
}

/**
 * SEO-Optimized Image Component
 * Includes structured data markup and performance optimizations
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  className,
  containerClassName,
  caption,
  credit,
  itemProp,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy',
}: OptimizedImageProps) {
  const imageUrl = src.startsWith('http') ? src : `${process.env.NEXT_PUBLIC_SITE_URL || ''}${src}`

  return (
    <figure
      className={cn('optimized-image-figure', containerClassName)}
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <meta itemProp="contentUrl" content={imageUrl} />
      <meta itemProp="url" content={imageUrl} />
      <meta itemProp="name" content={alt} />
      {credit && <meta itemProp="author" content={credit} />}
      
      <div className="relative overflow-hidden">
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading={priority ? 'eager' : loading}
            sizes={sizes}
            className={cn('object-cover', className)}
            itemProp={itemProp || 'image'}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 600}
            priority={priority}
            loading={priority ? 'eager' : loading}
            className={cn('max-w-full h-auto', className)}
            itemProp={itemProp || 'image'}
          />
        )}
      </div>
      
      {(caption || credit) && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          {caption && <span itemProp="description">{caption}</span>}
          {caption && credit && ' — '}
          {credit && (
            <span className="text-xs" itemProp="author">
              Credit: {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}

interface HeroImageProps {
  src: string
  alt: string
  title: string
  description?: string
  className?: string
}

/**
 * Hero Image with full structured data markup
 * Optimized for featured snippets and rich results
 */
export function HeroImage({ src, alt, title, description, className }: HeroImageProps) {
  return (
    <div
      className={cn('hero-image-container relative', className)}
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <meta itemProp="name" content={title} />
      {description && <meta itemProp="description" content={description} />}
      <meta itemProp="contentUrl" content={src} />
      
      <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          loading="eager"
          className="object-cover"
          sizes="100vw"
          itemProp="image"
        />
        <meta itemProp="width" content="1200" />
        <meta itemProp="height" content="630" />
      </div>
    </div>
  )
}

interface GalleryImageProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
    width?: number
    height?: number
  }>
  className?: string
}

/**
 * Image Gallery with structured data
 * Implements ImageGallery schema markup
 */
export function ImageGallery({ images, className }: GalleryImageProps) {
  if (!images || images.length === 0) return null

  return (
    <div
      className={cn('image-gallery grid grid-cols-2 md:grid-cols-3 gap-4', className)}
      itemScope
      itemType="https://schema.org/ImageGallery"
    >
      {images.map((image, index) => (
        <figure
          key={index}
          className="gallery-item"
          itemProp="associatedMedia"
          itemScope
          itemType="https://schema.org/ImageObject"
        >
          <meta itemProp="contentUrl" content={image.src} />
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 33vw"
              itemProp="image"
            />
          </div>
          {image.caption && (
            <figcaption className="mt-2 text-sm text-muted-foreground" itemProp="caption">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

interface VideoThumbnailProps {
  thumbnailUrl: string
  videoUrl: string
  title: string
  duration?: string // ISO 8601 duration format, e.g., "PT5M30S"
  uploadDate?: string
  width?: number
  height?: number
  className?: string
}

/**
 * Video Thumbnail with VideoObject schema
 * Optimized for video search and rich snippets
 */
export function VideoThumbnail({
  thumbnailUrl,
  videoUrl,
  title,
  duration,
  uploadDate,
  width = 1280,
  height = 720,
  className,
}: VideoThumbnailProps) {
  return (
    <div
      className={cn('video-thumbnail relative group cursor-pointer', className)}
      itemScope
      itemType="https://schema.org/VideoObject"
    >
      <meta itemProp="name" content={title} />
      <meta itemProp="thumbnailUrl" content={thumbnailUrl} />
      <meta itemProp="contentUrl" content={videoUrl} />
      {duration && <meta itemProp="duration" content={duration} />}
      {uploadDate && <meta itemProp="uploadDate" content={uploadDate} />}
      <meta itemProp="width" content={String(width)} />
      <meta itemProp="height" content={String(height)} />

      <div className="relative aspect-video overflow-hidden rounded-xl">
        <Image
          src={thumbnailUrl}
          alt={`Watch ${title}`}
          fill
          loading="lazy"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 800px"
          itemProp="thumbnail"
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg
              className="w-8 h-8 text-primary ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
            {formatDuration(duration)}
          </div>
        )}
      </div>

      <h3 className="mt-2 font-medium text-sm line-clamp-2" itemProp="name">
        {title}
      </h3>
    </div>
  )
}

/**
 * Format ISO 8601 duration to human-readable format
 */
function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return ''

  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

interface ScreenshotComparisonProps {
  beforeImage: {
    src: string
    alt: string
    label?: string
  }
  afterImage: {
    src: string
    alt: string
    label?: string
  }
  className?: string
}

/**
 * Before/After Screenshot Comparison
 * Useful for tool comparisons and tutorials
 */
export function ScreenshotComparison({
  beforeImage,
  afterImage,
  className,
}: ScreenshotComparisonProps) {
  return (
    <div className={cn('screenshot-comparison grid md:grid-cols-2 gap-4', className)}>
      <figure
        className="before-image"
        itemScope
        itemType="https://schema.org/ImageObject"
      >
        <meta itemProp="name" content={beforeImage.label || 'Before'} />
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={beforeImage.src}
            alt={beforeImage.alt}
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            itemProp="image"
          />
          <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
            {beforeImage.label || 'Before'}
          </div>
        </div>
      </figure>

      <figure
        className="after-image"
        itemScope
        itemType="https://schema.org/ImageObject"
      >
        <meta itemProp="name" content={afterImage.label || 'After'} />
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={afterImage.src}
            alt={afterImage.alt}
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            itemProp="image"
          />
          <div className="absolute top-2 left-2 px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded">
            {afterImage.label || 'After'}
          </div>
        </div>
      </figure>
    </div>
  )
}
