import { db } from '@/lib/db';
import { SITE_URL } from '@/lib/seo';

export async function GET() {
    // Fetch all published blog posts
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
            publishedAt: true,
            coverImage: true,
            category: {
                select: {
                    name: true,
                },
            },
        },
        take: 50, // Limit feed size
    });

    // XML Header
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>AI Fuel Hub Blog</title>
    <link>${SITE_URL}</link>
    <description>Expert recommendations and reviews of the best AI tools and software.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
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

    // XML Items
    const xmlItems = posts.map((post) => {
        const postUrl = `${SITE_URL}/blog/${post.slug}`;
        const imageUrl = post.coverImage?.startsWith('http')
            ? post.coverImage
            : `${SITE_URL}${post.coverImage}`;

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      ${post.category?.name ? `<category>${escapeXml(post.category.name)}</category>` : ''}
      ${imageUrl ? `<media:content url="${escapeXml(imageUrl)}" medium="image" />` : ''}
    </item>`;
    }).join('');

    // XML Footer
    const xmlFooter = `
  </channel>
</rss>`;

    return new Response(xmlHeader + xmlItems + xmlFooter, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
    });
}
