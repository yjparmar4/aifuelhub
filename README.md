# AI Tools Directory & Blog Platform

A comprehensive, SEO-first AI Tools discovery platform designed for high performance, monetization, and programmatic SEO content generation.

## 🚀 Features

### Core Functionality
- **AI Tools Directory** - Browse, search, and filter AI tools by category, pricing, and features
- **Tool Review Pages** - Detailed reviews with pros, cons, pricing, features, and FAQs
- **Category Pages** - Programmatic SEO content for each tool category
- **Tool Comparisons** - Side-by-side comparison tables with verdicts
- **Blog Section** - Long-form articles with categories and tags
- **Tool Submission** - User-friendly form for submitting new tools

### SEO & Performance
- **Meta Tags** - Auto-generated for all pages
- **JSON-LD Schema** - Review, FAQ, Article, and Product schemas
- **Sitemap.xml** - Automatically generated
- **Robots.txt** - Configured for optimal crawling
- **Clean URLs** - SEO-friendly URL structure
- **Internal Linking** - Strategic internal links across all pages

### Monetization
- **AdPlaceholders** - Ready for Google AdSense integration (banner, sidebar, in-content, sticky)
- **Affiliate Buttons** - CTA components for affiliate links
- **Sponsored Badges** - Support for sponsored tool listings
- **Newsletter** - Email lead collection for marketing

### Design & UX
- **Mobile-First** - Fully responsive design
- **Fast Loading** - Optimized for Core Web Vitals
- **shadcn/ui Components** - Modern, accessible UI components
- **Tailwind CSS 4** - Latest styling framework
- **Dark Mode Support** - Theme-ready (requires next-themes integration)

## 📋 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Database**: Prisma ORM with SQLite
- **Icons**: Lucide React

## 🛠️ Setup & Installation

```bash
# Install dependencies
bun install

# Set up database
bun run db:push

# Seed database with sample data
bun run db:seed

# Start development server
bun run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── ai-tools/                 # AI Tools Directory
│   │   ├── page.tsx             # Directory listing with filters
│   │   └── [slug]/page.tsx      # Category pages
│   ├── tools/                    # Tool Review Pages
│   │   └── [slug]/page.tsx      # Individual tool reviews
│   ├── blog/                     # Blog Section
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/page.tsx      # Blog post pages
│   ├── compare/                  # Comparisons
│   │   └── [slug]/page.tsx      # Tool comparisons
│   ├── submit-tool/              # Tool Submission
│   ├── api/                      # API Routes
│   │   ├── tools/
│   │   ├── categories/
│   │   ├── blog/
│   │   ├── search/
│   │   └── submit-tool/
│   ├── sitemap.xml/              # Sitemap generation
│   └── robots.txt/               # Robots.txt generation
├── components/                   # React Components
│   ├── ui/                      # shadcn/ui components
│   ├── tool-card.tsx
│   ├── category-card.tsx
│   ├── ad-placeholder.tsx
│   ├── affiliate-button.tsx
│   ├── comparison-table.tsx
│   └── ... (page-specific components)
├── lib/                        # Utilities
│   ├── db.ts                    # Prisma client
│   ├── seo.ts                   # Metadata generation
│   └── schema.ts                # JSON-LD schemas
├── types/                       # TypeScript types
└── prisma/                      # Database schema & migrations
    └── schema.prisma
```

## 🎯 Page Routes

### Public Pages
- `/` - Homepage with hero, categories, and trending tools
- `/ai-tools` - Tools directory with filters
- `/ai-tools/{category}` - Category pages with SEO content
- `/tools/{slug}` - Tool review pages
- `/blog` - Blog listing
- `/blog/{slug}` - Individual blog posts
- `/compare/{slug}` - Tool comparisons
- `/submit-tool` - Tool submission form

### API Routes
- `/api/tools` - Fetch tools with filters and pagination
- `/api/tools/{slug}` - Get single tool details
- `/api/categories` - Fetch all categories
- `/api/categories/{slug}` - Get category details
- `/api/blog` - Fetch blog posts
- `/api/blog/{slug}` - Get single blog post
- `/api/search` - Search across tools, blog, and categories
- `/api/submit-tool` - Submit new tool for review

### SEO Routes
- `/sitemap.xml` - Dynamic sitemap
- `/robots.txt` - Robots configuration

## 🔧 Database Schema

### Models
- **Tool** - AI tools with features, pricing, reviews
- **Category** - Tool categories
- **Tag** - Flexible tagging system
- **BlogPost** - Blog articles
- **Comparison** - Tool comparisons
- **Review** - User reviews
- **ToolSubmission** - Admin queue for new tools
- **Subscriber** - Email newsletter subscribers

## 💰 Monetization

### Google AdSense
Ad placeholders are already integrated:
- **Banner Ads** - In-content banners (728x90)
- **Sidebar Ads** - Larger sidebar units (300x250)
- **Sticky Ads** - Sticky sidebar ads
- **Inline Ads** - Between content sections

To activate AdSense:
1. Get your AdSense publisher ID
2. Replace `<AdPlaceholder>` components with actual AdSense code
3. Update `ad-placeholder.tsx` with your ad units

### Affiliate Marketing
- **AffiliateButton** - CTA buttons for affiliate links
- **VerifiedCTA** - Trust-focused CTAs
- **AggressiveCTA** - High-intent CTAs
- **SoftCTA** - Lower-intent CTAs

To add affiliate links:
1. Update tools in the database with `affiliateLink` and `affiliateCTA` fields
2. Affiliate links are used preferentially over direct website URLs

### Email Leads
Newsletter subscription form is integrated on:
- Homepage footer
- Blog post footer
- Custom placement available

## 📊 Programmatic SEO

### Category Pages
Auto-generated 800-1200 word content including:
- Introduction to the category
- What to look for in these tools
- Benefits and use cases
- Selection guides
- Internal links to tools

### Tool Review Pages
Structured content sections:
- What is {Tool Name}
- Key features (bullet points)
- Pricing overview
- Who should use it
- Pros & Cons
- Best use cases
- Top alternatives
- Final verdict
- FAQ with schema

## 🔍 SEO Features

### Metadata
- Auto-generated meta titles and descriptions
- Open Graph tags for social sharing
- Twitter card support
- Canonical URLs
- No-index support for draft pages

### Structured Data
- **Product Schema** - For tools with pricing and reviews
- **Review Schema** - Aggregate ratings and review counts
- **Article Schema** - For blog posts
- **FAQ Schema** - For FAQ sections
- **BreadcrumbList** - Navigation breadcrumbs
- **WebSite Schema** - Site-level schema
- **CollectionPage** - For category pages

## 🎨 Customization

### Colors
The site uses Tailwind CSS semantic colors. Modify `tailwind.config.ts` for custom themes.

### Components
All UI components are in `src/components/ui/` and can be customized using shadcn/ui theming.

### Content
- Edit `prisma/seed.ts` to update sample data
- Add new tools through `/submit-tool` or directly in the database
- Create blog posts via database or API

## 📝 Content Guidelines

### Tool Reviews
- 800-1000 words minimum
- Include pros, cons, features, use cases
- Add 5+ FAQs with schema
- Include pricing information
- Add affiliate links where available

### Category Pages
- 800-1200 words
- Programmatic content is auto-generated
- Update templates in `category-page.tsx`

### Blog Posts
- 1000+ words for SEO
- Include meta descriptions
- Add relevant tags
- Use internal links

## 🚀 Deployment

### Build
```bash
bun run build
```

### Production Start
```bash
bun run start
```

### Environment Variables
Set these in your `.env` file:
```
DATABASE_URL=your_database_url
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📈 Performance Optimization

- Server-side rendering for SEO
- Static generation where possible
- Optimized images with Sharp
- Lazy loading components
- Efficient database queries with Prisma
- Minimized JavaScript bundle

## 🤝 Contributing

1. Add new tools via the submission form or directly to the database
2. Update categories and tags as needed
3. Improve programmatic SEO templates
4. Add new monetization strategies
5. Enhance UI/UX

## 📄 License

This project is proprietary and confidential.

## 🆘 Support

For issues or questions:
1. Check the documentation above
2. Review the codebase structure
3. Test API routes directly
4. Check database connection

## 🎯 Future Enhancements

- [ ] User authentication for reviews
- [ ] Advanced comparison builder
- [ ] Email notifications for new tools
- [ ] Analytics dashboard
- [ ] Export tools as CSV/PDF
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced search with filters
- [ ] Tool bookmarking
- [ ] Review voting system
