/**
 * Long-Tail & Informational Content Creation Script
 * Creates new blog posts targeting less competitive keywords
 * Run with: npx ts-node prisma/add-longtail-content.ts
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const newBlogPosts = [
    // Long-tail: Alternatives content
    {
        title: "7 Best Free Ahrefs Alternatives 2026 (No Credit Card Required)",
        slug: "free-ahrefs-alternatives-2026",
        excerpt: "Can't afford Ahrefs' $99/mo? These 7 free SEO tools do 80% of what Ahrefs does. We tested each one - here's what actually works.",
        metaTitle: "7 FREE Ahrefs Alternatives 2026: No Signup Required ✓",
        metaDescription: "Ahrefs too expensive? These 7 free SEO tools do backlink analysis, keyword research, and rank tracking without the $99/mo price tag. All tested Jan 2026.",
        focusKeyword: "free ahrefs alternatives",
        coverImage: "/blog/images/free-ahrefs-alternatives.png",
        content: `
# 7 Best Free Ahrefs Alternatives in 2026 (Actually Work)

Let's be honest: **Ahrefs is expensive**. At $99/month for the basic plan, it's out of reach for most bloggers, freelancers, and small businesses.

But here's the good news: You don't *need* Ahrefs to do SEO in 2026.

After testing 20+ free SEO tools, I found **7 that do 80% of what Ahrefs does** - without the massive price tag.

<div class="my-8 p-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl border-2 border-emerald-300 shadow-lg">
  <h3 class="text-xl font-bold text-emerald-900 mb-2 flex items-center gap-2">
    