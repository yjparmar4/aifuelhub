const fs = require('fs');
const path = require('path');

// Read the posts content
const postsContent = JSON.parse(fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf8'));

// Enhancement patterns
const enhancements = [
  // Better key takeaways boxes with gradients
  {
    pattern: /<div class="my-8 p-6 bg-amber-50 rounded-xl border-l-\[6px\] border-amber-500 shadow-sm">([\s\S]*?)<\/div>/g,
    replacement: (match) => {
      return match
        .replace('bg-amber-50', 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50')
        .replace('border-l-[6px] border-amber-500', 'border-2 border-amber-300 shadow-lg')
        .replace('rounded-xl', 'rounded-2xl');
    }
  },
  {
    pattern: /<div class="my-8 p-6 bg-blue-50 rounded-xl border-l-\[6px\] border-blue-500 shadow-sm">([\s\S]*?)<\/div>/g,
    replacement: (match) => {
      return match
        .replace('bg-blue-50', 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50')
        .replace('border-l-[6px] border-blue-500', 'border-2 border-blue-300 shadow-lg')
        .replace('rounded-xl', 'rounded-2xl');
    }
  },
  {
    pattern: /<div class="my-8 p-6 bg-pink-50 rounded-xl border-l-\[6px\] border-pink-500 shadow-sm">([\s\S]*?)<\/div>/g,
    replacement: (match) => {
      return match
        .replace('bg-pink-50', 'bg-gradient-to-br from-pink-50 via-rose-50 to-red-50')
        .replace('border-l-[6px] border-pink-500', 'border-2 border-pink-300 shadow-lg')
        .replace('rounded-xl', 'rounded-2xl');
    }
  },
  {
    pattern: /<div class="my-8 p-6 bg-emerald-50 rounded-xl border-l-\[6px\] border-emerald-500 shadow-sm">([\s\S]*?)<\/div>/g,
    replacement: (match) => {
      return match
        .replace('bg-emerald-50', 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50')
        .replace('border-l-[6px] border-emerald-500', 'border-2 border-emerald-300 shadow-lg')
        .replace('rounded-xl', 'rounded-2xl');
    }
  },
  {
    pattern: /<div class="my-8 p-6 bg-indigo-50 rounded-xl border-l-\[6px\] border-indigo-500 shadow-sm">([\s\S]*?)<\/div>/g,
    replacement: (match) => {
      return match
        .replace('bg-indigo-50', 'bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50')
        .replace('border-l-[6px] border-indigo-500', 'border-2 border-indigo-300 shadow-lg')
        .replace('rounded-xl', 'rounded-2xl');
    }
  },
  {
    pattern: /<div class="my-8 p-6 bg-cyan-50 rounded-xl border-l-\[6px\] border-cyan-500 shadow-sm">([\s\S]*?)<\/div>/g,
    replacement: (match) => {
      return match
        .replace('bg-cyan-50', 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50')
        .replace('border-l-[6px] border-cyan-500', 'border-2 border-cyan-300 shadow-lg')
        .replace('rounded-xl', 'rounded-2xl');
    }
  },
  // Enhance tables with better styling
  {
    pattern: /<table class="w-full text-sm">([\s\S]*?)<\/table>/g,
    replacement: '<table class="w-full text-sm border-collapse border-2 border-purple-200">$1</table>'
  },
  // Enhance table headers with gradient
  {
    pattern: /<thead class="bg-gray-100 text-gray-900 font-bold">([\s\S]*?)<\/thead>/g,
    replacement: '<thead class="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-bold">$1</thead>'
  },
  // Enhance table cells
  {
    pattern: /<td class="px-4 py-3([^"]*)">/g,
    replacement: '<td class="px-4 py-3$1 border-b border-purple-100 hover:bg-purple-50 transition-colors">'
  },
  // Add emoji to important sections
  {
    pattern: /## (What is|Understanding|The Core|The 3 Pillars|How AI is)/g,
    replacement: '## 🧠 $1'
  },
  {
    pattern: /## (Strategies|Tips|Tactics|Best Practices)/g,
    replacement: '## 💡 $1'
  },
  {
    pattern: /## (Step \d+)/g,
    replacement: '## 📋 $1'
  },
  {
    pattern: /## (FAQ|Common Questions|Q&A)/g,
    replacement: '## ❓ $1'
  },
  {
    pattern: /## (Pros|Cons|Benefits|Advantages)/g,
    replacement: '## ✨ $1'
  },
  {
    pattern: /## (Warning|Avoid|Don't|Risks)/g,
    replacement: '## ⚠️ $1'
  },
  {
    pattern: /## (Example|Use Case|Case Study)/g,
    replacement: '## 💎 $1'
  },
  {
    pattern: /## (Conclusion|Verdict|Final Thoughts|Summary)/g,
    replacement: '## 🚀 $1'
  },
  {
    pattern: /## (Implementation|How to|Getting Started)/g,
    replacement: '## 🎯 $1'
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
  },
  // Enhance blockquotes
  {
    pattern: /> \[!TIP\]/g,
    replacement: '> 💡 **Pro Tip**'
  },
  {
    pattern: /> \[!WARNING\]/g,
    replacement: '> ⚠️ **Warning**'
  },
  {
    pattern: /> \[!NOTE\]/g,
    replacement: '> 📝 **Note**'
  },
  {
    pattern: /> \[!IMPORTANT\]/g,
    replacement: '> 🔥 **Important**'
  }
];

// Apply enhancements to each blog post
postsContent.forEach((post, index) => {
  let content = post.content;
  
  // Apply all enhancement patterns
  enhancements.forEach(enhancement => {
    content = content.replace(enhancement.pattern, enhancement.replacement);
  });
  
  post.content = content;
  console.log(`Enhanced post ${index + 1}: ${post.slug}`);
});

// Save the enhanced content
fs.writeFileSync(
  path.join(__dirname, 'posts.json'),
  JSON.stringify(postsContent, null, 2),
  'utf8'
);

console.log('\n✅ All posts enhanced successfully!');
