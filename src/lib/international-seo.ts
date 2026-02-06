/**
 * International SEO and Global Traffic Optimization
 * Implements hreflang tags, geographic targeting, and multilingual support
 */

import { SITE_URL } from '@/lib/seo'

export interface LocaleConfig {
  code: string
  name: string
  region?: string
  currency?: string
  isDefault?: boolean
}

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: 'en', name: 'English', region: 'US', currency: 'USD', isDefault: true },
  { code: 'en-GB', name: 'English (UK)', region: 'GB', currency: 'GBP' },
  { code: 'en-CA', name: 'English (Canada)', region: 'CA', currency: 'CAD' },
  { code: 'en-AU', name: 'English (Australia)', region: 'AU', currency: 'AUD' },
  { code: 'en-IN', name: 'English (India)', region: 'IN', currency: 'INR' },
  { code: 'en-NZ', name: 'English (New Zealand)', region: 'NZ', currency: 'NZD' },
  { code: 'en-ZA', name: 'English (South Africa)', region: 'ZA', currency: 'ZAR' },
  { code: 'es', name: 'Spanish', region: 'ES', currency: 'EUR' },
  { code: 'es-MX', name: 'Spanish (Mexico)', region: 'MX', currency: 'MXN' },
  { code: 'es-AR', name: 'Spanish (Argentina)', region: 'AR', currency: 'ARS' },
  { code: 'es-CO', name: 'Spanish (Colombia)', region: 'CO', currency: 'COP' },
  { code: 'fr', name: 'French', region: 'FR', currency: 'EUR' },
  { code: 'fr-CA', name: 'French (Canada)', region: 'CA', currency: 'CAD' },
  { code: 'fr-BE', name: 'French (Belgium)', region: 'BE', currency: 'EUR' },
  { code: 'de', name: 'German', region: 'DE', currency: 'EUR' },
  { code: 'de-AT', name: 'German (Austria)', region: 'AT', currency: 'EUR' },
  { code: 'de-CH', name: 'German (Switzerland)', region: 'CH', currency: 'CHF' },
  { code: 'it', name: 'Italian', region: 'IT', currency: 'EUR' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', region: 'BR', currency: 'BRL' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)', region: 'PT', currency: 'EUR' },
  { code: 'ja', name: 'Japanese', region: 'JP', currency: 'JPY' },
  { code: 'ko', name: 'Korean', region: 'KR', currency: 'KRW' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', region: 'CN', currency: 'CNY' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', region: 'TW', currency: 'TWD' },
  { code: 'zh-HK', name: 'Chinese (Hong Kong)', region: 'HK', currency: 'HKD' },
  { code: 'ar', name: 'Arabic', region: 'SA', currency: 'SAR' },
  { code: 'ar-AE', name: 'Arabic (UAE)', region: 'AE', currency: 'AED' },
  { code: 'ru', name: 'Russian', region: 'RU', currency: 'RUB' },
  { code: 'nl', name: 'Dutch', region: 'NL', currency: 'EUR' },
  { code: 'nl-BE', name: 'Dutch (Belgium)', region: 'BE', currency: 'EUR' },
  { code: 'sv', name: 'Swedish', region: 'SE', currency: 'SEK' },
  { code: 'da', name: 'Danish', region: 'DK', currency: 'DKK' },
  { code: 'no', name: 'Norwegian', region: 'NO', currency: 'NOK' },
  { code: 'fi', name: 'Finnish', region: 'FI', currency: 'EUR' },
  { code: 'pl', name: 'Polish', region: 'PL', currency: 'PLN' },
  { code: 'cs', name: 'Czech', region: 'CZ', currency: 'CZK' },
  { code: 'hu', name: 'Hungarian', region: 'HU', currency: 'HUF' },
  { code: 'tr', name: 'Turkish', region: 'TR', currency: 'TRY' },
  { code: 'th', name: 'Thai', region: 'TH', currency: 'THB' },
  { code: 'vi', name: 'Vietnamese', region: 'VN', currency: 'VND' },
  { code: 'id', name: 'Indonesian', region: 'ID', currency: 'IDR' },
  { code: 'ms', name: 'Malay', region: 'MY', currency: 'MYR' },
  { code: 'he', name: 'Hebrew', region: 'IL', currency: 'ILS' },
  { code: 'hi', name: 'Hindi', region: 'IN', currency: 'INR' },
]

/**
 * Generate hreflang tags for a page
 * @param path - Page path (e.g., '/tool/chatgpt')
 * @param alternateUrls - Map of locale codes to their URLs
 */
export function generateHreflangTags(
  path: string,
  alternateUrls?: Record<string, string>
): Array<{ rel: string; hrefLang: string; href: string }> {
  const tags: Array<{ rel: string; hrefLang: string; href: string }> = []

  // Add x-default for global fallback
  tags.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: `${SITE_URL}${path}`,
  })

  // Add all supported locales with proper URLs
  for (const locale of SUPPORTED_LOCALES) {
    const url = alternateUrls?.[locale.code] || `${SITE_URL}${path}?lang=${locale.code}`
    tags.push({
      rel: 'alternate',
      hrefLang: locale.code,
      href: url,
    })
  }

  return tags
}

/**
 * Generate geographic targeting schema
 */
export function generateGeoTargetingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'AI Fuel Hub',
    inLanguage: SUPPORTED_LOCALES.map(l => l.code),
    audience: {
      '@type': 'Audience',
      audienceType: 'Global',
      geographicArea: 'Worldwide',
    },
    availableInLanguage: SUPPORTED_LOCALES.map(locale => ({
      '@type': 'Language',
      name: locale.name,
      alternateName: locale.code,
    })),
  }
}

/**
 * Generate region-specific organization schema
 */
export function generateRegionalOrganizationSchema(region: string) {
  const regionConfig = SUPPORTED_LOCALES.find(l => l.region === region) || SUPPORTED_LOCALES[0]

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization-${region}`,
    name: 'AI Fuel Hub',
    url: SITE_URL,
    areaServed: {
      '@type': 'Country',
      name: region,
    },
    availableLanguage: {
      '@type': 'Language',
      name: regionConfig.name,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@aifuelhub.com',
      contactType: 'customer support',
      availableLanguage: regionConfig.code,
    },
  }
}

/**
 * Generate localized metadata
 */
export function generateLocalizedMetadata(
  path: string,
  title: string,
  description: string,
  locale: string = 'en'
) {
  const localeConfig = SUPPORTED_LOCALES.find(l => l.code === locale) || SUPPORTED_LOCALES[0]

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map(l => [l.code, `${SITE_URL}${path}`])
      ),
    },
    openGraph: {
      locale: localeConfig.code,
      localeAlternate: SUPPORTED_LOCALES.map(l => l.code),
    },
  }
}

/**
 * Generate language selector schema
 */
export function generateLanguageSelectorSchema(currentUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: currentUrl,
    name: 'AI Fuel Hub',
    inLanguage: SUPPORTED_LOCALES.map(locale => ({
      '@type': 'Language',
      name: locale.name,
      alternateName: locale.code,
    })),
  }
}

/**
 * Get currency for locale
 */
export function getCurrencyForLocale(locale: string): string {
  const localeConfig = SUPPORTED_LOCALES.find(l => l.code === locale)
  return localeConfig?.currency || 'USD'
}

/**
 * Get region for locale
 */
export function getRegionForLocale(locale: string): string {
  const localeConfig = SUPPORTED_LOCALES.find(l => l.code === locale)
  return localeConfig?.region || 'US'
}

/**
 * Format price for locale
 */
export function formatPriceForLocale(price: number, locale: string = 'en'): string {
  const localeConfig = SUPPORTED_LOCALES.find(l => l.code === locale) || SUPPORTED_LOCALES[0]
  const currency = localeConfig.currency || 'USD'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(price)
}

/**
 * Generate geographic targeting for specific regions
 */
export function generateRegionalTargeting(regions: string[]) {
  return regions.map(region => ({
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 0,
      longitude: 0,
    },
    geoRadius: region === 'Worldwide' ? '10000000' : '1000000',
    address: {
      '@type': 'PostalAddress',
      addressCountry: region,
    },
  }))
}

/**
 * Generate sitemap entries for all locales
 */
export function generateSitemapEntries(path: string): Array<{ url: string; lastModified: string }> {
  const entries: Array<{ url: string; lastModified: string }> = []
  const lastModified = new Date().toISOString()

  for (const locale of SUPPORTED_LOCALES) {
    entries.push({
      url: `${SITE_URL}${path}?lang=${locale.code}`,
      lastModified,
    })
  }

  return entries
}

/**
 * Generate structured data for multilingual content
 */
export function generateMultilingualSchema(contentUrl: string, availableLanguages: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: contentUrl,
    inLanguage: availableLanguages,
    hasPart: availableLanguages.map(lang => ({
      '@type': 'WebPageElement',
      isAccessibleForFree: true,
      inLanguage: lang,
    })),
  }
}
