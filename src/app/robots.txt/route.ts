import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export async function GET(): Promise<MetadataRoute.Robots> {
  const baseUrl = SITE_URL

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/submit-tool'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
