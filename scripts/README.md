# Automated Blog Publishing System

## Quick Commands

```bash
# Generate blogs (interactive CLI)
npm run generate-blogs

# Publish single blog
npm run publish-blog -- best-enterprise-ai-software-2026

# Batch publish Week 1 (Days 1-7)
npm run batch-publish -- --start 1 --end 7

# Schedule all posts for daily publishing
npm run schedule-posts schedule

# Publish posts scheduled for today
npm run schedule-posts publish-now
```

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate Week 1 content**:
   ```bash
   npm run generate-blogs
   # Select option 2, enter week: 1
   ```

3. **Review and edit** posts in Prisma Studio:
   ```bash
   npm run db:studio
   ```

4. **Upload images** to `/public/blog/images/`:
   - `[slug]-hero.png` for each post

5. **Publish Week 1**:
   ```bash
   npm run batch-publish -- --start 1 --end 7
   ```

6. **Schedule future posts**:
   ```bash
   npm run schedule-posts schedule
   ```

7. **Enable GitHub Actions** (for auto-publishing):
   - Add `DATABASE_URL` to GitHub Secrets
   - Workflow runs daily at 9 AM UTC

## Documentation

See `automated_publishing_docs.md` for complete documentation.

## Content Templates

4 professional templates included:
- **Comparison Guide** - "X vs Y vs Z"
- **Tools Roundup** - "Best X Tools"  
- **How-To Guide** - Step-by-step tutorials
- **Platform Comparison** - Deep 2-3 platform comparisons

## 90-Day Plan Integration

Matches the full 90-day content calendar with:
- High-CPC keywords ($30-$200+)
- SEO-optimized structure
- FAQ schema markup
- Internal linking templates
