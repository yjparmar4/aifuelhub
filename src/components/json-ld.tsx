'use client'

import Script from 'next/script'

interface JsonLdProps {
  data: string | object
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonString = typeof data === 'string' ? data : JSON.stringify(data)

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}
