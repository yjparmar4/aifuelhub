'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, List } from 'lucide-react'

interface Heading {
    level: number
    text: string
    id: string
}

interface TableOfContentsProps {
    content: string
    className?: string
}

/**
 * Extract headings from markdown content
 */
function extractHeadings(content: string): Heading[] {
    const headingRegex = /^(#{2,4})\s+(.+)$/gm
    const headings: Heading[] = []

    let match
    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length
        // Clean up the text - remove markdown formatting
        const text = match[2]
            .replace(/[*_`#]/g, '') // Remove bold, italic, code markers
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
            .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Remove emojis
            .trim()

        // Create URL-friendly ID
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')

        if (text.length > 0) {
            headings.push({ level, text, id })
        }
    }

    return headings
}

export function TableOfContents({ content, className = '' }: TableOfContentsProps) {
    const [isExpanded, setIsExpanded] = useState(true)
    const [activeId, setActiveId] = useState<string>('')

    const headings = useMemo(() => extractHeadings(content), [content])

    // Track active heading based on scroll position
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: '-80px 0px -80% 0px',
                threshold: 0.1
            }
        )

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [headings])

    if (headings.length < 3) {
        return null // Don't show ToC for short content
    }

    return (
        <nav
            className={`toc-container bg-gradient-to-br from-slate-50/80 via-white to-indigo-50/50 rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden ${className}`}
            aria-label="Table of Contents"
        >
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                        <List className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900 text-left">Table of Contents</h2>
                        <p className="text-xs text-slate-500">{headings.length} sections</p>
                    </div>
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
            </button>

            {/* Content */}
            {isExpanded && (
                <div className="px-4 pb-4">
                    <ol className="space-y-1.5">
                        {headings.map((heading, index) => {
                            const isActive = activeId === heading.id
                            const indentClass = heading.level === 2
                                ? ''
                                : heading.level === 3
                                    ? 'ml-4'
                                    : 'ml-8'

                            return (
                                <li
                                    key={index}
                                    className={`${indentClass}`}
                                >
                                    <a
                                        href={`#${heading.id}`}
                                        className={`
                      block py-1.5 px-3 rounded-lg text-sm transition-all duration-200
                      ${isActive
                                                ? 'bg-indigo-100 text-indigo-700 font-medium border-l-2 border-indigo-500'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                            }
                    `}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            const element = document.getElementById(heading.id)
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                                setActiveId(heading.id)
                                            }
                                        }}
                                    >
                                        {heading.level === 2 && (
                                            <span className="mr-2 text-indigo-400">{index + 1}.</span>
                                        )}
                                        {heading.text}
                                    </a>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            )}
        </nav>
    )
}

export default TableOfContents
