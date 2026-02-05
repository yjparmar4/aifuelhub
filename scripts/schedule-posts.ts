/**
 * Blog Post Scheduler
 * Schedules blog posts to be published on specific dates
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface ScheduleConfig {
    startDate: Date
    postsPerWeek: number
    publishDays: number[] // 0 = Sunday, 1 = Monday, etc.
}

/**
 * Schedule blog posts for the 90-day plan
 * This will set publishedAt dates for all unpublished posts
 */
async function schedulePosts(config: ScheduleConfig): Promise<void> {
    const unpublishedPosts = await prisma.blogPost.findMany({
        where: { published: false },
        orderBy: { createdAt: 'asc' }
    })

    if (unpublishedPosts.length === 0) {
        console.log('ℹ️  No unpublished posts to schedule')
        return
    }

    console.log(`\n📅 Scheduling ${unpublishedPosts.length} blog posts...\n`)
    console.log(`Config:`)
    console.log(`  Start Date: ${config.startDate.toDateString()}`)
    console.log(`  Posts Per Week: ${config.postsPerWeek}`)
    console.log(`  Publish Days: ${config.publishDays.map(d => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d]).join(', ')}\n`)

    let currentDate = new Date(config.startDate)
    let postIndex = 0

    while (postIndex < unpublishedPosts.length) {
        const dayOfWeek = currentDate.getDay()

        // Check if this is a publish day
        if (config.publishDays.includes(dayOfWeek)) {
            const post = unpublishedPosts[postIndex]

            await prisma.blogPost.update({
                where: { id: post.id },
                data: {
                    publishedAt: new Date(currentDate),
                    published: false // Will be published on the scheduled date
                }
            })

            console.log(`✅ Scheduled: "${post.title}" for ${currentDate.toDateString()}`)
            postIndex++
        }

        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1)
    }

    console.log(`\n🎉 Successfully scheduled ${unpublishedPosts.length} posts!`)
    console.log(`\nTo auto-publish on scheduled dates, set up a cron job to run:`)
    console.log(`  npm run publish-scheduled`)
}

/**
 * Publish posts that are scheduled for today or earlier
 */
async function publishScheduled(): Promise<void> {
    const now = new Date()

    const postsToPublish = await prisma.blogPost.findMany({
        where: {
            published: false,
            publishedAt: {
                lte: now
            }
        }
    })

    if (postsToPublish.length === 0) {
        console.log('ℹ️  No posts scheduled for publication')
        return
    }

    console.log(`\n📤 Publishing ${postsToPublish.length} scheduled posts...\n`)

    for (const post of postsToPublish) {
        await prisma.blogPost.update({
            where: { id: post.id },
            data: { published: true }
        })
        console.log(`✅ Published: ${post.title}`)
    }

    console.log(`\n🎉 Successfully published ${postsToPublish.length} posts!`)
}

// CLI execution
const command = process.argv[2]

if (command === '--help' || !command) {
    console.log(`
╔════════════════════════════════════════════╗
║      Blog Post Scheduler - Usage          ║
╚════════════════════════════════════════════╝

Commands:

  # Schedule posts to publish daily starting today
  npm run schedule-posts schedule

  # Schedule posts for Mon/Wed/Fri only
  npm run schedule-posts schedule-mwf

  # Schedule 7 posts per week (daily)
  npm run schedule-posts schedule-daily

  # Publish all posts scheduled for today or earlier
  npm run schedule-posts publish-now

Usage Tips:
  
  1. First generate and review your posts (keep published: false)
  2. Run schedule command to set future dates
  3. Set up cron job or GitHub Actions to run publish-now daily
  
Example Cron (daily at 9 AM):
  0 9 * * * cd /path/to/project && npm run schedule-posts publish-now
`)
    process.exit(0)
}

switch (command) {
    case 'schedule':
        // Default: Publish every day
        schedulePosts({
            startDate: new Date(),
            postsPerWeek: 7,
            publishDays: [0, 1, 2, 3, 4, 5, 6] // Every day
        })
            .catch(console.error)
            .finally(() => prisma.$disconnect())
        break

    case 'schedule-mwf':
        // Mon/Wed/Fri schedule
        schedulePosts({
            startDate: new Date(),
            postsPerWeek: 3,
            publishDays: [1, 3, 5] // Monday, Wednesday, Friday
        })
            .catch(console.error)
            .finally(() => prisma.$disconnect())
        break

    case 'schedule-daily':
        // Post once per day
        schedulePosts({
            startDate: new Date(),
            postsPerWeek: 7,
            publishDays: [0, 1, 2, 3, 4, 5, 6]
        })
            .catch(console.error)
            .finally(() => prisma.$disconnect())
        break

    case 'publish-now':
        publishScheduled()
            .catch(console.error)
            .finally(() => prisma.$disconnect())
        break

    default:
        console.log('❌ Unknown command. Run --help for usage.')
}
