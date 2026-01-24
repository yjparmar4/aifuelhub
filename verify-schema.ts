
// Mock extractor functions to test LOGIC only (Regex)
// This avoids build/alias issues

function extractHowToSteps(content: string) {
    const steps: any[] = []
    const stepPattern = /(?:###?\s*)?(?:Step\s*)?(\d+)[:.]\s*([^\n]+)\n+([\s\S]*?)(?=(?:###?\s*)?(?:Step\s*)?\d+[:.]\s*|##[^#]|$)/gi

    let match
    while ((match = stepPattern.exec(content)) !== null) {
        const name = match[2].trim().replace(/\*\*/g, '')
        let text = match[3].trim()
            .replace(/\*\*/g, '')
            .split('\n\n')[0]
            .trim()

        if (name && text && name.length > 5 && text.length > 20) {
            steps.push({ name, text })
        }
    }
    return steps.slice(0, 15)
}

function extractClaimsFromContent(content: string) {
    const claims: any[] = []
    const claimPattern = /(?:###|\*\*)\s*Claim:?\s*([^\n]+)(?:###|\*\*|:)\s*\n+[\s\S]*?(?:###|\*\*)\s*Verdict:?\s*(True|False|Misleading)(?:###|\*\*|:)?/gi

    let match
    while ((match = claimPattern.exec(content)) !== null) {
        const claim = match[1].trim().replace(/^\*+|\*+$/g, '')
        const verdictStr = match[2].trim()
        let verdict = 'True'

        if (/false/i.test(verdictStr)) verdict = 'False'
        else if (/misleading/i.test(verdictStr)) verdict = 'Misleading'

        if (claim && claim.length > 10) {
            claims.push({ claim, verdict })
        }
    }
    return claims.slice(0, 5)
}

function extractFAQsFromContent(content: string) {
    // Simplified version of FAQ extractor for verification
    const faqs: any[] = []
    const match = content.match(/##\s*(FAQ|Frequently Asked Questions|Common Questions)[^\n]*\n([\s\S]*?)(?=##[^#]|$)/i)
    if (match) {
        const faqContent = match[2]
        const questionPattern = /###\s*([^\n?]+\??)\s*\n+([\s\S]*?)(?=###|\n##[^#]|$)/gi
        let m
        while ((m = questionPattern.exec(faqContent)) !== null) {
            faqs.push({ question: m[1], answer: m[2] })
        }
    }
    return faqs
}

const mockContent = `
# Top 7 AI CRM Software for Enterprise Sales Teams (2026 Review)

**Last Updated: January 2026**

**Quick Answer:** For most enterprise teams, **Salesforce Einstein** remains the leader in predictive analytics and customization. However, **HubSpot AI** offers the best user experience and fastest implementation. **Zoho CRM** is the top choice for value-driven organizations requiring deep AI features without the enterprise price tag.

---

## Why AI is Non-Negotiable for CRM in 2026

The days of manual data entry are over. If your CRM isn't predicting your next deal, drafting your emails, and updating itself, it's not a tool—it's a burden.

**Fact Check:**
### Claim: AI CRMs replace human sales agents
Verdict: False
AI CRMs automate administrative tasks (data entry, lead scoring) and augment human decision-making. They replace *tasks*, not *relationships*. The most successful teams use AI to free up humans to sell more, not to remove them.

![AI CRM Ecosystem visualization - connecting sales data and insights](/blog/images/ai-crm-visualization.png)

---

## 1. Salesforce Einstein GPT (Best Overall for Enterprise)

... content ...

---

## How to Choose the Right AI CRM

### Step 1: Audit Your Data Maturity
AI is only as good as the data it eats. If your data is messy, fix that first. Tools like HubSpot are better at self-cleaning if your data is "average."

### Step 2: Define "Must-Have" AI Features
Do you need *Generative AI* (writing emails) or *Predictive AI* (forecasting revenue)? Salesforce is king of Predictive; HubSpot wins at Generative.

### Step 3: Test the "Co-Pilot" Experience
Don't just buy features; buy workflows. Does the AI interrupt you, or does it help you? Start a trial and ask the AI to summarize a call. If it fails, walk away.
`;

console.log('--- Testing HowTo Extraction ---');
const steps = extractHowToSteps(mockContent);
console.log('Steps found:', steps.length);
steps.forEach((s, i) => console.log(\`Step \${i+1}: \${s.name} - \${s.text.substring(0, 20)}...\`));

console.log('\n--- Testing Claim Extraction ---');
const claims = extractClaimsFromContent(mockContent);
console.log('Claims found:', claims.length);
claims.forEach((c, i) => console.log(\`Claim \${i+1}: \${c.claim} -> \${c.verdict}\`));

if (steps.length >= 1 && claims.length >= 1) {
    console.log('\n✅ VERIFICATION SUCCESSFUL');
} else {
    console.log('\n❌ VERIFICATION FAILED');
    console.log('Expect Steps and Claims to be found');
}
