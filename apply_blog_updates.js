const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prisma/seed.ts');
const dataPath = path.join(__dirname, 'blog_content.json');

try {
    const blogPosts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    let fileContent = fs.readFileSync(filePath, 'utf8');

    for (const post of blogPosts) {
        const marker = `slug: '${post.slug}'`;
        const markerIndex = fileContent.indexOf(marker);

        if (markerIndex === -1) {
            console.error(`Marker not found for ${post.slug}`);
            continue;
        }

        const contentStartMarker = "content: `";
        const contentStartIndex = fileContent.indexOf(contentStartMarker, markerIndex);

        if (contentStartIndex === -1) {
            console.error(`Content start not found for ${post.slug}`);
            continue;
        }

        const endMarker = "categoryId:";
        const contentEndIndex = fileContent.indexOf(endMarker, contentStartIndex);

        // Find the closing backtick before categoryId
        const closingBacktickIndex = fileContent.lastIndexOf('`,', contentEndIndex);

        if (closingBacktickIndex === -1 || closingBacktickIndex < contentStartIndex) {
            console.error(`Content end not found for ${post.slug}`);
            continue;
        }

        const prefix = fileContent.substring(0, contentStartIndex + contentStartMarker.length);
        const suffix = fileContent.substring(closingBacktickIndex);

        fileContent = prefix + post.content + suffix;
        console.log(`Updated content for ${post.slug}`);
    }

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log('Successfully updated seed.ts from JSON');

} catch (err) {
    console.error(err);
    process.exit(1);
}
