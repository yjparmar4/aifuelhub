import { db } from '@/lib/db';
import { SITE_URL } from '@/lib/seo';

export async function GET() {
    // Fetch all published blog posts with full content
    const posts = await db.blogPost.findMany({
        where: {
            published: true,
        },
        orderBy: {
            publishedAt: 'desc',
        },
        select: {
            title: true,
            slug: true,
            excerpt: true,
            content: true,
            publishedAt: true,
            updatedAt: true,
            coverImage: true,
            category: {
                select: {
                    name: true,
                },
            },
        },
        take: 50, // Limit feed size
    });

    // Enhanced XML Header with additional namespaces for Discover
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
    xmlns:atom="http://www.w3.org/2005/Atom" 
    xmlns:content="http://purl.org/rss/1.0/modules/content/" 
    xmlns:media="http://search.yahoo.com/mrss/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
    <title>AI Fuel Hub Blog - AI Tools Reviews &amp; Guides</title>
    <link>${SITE_URL}</link>
    <description>Expert recommendations and reviews of the best AI tools and software. Discover comparisons, pricing guides, and in-depth tutorials for AI tools in 2026.</description>
    <language>en-us</language>
    <copyright>Copyright ${new Date().getFullYear()} AI Fuel Hub. All rights reserved.</copyright>
    <managingEditor>hello@aifuelhub.com (AI Fuel Hub Team)</managingEditor>
    <webMaster>hello@aifuelhub.com (AI Fuel Hub Team)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <sy:updatePeriod>daily</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.svg</url>
      <title>AI Fuel Hub</title>
      <link>${SITE_URL}</link>
      <width>144</width>
      <height>144</height>
    </image>
`;

    // Helper to escape XML special characters
    const escapeXml = (unsafe: string) => {
        return unsafe.replace(/[<>&'"]/g, (c) => {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case "'": return '&apos;';
                case '"': return '&quot;';
            }
            return c;
        });
    };

    // XML Items with enhanced metadata for Discover
    const xmlItems = posts.map((post) => {
        const postUrl = `${SITE_URL}/blog/${post.slug}`;
        const imageUrl = post.coverImage?.startsWith('http')
            ? post.coverImage
            : `${SITE_URL}${post.coverImage}`;

        // Create excerpt if not available
        const description = post.excerpt || post.content.substring(0, 300).replace(/[#*\[\]]/g, '') + '...';

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
      <dc:creator><![CDATA[AI Fuel Hub Team]]></dc:creator>
      <description><![CDATA[${description}]]></description>
      ${post.category?.name ? `<category>${escapeXml(post.category.name)}</category>` : ''}
      ${imageUrl ? `
      <media:content url="${escapeXml(imageUrl)}" medium="image" type="image/jpeg">
        <media:title type="plain">${escapeXml(post.title)}</media:title>
      </media:content>
      <media:thumbnail url="${escapeXml(imageUrl)}" width="1200" height="630"/>
      <enclosure url="${escapeXml(imageUrl)}" type="image/jpeg" length="0"/>` : ''}
      <content:encoded><![CDATA[
        ${imageUrl ? `<p><img src="${imageUrl}" alt="${escapeXml(post.title)}" width="1200" style="max-width:100%;height:auto;" /></p>` : ''}
        ${post.content}
        <p><a href="${postUrl}">Read more on AI Fuel Hub</a></p>
      ]]></content:encoded>
    </item>`;
    }).join('');

    // XML Footer
    const xmlFooter = `
  </channel>
</rss>`;

    return new Response(xmlHeader + xmlItems + xmlFooter, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}

