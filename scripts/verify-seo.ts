
import { generateWorldClassMetadata } from '../src/lib/world-class-seo'

console.log('Verifying World Class SEO Metadata Generation...')

const mockTool = {
    name: 'Test Tool',
    slug: 'test-tool',
    description: 'A test tool for SEO verification.',
    tags: [{ name: 'AI' }, { name: 'Testing' }],
    updatedAt: new Date().toISOString()
}

const metadata = generateWorldClassMetadata({
    title: `${mockTool.name} Review`,
    description: mockTool.description,
    path: `/tool/${mockTool.slug}`,
    contentType: 'tool',
    keywords: mockTool.tags.map(t => t.name),
    updatedAt: mockTool.updatedAt
})

console.log('Generated Metadata:', JSON.stringify(metadata, null, 2))

// Verification Checks
const checks = [
    { name: 'Title present', passed: !!metadata.title },
    { name: 'Description present', passed: !!metadata.description },
    { name: 'Robots configured', passed: !!metadata.robots },
    { name: 'OpenGraph Locale', passed: metadata.openGraph?.locale === 'en' },
    { name: 'Alternate Locales', passed: Array.isArray(metadata.openGraph?.alternateLocale) && metadata.openGraph?.alternateLocale.length > 0 },
    { name: 'AI Optimization Tag', passed: metadata.other?.['ai-search-optimized'] === 'true' },
]

console.log('\nVerification Results:')
checks.forEach(check => {
    console.log(`${check.passed ? '✅' : '❌'} ${check.name}`)
})

if (checks.every(c => c.passed)) {
    console.log('\nSUCCESS: SEO Metadata generation verified.')
} else {
    console.error('\nFAILURE: Some SEO checks failed.')
    process.exit(1)
}
