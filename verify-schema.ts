
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

