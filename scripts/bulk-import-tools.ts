
import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'

// Usage: npx ts-node scripts/bulk-import-tools.ts

const prisma = new PrismaClient()

interface ToolImportData {
    name: string
    slug: string
    description: string
    websiteUrl: string
    category: string
    pricingType: 'Free' | 'Freemium' | 'Paid'
    startingPrice?: string
    tags: string[]
    // Optional detailed fields
    features?: string[]
    pros?: string[]
    cons?: string[]
}

async function main() {
    console.log('🚀 Starting bulk import...')

    // 1. Read JSON file (mock data for example)
    // In production, user would fill 'tools_data.json' with 100s of rows
    const dataPath = path.join(process.cwd(), 'tools_data.json')

    let tools: ToolImportData[] = []

    try {
        const fileContent = await fs.readFile(dataPath, 'utf-8')
        tools = JSON.parse(fileContent)
        console.log(`📂 Found ${tools.length} tools to import.`)
    } catch (e) {
        console.log('⚠️ No tools_data.json found. Creating a sample one...')
        const sampleData: ToolImportData[] = [
            {
                name: "Example AI Tool",
                slug: "example-ai-tool",
                description: "An example tool to show how the import works.",
                websiteUrl: "https://example.com",
                category: "Productivity",
                pricingType: "Freemium",
                startingPrice: "$10/mo",
                tags: ["students", "writing"],
                features: ["Feature 1", "Feature 2"],
                pros: ["Good UI", "Fast"],
                cons: ["Expensive"]
            }
        ]
        await fs.writeFile(dataPath, JSON.stringify(sampleData, null, 2))
        tools = sampleData
    }

    // 2. Process Tools
    for (const t of tools) {
        console.log(`Processing: ${t.name}...`)

        // A. Create/Get Category
        const categorySlug = t.category.toLowerCase().replace(/ /g, '-')
        const category = await prisma.category.upsert({
            where: { slug: categorySlug },
            update: {},
            create: {
                name: t.category,
                slug: categorySlug,
                description: `Best AI tools for ${t.category}`,
                icon: "⚡" // Default icon
            }
        })

        // B. Create/Get Tags
        const tagConnect = []
        for (const tagName of t.tags) {
            const tagSlug = tagName.toLowerCase().replace(/ /g, '-')
            const tag = await prisma.tag.upsert({
                where: { slug: tagSlug },
                update: {},
                create: {
                    name: tagName,
                    slug: tagSlug
                }
            })
            tagConnect.push({ id: tag.id })
        }

        // C. Create Tool
        await prisma.tool.upsert({
            where: { slug: t.slug },
            update: {
                // Update fields if re-running
                description: t.description,
                websiteUrl: t.websiteUrl,
                pricingType: t.pricingType,
                startingPrice: t.startingPrice,
                features: JSON.stringify(t.features || []),
                pros: JSON.stringify(t.pros || []),
                cons: JSON.stringify(t.cons || []),
            },
            create: {
                name: t.name,
                slug: t.slug,
                description: t.description,
                websiteUrl: t.websiteUrl,
                pricingType: t.pricingType,
                startingPrice: t.startingPrice,
                categoryId: category.id,
                features: JSON.stringify(t.features || []),
                pros: JSON.stringify(t.pros || []),
                cons: JSON.stringify(t.cons || []),
                tags: {
                    connect: tagConnect
                },
                published: true
            }
        })
    }

    console.log('✅ Import complete!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
