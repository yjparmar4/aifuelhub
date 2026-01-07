'use client'

import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { JsonLd } from '@/components/json-ld'

const faqs = [
  {
    question: "What is ToolAtlas and how does it work?",
    answer: "ToolAtlas is the most comprehensive AI tools directory with 118+ verified and expert-tested AI applications. We provide detailed comparisons, unbiased reviews, and feature analysis to help you find the perfect AI tool for your specific needs. Simply browse by category, search for tools, or use our comparison feature to see tools side-by-side."
  },
  {
    question: "Are the AI tool reviews unbiased?",
    answer: "Yes, absolutely. Our editorial team tests each tool manually and provides honest pros and cons. We don't accept payment for positive reviews. Our rankings are based on real user reviews, feature analysis, pricing, and overall value. We maintain strict editorial independence to ensure you get trustworthy recommendations."
  },
  {
    question: "How often is the AI tools directory updated?",
    answer: "We update our directory daily with new AI tools, updated pricing information, and fresh reviews. Our team continuously monitors the AI landscape to add emerging tools and update existing tool information. We also regularly re-test featured tools to ensure our reviews remain accurate and up-to-date."
  },
  {
    question: "Can I submit my own AI tool to ToolAtlas?",
    answer: "Yes! We welcome submissions from AI tool creators. You can submit your tool through our submission page for review. Our editorial team will evaluate your tool based on features, user experience, pricing, and overall value. Approved tools are added to our directory within 5-7 business days."
  },
  {
    question: "What criteria do you use to rate AI tools?",
    answer: "We evaluate AI tools based on multiple factors: ease of use, feature set, output quality, pricing value, customer support, integration capabilities, and user reviews. Each tool is tested by our team with real-world use cases. We also consider community feedback and adoption rates to provide a comprehensive rating."
  },
  {
    question: "Is ToolAtlas free to use?",
    answer: "Yes, ToolAtlas is completely free to use. You can browse all tools, read reviews, and use our comparison features without any cost. Some tools we list may have affiliate links, but this doesn't affect our reviews or recommendations. We're committed to providing free, unbiased access to AI tool information."
  },
  {
    question: "How do I choose the right AI tool for my needs?",
    answer: "Start by identifying your specific use case (e.g., content writing, image generation, coding). Browse our categories to find tools in that niche. Use our filters to narrow down by pricing and features. Read our detailed reviews and compare tools side-by-side. Consider your budget, technical requirements, and integration needs before making a decision."
  },
  {
    question: "Do you offer enterprise solutions or team plans?",
    answer: "While ToolAtlas itself is a free directory, many of the tools we feature offer enterprise and team plans. We highlight pricing tiers for each tool, including free, freemium, and paid options. Our comparison feature helps you quickly see which tools offer enterprise features like SSO, priority support, and team collaboration."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <JsonLd data={faqSchema} />
      <section className="py-24 bg-gradient-to-b from-white to-purple-50/30 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-blue-100/30 to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold mb-4">
              <HelpCircle className="w-4 h-4" />
              Got Questions?
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about finding and using the best AI tools
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border-2 border-slate-200 hover:border-purple-300 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-lg text-slate-900 pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-purple-600" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-slate-600 mb-4">Still have questions?</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/20"
            >
              Contact Our Team
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
