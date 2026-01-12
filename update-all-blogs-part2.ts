const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Enhanced blog content - Part 2 (Blogs 4-7)
const enhancedBlogs = [
  {
    slug: "ai-tools-seo-complete-guide-2026",
    title: "AI SEO Tools in 2026: Complete Workflow to Rank #1 (Step-by-Step) 📈",
    metaTitle: "AI Tools for SEO 2026: Complete Guide to Ranking Faster",
    metaDescription: "Use AI to speed up SEO without losing quality. 5-step workflow with tool recommendations, prompts, and real examples. Works in 2026.",
    focusKeyword: "AI tools for SEO 2026",
    excerpt: "AI speeds execution—strategy is still human. Here's the exact workflow for using AI tools to rank faster without triggering Google penalties.",
    content: `
# AI Tools for SEO: The 2026 Workflow That Actually Works

**Core Philosophy:** AI speeds execution. Strategy is still human.

<div class="blog-callout callout-gradient">
  <h3>📈 Key Takeaways</h3>
  <ul>
    <li><strong>Data needs truth:</strong> AI hallucinates. Cross-reference with Ahrefs/Semrush.</li>
    <li><strong>Answer-first content wins:</strong> Clear structure helps humans and search engines.</li>
    <li><strong>Don't publish unverified claims:</strong> Fact-check and add real examples.</li>
  </ul>
</div>

---

## The Practical AI SEO Stack

| Role | Tool | Why This Tool |
|:-----|:-----|:--------------|
| **Strategy & Data** | [Ahrefs](/tools/ahrefs) or [Semrush](/tools/semrush) | AI lacks live keyword volume data |
| **Brief & Outline** | [Frase](/tools/frase) or ChatGPT | Analyzes top results, finds gaps |
| **Drafting** | [Claude 3.5](/tools/claude) | Less robotic than GPT-4 |
| **Optimization** | [Surfer SEO](/tools/surfer-seo) | Real-time SEO scoring |

---

## The 5-Step AI SEO Workflow

### Step 1: Keyword Discovery (20-40 minutes)

<div class="blog-callout callout-info">
  <h3>💡 The Process</h3>
  <ol>
    <li><strong>Human:</strong> Find low-competition keyword (KD < 30) in Ahrefs</li>
    <li><strong>AI Assist:</strong> "Give me 20 long-tail question variations for [keyword]"</li>
    <li><strong>Result:</strong> List of sub-headings and related questions</li>
  </ol>
</div>

**Example Prompt:**
> "I want to target 'best vegan running shoes'. Give me 20 question variations that shoe buyers ask."

---

### Step 2: SERP Pattern Scan (15 minutes)

- **Human:** Google the keyword. Analyze top 3 results.
- **AI Assist:** Paste URLs into Perplexity: "What themes are common? What's missing?"
- **Result:** Your content gap = your competitive advantage.

---

### Step 3: Content Brief Creation (20 minutes)

**AI Prompt:**
> "Create a blog outline for '[keyword]'. Include: comparison table, FAQ section, and unique angle targeting [audience]."

<div class="blog-callout callout-warning">
  <h3>⚠️ Critical Step</h3>
  <p>Always edit the AI outline. Add YOUR unique angle. What insight do you have that competitors don't?</p>
</div>

---

### Step 4: Draft → Tighten → Fact-Check (60-120 minutes)

**The "Sandwich Method":**
- **Top Bun:** Human-written hook and intro
- **Meat:** AI-generated body content (section by section)
- **Bottom Bun:** Human conclusion and CTA

<div class="blog-callout callout-danger">
  <h3>🚫 Never Do This</h3>
  <p>Never publish AI content without human fact-checking. AI hallucinates statistics, quotes, and case studies.</p>
</div>

---

### Step 5: On-Page Optimization (15-30 minutes)

1. Paste draft into Surfer SEO
2. Add suggested keywords naturally
3. Optimize headers, alt text, and internal links

---

## Technical SEO With AI

<div class="blog-callout callout-success">
  <h3>✅ AI Can Generate</h3>
  <ul>
    <li><strong>Schema Markup:</strong> "Generate Article schema in JSON-LD for this post"</li>
    <li><strong>Meta Descriptions:</strong> "Write 5 CTR-optimized metas under 160 characters"</li>
    <li><strong>Regex Patterns:</strong> "Give me a regex for Search Console to find 'why' queries"</li>
  </ul>
</div>

---

## Frequently Asked Questions

<div class="space-y-4">
  <details class="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg cursor-pointer">
    <summary class="flex justify-between items-center font-medium text-slate-900 dark:text-slate-100 list-none">
      <span>Does Google penalize AI content?</span>
      <span class="transition group-open:rotate-180">▼</span>
    </summary>
    <p class="text-slate-600 dark:text-slate-300 mt-3">
      <strong>No.</strong> Google's official guidance rewards quality content regardless of how it's produced. If your AI content is helpful, accurate, and original, it will rank. Spammy auto-generated content will be de-indexed.
    </p>
  </details>

  <details class="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg cursor-pointer">
    <summary class="flex justify-between items-center font-medium text-slate-900 dark:text-slate-100 list-none">
      <span>Can AI do link building?</span>
      <span class="transition group-open:rotate-180">▼</span>
    </summary>
    <p class="text-slate-600 dark:text-slate-300 mt-3">
      AI can write outreach emails, but it can't physically place links. High-quality backlinks still require human relationships.
    </p>
  </details>

  <details class="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg cursor-pointer">
    <summary class="flex justify-between items-center font-medium text-slate-900 dark:text-slate-100 list-none">
      <span>What's the best AI for long-form SEO content?</span>
      <span class="transition group-open:rotate-180">▼</span>
    </summary>
    <p class="text-slate-600 dark:text-slate-300 mt-3">
      <strong>Claude 3.5 Sonnet</strong> for natural-sounding prose. <strong>Jasper</strong> for built-in SEO scoring. <strong>ChatGPT</strong> for versatility and research.
    </p>
  </details>
</div>

---

<div class="blog-callout callout-gradient">
  <h3>🚀 Ready to Optimize?</h3>
  <p>Explore our <a href="/ai-tools?category=marketing">AI Marketing Tools</a> to find the perfect SEO assistant for your workflow.</p>
</div>

---

*Last updated: January 2026*
`
  },
  {
    slug: "choose-right-ai-tool-business-2026",
    title: "How to Choose the Right AI Tool for Your Business: 2026 Playbook 🎯",
    metaTitle: "How to Choose AI Tools for Business: 5-Step Framework (2026)",
    metaDescription: "Stop wasting money on AI tools nobody uses. Use this 5-step framework to evaluate, test, and adopt AI that actually drives ROI.",
    focusKeyword: "choose AI tool for business",
    excerpt: "Most teams buy 'AI tools' instead of solving specific problems. Use this framework to choose tools that actually drive ROI.",
    content: `
# How to Choose the Right AI Tool for Your Business

**Start here:** Pick one workflow. Measure time saved. Then scale.

<div class="blog-callout callout-gradient">
  <h3>🎯 The 5-Step Framework</h3>
  <ol>
    <li>Pick a use case (not a tool)</li>
    <li>Define non-negotiables (privacy, integrations, budget)</li>
    <li>Use a scoring matrix during trials</li>
    <li>Run a real 7-14 day pilot</li>
    <li>Avoid common red flags</li>
  </ol>
</div>

---

## The 10-Minute Pre-Purchase Checklist

Before evaluating ANY tool, answer these questions:

1. **What job are we hiring this tool to do?** (One sentence)
2. **What does "success" look like?** (Time saved, quality improved, cost reduced)
3. **Where will it live?** (Google Docs? Slack? Browser extension?)
4. **Who owns rollout?** (One person responsible for adoption)

<div class="blog-callout callout-warning">
  <h3>⚠️ Critical Rule</h3>
  <p>Never buy a tool without an internal "Champion." If no one owns it, no one uses it.</p>
</div>

---

## Step 1: Pick a Use Case, Not a Tool

| ❌ Bad Use Case (Vague) | ✅ Good Use Case (Specific) |
|:------------------------|:---------------------------|
| "We need AI for marketing" | "Turn webinar recordings into 3 SEO posts and 10 social clips" |
| "Help our support team" | "Draft responses to Tier 1 tickets for human review" |
| "Make us more productive" | "Summarize Zoom calls and update HubSpot deals automatically" |

**Action:** Write down your top 3 bottlenecks. Pick the one consuming the most hours weekly. That's your pilot use case.

---

## Step 2: Define Your Non-Negotiables

### Privacy & Compliance

<div class="blog-callout callout-danger">
  <h3>🚫 Never Use Free Consumer Tools For:</h3>
  <ul>
    <li>Financial data or quarterly reports</li>
    <li>Legal contracts or sensitive negotiations</li>
    <li>Customer PII (Personally Identifiable Information)</li>
    <li>HIPAA, GDPR, or SOC2 regulated data</li>
  </ul>
</div>

For enterprise use, look for: SOC2 compliance, "Zero Data Retention" policies, and SSO.

### Integration Requirements

Where does your team work?
- **Chrome/Edge** plugins for browser-based work
- **Slack/Teams** bots for chat-based workflows
- **VS Code/GitHub** for developer tools

---

## Step 3: The Scoring Matrix

Use this grid during trials to make objective decisions:

| Criteria | Weight | Score (1-5) | Notes |
|:---------|-------:|:-----------:|:------|
| Output Quality | 3x | | How much editing needed? |
| Time Saved | 3x | | Did it actually speed you up? |
| Ease of Adoption | 2x | | Can a junior use it in 10 mins? |
| Integrations | 2x | | Connects to current stack? |
| Privacy/Admin | 3x | | Is it safe? |
| Total Cost | 1x | | Is ROI positive? |

---

## Step 4: Run a Real Pilot (7-14 Days)

<div class="blog-callout callout-info">
  <h3>💡 Pilot Structure</h3>
  <ul>
    <li><strong>Day 1-2:</strong> Setup & training (3-5 people)</li>
    <li><strong>Day 3-10:</strong> Use on real tasks daily. Document failures.</li>
    <li><strong>Day 11-14:</strong> Gather scorecards. Calculate ROI.</li>
  </ul>
</div>

**ROI Formula:**
> (Hours saved × Hourly rate) - Tool Cost = Net Monthly ROI

---

## Step 5: Red Flags to Avoid

<div class="blog-callout callout-danger">
  <h3>🚫 Warning Signs</h3>
  <ul>
    <li><strong>The "Demo Trap":</strong> Always test with YOUR messy data, not rehearsed examples</li>
    <li><strong>Adds steps:</strong> If it requires export → reformat → import → paste, it's not helping</li>
    <li><strong>Vague pricing:</strong> "Contact Sales" often means expensive</li>
    <li><strong>High learning curve:</strong> If it needs a certification, your team won't adopt it</li>
  </ul>
</div>

---

## Frequently Asked Questions

<div class="space-y-4">
  <details class="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg cursor-pointer">
    <summary class="flex justify-between items-center font-medium text-slate-900 dark:text-slate-100 list-none">
      <span>What's the best AI tool for a small business starting out?</span>
      <span class="transition group-open:rotate-180">▼</span>
    </summary>
    <p class="text-slate-600 dark:text-slate-300 mt-3">
      Start with <strong>ChatGPT Plus</strong> ($20/mo) or <strong>Claude Pro</strong> ($20/mo). They're versatile enough to handle writing, analysis, and research. Master one before buying niche tools.
    </p>
  </details>

  <details class="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg cursor-pointer">
    <summary class="flex justify-between items-center font-medium text-slate-900 dark:text-slate-100 list-none">
      <span>How do I know if a tool is safe for company data?</span>
      <span class="transition group-open:rotate-180">▼</span>
    </summary>
    <p class="text-slate-600 dark:text-slate-300 mt-3">
      Look for "SOC 2 Type II" compliance. Search the Privacy Policy for "training data." Enterprise plans often include "Zero Data Retention" clauses.
    </p>
  </details>
</div>

---

<div class="blog-callout callout-gradient">
  <h3>🚀 Ready to Choose?</h3>
  <p>Browse our <a href="/ai-tools">AI Tools Directory</a> with 150+ tools categorized by use case, pricing, and features.</p>
</div>

---

*Last updated: January 2026*
`
  },
  {
    slug: "hidden-cost-free-ai-tools-privacy",
    title: "The Hidden Cost of Free AI Tools: Privacy Risks You Must Know (2026) 🔐",
    metaTitle: "Free AI Tools Privacy Risks: What You're Really Paying (2026 Guide)",
    metaDescription: "Free AI tools use your data for training. Learn what's safe to share, what isn't, and how to protect sensitive information. Real examples inside.",
    focusKeyword: "AI tool privacy risks",
    excerpt: "If you're not paying for the product, you ARE the product. Here's what's actually happening to your data in 'free' AI tools.",
    content: `
# The Hidden Cost of Free AI Tools: Are You Paying with Your Secrets?

**If you're not paying for the product, you ARE the product.**

<div class="blog-callout callout-danger">
  <h3>🚫 Key Takeaways</h3>
  <ul>
    <li>Most free tools claim ownership of everything you input</li>
    <li>Your proprietary code could train future models</li>
    <li>Enterprise-grade security stays behind the paywall</li>
  </ul>
</div>

---

## The "Training Data" Trap

When you paste your quarterly report into a free AI to "fix the grammar," where does that text go?

For many tools, it goes straight into the training corpus. Your proprietary info could theoretically be regurgitated to a competitor six months later.

<div class="blog-callout callout-warning">
  <h3>⚠️ Real-World Example: The Samsung Incident</h3>
  <p>In April 2023, Samsung employees leaked sensitive semiconductor data by pasting proprietary code into ChatGPT for debugging. Samsung subsequently banned all generative AI tools internally.</p>
  <p><strong>Your company could be next.</strong></p>
</div>

---

## Privacy Scorecard: Major AI Tools

| Tool | Trains on Data | Retention | Enterprise Opt-Out |
|:-----|:--------------:|:---------:|:------------------:|
| ChatGPT Free | ✅ Yes | 30 days | ❌ |
| ChatGPT Plus | ✅ Yes* | 30 days | ✅ Optional |
| Claude Free | ❌ No | 90 days | ✅ Enterprise |
| Gemini | ✅ Yes | 18 months | ✅ Workspace |
| Perplexity | ✅ Yes | Unclear | ❌ |

*ChatGPT Plus allows users to opt out of training in settings.

---

## What to Look For in the Fine Print

<div class="blog-callout callout-premium">
  <h3>🔍 Red Flag Terms to Watch</h3>
  <ul>
    <li><strong>"Improve our services"</strong> — Code for "we train on your data"</li>
    <li><strong>"Non-exclusive, worldwide license"</strong> — They can use it however they want</li>
    <li><strong>"Data retention"</strong> — How long do they keep prompts?</li>
    <li><strong>"Aggregate and anonymize"</strong> — Still potentially identifiable</li>
  </ul>
</div>

---

## When Free is Fine vs. When to Pay

<div class="blog-callout callout-success">
  <h3>✅ Safe for Free AI Tools</h3>
  <ul>
    <li>Brainstorming blog titles and creative ideas</li>
    <li>Generating generic stock-style images</li>
    <li>Rephrasing publicly available text</li>
    <li>Learning to code with basic examples</li>
    <li>General research on public topics</li>
  </ul>
</div>

<div class="blog-callout callout-danger">
  <h3>🚫 Pay for Privacy (Never Use Free For):</h3>
  <ul>
    <li>Analyzing financial data or quarterly reports</li>
    <li>Writing or reviewing legal contracts</li>
    <li>Debugging proprietary source code</li>
    <li>Handling customer PII (names, emails, addresses)</li>
    <li>Any HIPAA, GDPR, or SOC2 regulated data</li>
  </ul>
</div>

---

## The 5-Second Privacy Check

Before you paste ANYTHING sensitive:

<div class="blog-callout callout-info">
  <h3>🛡️ Ask Yourself These 5 Questions</h3>
  <ol>
    <li>Would I be comfortable if this appeared on a billboard?</li>
    <li>Does this contain any names, emails, or addresses?</li>
    <li>Could a competitor benefit from seeing this?</li>
    <li>Is this covered by an NDA or confidentiality agreement?</li>
    <li>Would my legal team approve of me sharing this externally?</li>
  </ol>
  <p><strong>If you answered "no" or "unsure" to any → use a paid, privacy-focused option.</strong></p>
</div>

---

## Frequently Asked Questions

<div class="space-y-4">
  <details class="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg cursor-pointer">
    <summary class="flex justify-between items-center font-medium text-slate-900 dark:text-slate-100 list-none">
      <span>Can I opt out of training on ChatGPT?</span>
      <span class="transition group-open:rotate-180">▼</span>
    </summary>
    <p class="text-slate-600 dark:text-slate-300 mt-3">
      Yes. In Settings → Data Controls → "Improve the model for everyone" → Toggle off. Your chats won't be used for training, but you may lose access to some features like conversation history.
    </p>
  </details>

  <details class="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg cursor-pointer">
    <summary class="flex justify-between items-center font-medium text-slate-900 dark:text-slate-100 list-none">
      <span>Which AI tool is safest for business data?</span>
      <span class="transition group-open:rotate-180">▼</span>
    </summary>
    <p class="text-slate-600 dark:text-slate-300 mt-3">
      <strong>Claude Enterprise</strong> or <strong>ChatGPT Enterprise</strong> both offer SOC 2 compliance and zero data retention. <strong>Microsoft Copilot with Data Protection</strong> is also a strong enterprise option.
    </p>
  </details>
</div>

---

<div class="blog-callout callout-gradient">
  <h3>💡 Final Thought</h3>
  <p>Privacy is the one feature worth paying for every single time. The cost of a $20/month subscription is nothing compared to the cost of a data breach, lawsuit, or competitive disadvantage.</p>
</div>

---

*Last updated: January 2026*
`
  },
  {
    slug: "best-human-sounding-ai-writers-2026",
    title: "5 AI Writers That Actually Sound Human (Goodbye Robot Voice) 🎤",
    metaTitle: "Best Human-Sounding AI Writing Tools 2026: No More Robot Voice",
    metaDescription: "Tired of AI content that sounds robotic? These 5 tools produce natural, human-like writing. Plus: prompts to train any AI to match your voice.",
    focusKeyword: "human-sounding AI writing tools",
    excerpt: "The 'ChatGPT voice' is instantly recognizable. Here are 5 tools that break the pattern and sound genuinely human.",
    content: `
# Beyond ChatGPT: Finding an AI Voice That Doesn't Sound Like a Robot

The "ChatGPT Voice" is everywhere: words like "delve," "tapestry," and sentences that are perfectly structured but completely soulless.

If you want to connect with readers in 2026, generic LLM output won't cut it.

<div class="blog-callout callout-danger">
  <h3>🚫 The "ChatGPT Voice" Red Flags</h3>
  <ul>
    <li>Overuse of "delve," "embark," "tapestry," "unlock," "unleash"</li>
    <li>Every sentence is the same length (monotonous rhythm)</li>
    <li>Excessive hedging: "It's important to note that..."</li>
    <li>Lists that all start with verbs in the same tense</li>
    <li>No opinions, no humor, no personality</li>
  </ul>
</div>

---

## The 5 Most Human-Sounding AI Writers

### 1. Claude 3.5 Sonnet — The Nuance King 👑

<div class="blog-callout callout-premium">
  <h3>💜 What Makes Claude Different</h3>
  <ul>
    <li>Varies sentence length naturally (short punchy + long flowing)</li>
    <li>Isn't afraid to start sentences with "And" or "But"</li>
    <li>Actually takes a stance when asked for opinions</li>
    <li>Handles nuance and complex arguments beautifully</li>
  </ul>
</div>

**Best For:** Long-form essays, opinion pieces, creative storytelling.

[Explore Claude →](/tools/claude)

---

### 2. Jasper Brand Voice Mode

Upload 5-10 samples of your existing writing, and Jasper builds a custom style profile.

<div class="blog-callout callout-info">
  <h3>💡 How Brand Voice Works</h3>
  <ol>
    <li>Upload your best existing content</li>
    <li>Jasper analyzes tone, vocabulary, sentence structure</li>
    <li>Creates a reusable style profile</li>
    <li>All future content matches YOUR voice</li>
  </ol>
</div>

[Explore Jasper →](/tools/jasper)

---

### 3. Sudowrite — For Storytellers

<div class="blog-callout callout-success">
  <h3>✨ Killer Features</h3>
  <ul>
    <li><strong>"Show, Don't Tell" Button:</strong> Turns "He was angry" → "He slammed his fist on the table, coffee spilling onto the carpet."</li>
    <li><strong>Character Consistency:</strong> Remembers how each character speaks</li>
    <li><strong>Plot Twist Generator:</strong> Unexpected directions for your story</li>
  </ul>
</div>

**Best For:** Novelists, screenwriters, narrative non-fiction.

---

### 4. Copy.ai Workflows

Best for sales copy that sounds personal. Chain inputs (LinkedIn profile → personalized cold email) for genuine-sounding outreach at scale.

---

### 5. Writesonic (Blog Voice)

Train on your URL. It scrapes your site's tone and generates matching content.

---

## Tool Comparison

| Feature | Claude | Jasper | Sudowrite | Copy.ai |
|:--------|:------:|:------:|:---------:|:-------:|
| Voice Matching | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Long-form | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Speed | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Price | $20/mo | $49+/mo | $29/mo | $36/mo |

---

## How to Train ANY AI to Sound Like You

<div class="blog-callout callout-gradient">
  <h3>🎤 The Voice Cloning Prompt Framework</h3>
  <ol>
    <li><strong>Give it a Persona:</strong> "You are a cynical tech journalist who loves coffee and hates buzzwords."</li>
    <li><strong>Provide a Sample:</strong> "Analyze this paragraph's tone, then write about [topic] in the same style."</li>
    <li><strong>Ban the Buzzwords:</strong> "Do NOT use: unleash, unlock, elevate, seamless, tapestry, delve."</li>
    <li><strong>Specify Rhythm:</strong> "Mix short punchy sentences with longer flowing ones."</li>
  </ol>
</div>

---

## Frequently Asked Questions

<div class="space-y-4">
  <details class="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg cursor-pointer">
    <summary class="flex justify-between items-center font-medium text-slate-900 dark:text-slate-100 list-none">
      <span>Which AI writer is best for blog posts?</span>
      <span class="transition group-open:rotate-180">▼</span>
    </summary>
    <p class="text-slate-600 dark:text-slate-300 mt-3">
      <strong>Claude 3.5 Sonnet</strong> for natural prose quality. <strong>Jasper</strong> if you need SEO integration. Both significantly outperform raw ChatGPT for long-form content.
    </p>
  </details>
</div>

---

<div class="blog-callout callout-success">
  <h3>🏆 My Recommendation</h3>
  <p>Start with <strong>Claude</strong> for drafting, use <strong>Jasper</strong> if you need brand consistency, and always do a human editing pass. The best content in 2026 is <em>human + AI</em>, not <em>AI alone</em>.</p>
</div>

---

*Last updated: January 2026*
`
  }
]

async function main() {
  console.log('Starting blog enhancement update (Part 2)...')
  console.log('Updating ' + enhancedBlogs.length + ' blog posts...\n')

  for (const blog of enhancedBlogs) {
    try {
      const result = await prisma.blogPost.update({
        where: { slug: blog.slug },
        data: {
          title: blog.title,
          metaTitle: blog.metaTitle,
          metaDescription: blog.metaDescription,
          focusKeyword: blog.focusKeyword,
          excerpt: blog.excerpt,
          content: blog.content
        }
      })
      console.log('✅ Updated: ' + result.title)
    } catch (error: any) {
      console.error('❌ Failed to update ' + blog.slug + ':', error.message)
    }
  }

  console.log('\nPart 2 complete!')
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

