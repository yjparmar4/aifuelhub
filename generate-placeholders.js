const fs = require('fs');
const path = require('path');

const images = [
    {
        name: 'best-ai-tools-2024.svg',
        text: 'Best AI Tools 2024',
        color1: '#4F46E5',
        color2: '#9333EA'
    },
    {
        name: 'chatgpt-vs-claude-comparison.svg',
        text: 'ChatGPT vs Claude',
        color1: '#10B981',
        color2: '#3B82F6'
    }
];

const dir = path.join(__dirname, 'public', 'blog');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

images.forEach(img => {
    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${img.color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${img.color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="60" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">${img.text}</text>
</svg>`;

    fs.writeFileSync(path.join(dir, img.name), svg);
    console.log(`Created ${img.name}`);
});
