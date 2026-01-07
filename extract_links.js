
const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, 'prisma', 'seed.ts');
const content = fs.readFileSync(seedPath, 'utf8');

// Regex to match tool definitions
// We look for name: '...' or "..." and websiteUrl: '...' or "..." within the same block
// Since the file is structured, we can iterate line by line or use a global regex.
// Global regex is easier if the keys are unique enough.

const tools = [];
const toolRegex = /create:\s*{[^}]*?name:\s*['"](.*?)['"][^}]*?websiteUrl:\s*['"](.*?)['"]/gs;

// The above regex might be too greedy or fail on nested braces (like in features JSON).
// Let's rely on the fact that `name` comes before `websiteUrl` in the seed file (usually).
// Better approach: Split by `prisma.tool.upsert`.

const blocks = content.split('prisma.tool.upsert');
blocks.shift(); // remove first chunk before first tool

blocks.forEach(block => {
    const nameMatch = block.match(/name:\s*['"](.*?)['"]/);
    const urlMatch = block.match(/websiteUrl:\s*['"](.*?)['"]/);

    if (nameMatch && urlMatch) {
        tools.push({
            name: nameMatch[1],
            url: urlMatch[1]
        });
    }
});


const outputPath = 'C:\\Users\\Yuvi\\.gemini\\antigravity\\brain\\9c9a5567-b0a4-48b7-92bd-2cea6178aa3e\\affiliate_links.md';
let output = '# AI Tools Affiliate Links\n\n| Tool Name | Website URL | Affiliate Link |\n|-----------|-------------|----------------|\n';

tools.forEach(t => {
    output += `| ${t.name} | ${t.url} | |\n`;
});

fs.writeFileSync(outputPath, output, 'utf8');
console.log('Written to ' + outputPath);

