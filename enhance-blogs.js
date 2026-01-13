const fs = require('fs');
const path = require('path');

// Read the blog content
const blogContent = JSON.parse(fs.readFileSync(path.join(__dirname, 'blog_content.json'), 'utf8'));

// Enhancement patterns
const enhancements = [
  // Better key takeaways boxes with gradients
  {
    pattern: /<div class="my-8 p-6 bg-purple-50 rounded-xl border border-purple-100">([\s\S]*?)<\/div>/g,
    replacement: (match) => {
      return match
        .replace('bg-purple-50', 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50')
        .replace('border-purple-100', 'border-2 border-purple-200 shadow-lg')
        .replace('rounded-xl', 'rounded-2xl');
    }
  },
  // Enhance tables with better styling
  {
    pattern: /<table class="w-full text-left text-sm">([\s\S]*?)<\/table>/g,
    replacement: '<table class="w-full text-left text-sm border-collapse border-2 border-purple-200">$1</table>'
  },
  // Enhance table headers with gradient
  {
    pattern: /<thead class="bg-purple-100 text-purple-900 font-bold">([\s\S]*?)<\/thead>/g,
    replacement: '<thead class="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-bold">$1</thead>'
  },
  // Enhance table cells
  {
    pattern: /<td class="p-3([^"]*)">/g,
    replacement: '<td class="p-3$1 border-b border-purple-100 hover:bg-purple-50 transition-colors">'
  },
  // Enhance info boxes with better colors
  {
    pattern: /<div class="my-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 text-sm">([\s\S]*?)<\/div>/g,
    replacement: '<div class="my-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 text-blue-900 rounded-r-xl shadow-md">$1</div>'
  },
  // Add emoji to important sections
  {
    pattern: /## (The Test|How We Evaluated|Why it wins|Key Takeaways)/g,
    replacement: '## 🎯 $1'
  },
  {
    pattern: /## (Step \d+)/g,
    replacement: '## 📋 $1'
  },
  {
    pattern: /## (FAQ|Common Questions)/g,
    replacement: '## ❓ $1'
  },
  {
    pattern: /## (Pros|Cons|Benefits|Advantages)/g,
    replacement: '## ✨ $1'
  },
  {
    pattern: /## (Warning|Avoid|Don't)/g,
    replacement: '## ⚠️ $1'
  },
  {
    pattern: /## (Example|Use Case)/g,
    replacement: '## 💎 $1'
  },
  {
    pattern: /## (Conclusion|Verdict|Final Thoughts)/g,
    replacement: '## 🚀 $1'
  },
  // Enhance list items with better formatting
  {
    pattern: /\*   \*\*([^:]+):\*\* /g,
    replacement: '*   **$1:** '
  },
  // Add decorative dividers
  {
    pattern: /---\n\n##/g,
    replacement: '\n\n<div class="my-12 flex items-center justify-center gap-4">\n  <div class="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>\n  <span class="text-2xl">✨</span>\n  <div class="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>\n</div>\n\n\n##'
  }
];

// Apply enhancements to each blog post
blogContent.forEach((blog, index) => {
  let content = blog.content;
  
  // Apply all enhancement patterns
  enhancements.forEach(enhancement => {
    content = content.replace(enhancement.pattern, enhancement.replacement);
  });
  
  blog.content = content;
  console.log(`Enhanced blog ${index + 1}: ${blog.slug}`);
});

// Save the enhanced content
fs.writeFileSync(
  path.join(__dirname, 'blog_content.json'),
  JSON.stringify(blogContent, null, 2),
  'utf8'
);

console.log('\n✅ All blogs enhanced successfully!');
