import React from 'react'

interface JsonLdProps {
  data: string | object
  id?: string
}

export function JsonLd({ data, id }: JsonLdProps) {
  const jsonString = typeof data === 'string' ? data : JSON.stringify(data)

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}
