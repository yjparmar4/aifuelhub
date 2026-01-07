'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Loader2, ArrowLeft, Search, Zap, Info, ArrowRight, Scale, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tool } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { ComparisonTable } from '@/components/comparison-table'
import { Badge } from '@/components/ui/badge'

function CompareContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const toolsParam = searchParams.get('tools')

    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [tool1, setTool1] = useState<string>('')
    const [tool2, setTool2] = useState<string>('')
    const [toolsList, setToolsList] = useState<Tool[]>([])
    const [comparisonTools, setComparisonTools] = useState<Tool[]>([])
    const [loading, setLoading] = useState(false)

    // Fetch list of tools for dropdown
    useEffect(() => {
        async function fetchTools() {
            try {
                const res = await fetch('/api/tools?limit=100')
                const data = await res.json()
                setToolsList(data.tools || [])
            } catch (e) {
                console.error(e)
            }
        }
        fetchTools()
    }, [])

    // Fetch specific tools for comparison if param exists
    useEffect(() => {
        if (toolsParam) {
            const slugs = toolsParam.split(',')
            if (slugs.length >= 2) {
                async function fetchComparisonData() {
                    setLoading(true)
                    try {
                        const toolsRes = await fetch('/api/tools?limit=100')
                        const toolsData = await toolsRes.json()
                        const allTools = toolsData.tools as Tool[]

                        const selected = allTools.filter(t => slugs.includes(t.slug))
                        setComparisonTools(selected)
                        setTool1(slugs[0])
                        setTool2(slugs[1])
                    } catch (e) {
                        console.error(e)
                    } finally {
                        setLoading(false)
                    }
                }
                fetchComparisonData()
            }
        } else {
            setComparisonTools([])
            setTool1('')
            setTool2('')
        }
    }, [toolsParam])

    const handleCompare = () => {
        if (tool1 && tool2) {
            router.push(`/compare?tools=${tool1},${tool2}`)
        }
    }

    const ToolSelector = ({
        value,
        setValue,
        open,
        setOpen,
        placeholder,
        exclude,
        label
    }: {
        value: string,
        setValue: (val: string) => void,
        open: boolean,
        setOpen: (val: boolean) => void,
        placeholder: string,
        exclude?: string,
        label: string
    }) => {
        const selectedTool = toolsList.find(t => t.slug === value)

        return (
            <div className="relative w-full">
                <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                                "w-full h-20 px-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 bg-white",
                                value
                                    ? "border-violet-200 bg-violet-50/30"
                                    : "border-slate-200 hover:border-violet-300 hover:bg-slate-50"
                            )}
                        >
                            {selectedTool ? (
                                <>
                                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                                        {selectedTool.category?.icon ? (
                                            <span className="text-xl">{selectedTool.category.icon}</span>
                                        ) : (
                                            <span className="text-lg font-bold text-violet-600">{selectedTool.name[0]}</span>
                                        )}
                                    </div>
                                    <div className="text-left flex-1 min-w-0">
                                        <div className="font-bold text-slate-900 truncate">{selectedTool.name}</div>
                                        <div className="text-xs text-slate-500 truncate">{selectedTool.category?.name}</div>
                                    </div>
                                    <div className="text-xs font-semibold text-violet-600 px-3 py-1 bg-violet-100 rounded-full">
                                        Change
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                        <Search className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <div className="font-medium text-slate-500">{placeholder}</div>
                                    </div>
                                </>
                            )}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] sm:w-[350px] p-0" align="start">
                        <Command className="bg-white border border-slate-200 shadow-lg rounded-xl">
                            <CommandInput placeholder="Search tools..." className="h-11" />
                            <CommandList>
                                <CommandEmpty>No tool found.</CommandEmpty>
                                <CommandGroup>
                                    {toolsList.filter(t => t.slug !== exclude).map((tool) => (
                                        <CommandItem
                                            key={tool.slug}
                                            value={tool.name}
                                            onSelect={() => {
                                                setValue(tool.slug)
                                                setOpen(false)
                                            }}
                                            className="gap-3 py-3 cursor-pointer"
                                        >
                                            <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">
                                                {tool.name[0]}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium">{tool.name}</div>
                                                <div className="text-xs text-muted-foreground">{tool.category?.name}</div>
                                            </div>
                                            {value === tool.slug && <Check className="w-4 h-4 text-violet-600" />}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
            </div>
        )
    }

    // --- DETAILED COMPARISON VIEW ---
    if (comparisonTools.length >= 2) {
        return (
            <div className="min-h-screen bg-slate-50 pb-20">
                {/* Slim Header */}
                <div className="bg-white border-b border-slate-200">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <Button
                                variant="ghost"
                                className="text-slate-500 hover:text-slate-900 pl-0 hover:bg-transparent"
                                onClick={() => router.push('/compare')}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Selection
                            </Button>

                            <div className="text-center">
                                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3 justify-center">
                                    {comparisonTools[0].name} <span className="text-slate-300 text-lg">vs</span> {comparisonTools[1].name}
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">Detailed Side-by-Side Analysis</p>
                            </div>

                            <Button onClick={() => router.push('/compare')} variant="outline" className="border-slate-200 rounded-xl">
                                New Comparison
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto max-w-7xl px-4 mt-8">
                    <ComparisonTable tools={comparisonTools} features={['Pricing', 'Rating', 'Features', 'Pros', 'Cons', 'Use Cases']} />

                    {/* Tool Detailed Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                        {comparisonTools.map((tool, idx) => (
                            <div key={tool.id} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-700">
                                        {tool.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900">{tool.name}</h3>
                                        <Link href={`/tool/${tool.slug}`} className="text-sm font-medium text-violet-600 hover:underline">
                                            View Full details
                                        </Link>
                                    </div>
                                </div>

                                <p className="text-slate-600 leading-relaxed mb-8">
                                    {tool.description}
                                </p>

                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-amber-500" /> Key Features
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {tool.features && JSON.parse(tool.features).slice(0, 4).map((f: string, i: number) => (
                                            <div key={i} className="flex items-center gap-3 text-sm p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                <div className="w-1.5 h-1.5 bg-violet-400 rounded-full shrink-0" />
                                                <span className="text-slate-700">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <Button className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800" onClick={() => router.push(`/tool/${tool.slug}`)}>
                                        Go to {tool.name}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // --- SELECTION VIEW ---
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 pb-16 pt-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-wider mb-6 border border-violet-100">
                        Compare AI Tools
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Comparison Engine
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Select two AI tools to instantly see how they stack up against each other.
                        Uncover differences in features, pricing, and performance.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-4xl px-4 -mt-10 relative z-10 pb-20">

                {/* Unified Selection Card */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-200">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

                        {/* Selector A */}
                        <ToolSelector
                            label="First Tool"
                            value={tool1}
                            setValue={setTool1}
                            open={open1}
                            setOpen={setOpen1}
                            placeholder="Select tool..."
                            exclude={tool2}
                        />

                        {/* VS Divider */}
                        <div className="flex flex-col items-center justify-center shrink-0 mt-6 md:mt-0">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-sm z-10">
                                <span className="font-black text-xs text-slate-400">VS</span>
                            </div>
                            <div className="hidden md:block w-px h-full bg-slate-100 absolute top-0 bottom-0 left-1/2 -translate-x-1/2 -z-0"></div>
                        </div>

                        {/* Selector B */}
                        <ToolSelector
                            label="Second Tool"
                            value={tool2}
                            setValue={setTool2}
                            open={open2}
                            setOpen={setOpen2}
                            placeholder="Select tool..."
                            exclude={tool1}
                        />
                    </div>

                    {/* Action Button */}
                    <div className="mt-12 text-center">
                        <Button
                            size="lg"
                            disabled={!tool1 || !tool2}
                            onClick={handleCompare}
                            className={cn(
                                "h-14 px-10 rounded-xl text-lg font-bold transition-all duration-300",
                                tool1 && tool2
                                    ? "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/30 w-full md:w-auto"
                                    : "bg-slate-100 text-slate-400 cursor-not-allowed w-full md:w-auto"
                            )}
                        >
                            Compare Tools
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Popular Comparisons Grid */}
                <div className="mt-20">
                    <h3 className="text-slate-900 font-bold text-xl mb-8 flex items-center gap-2">
                        <Scale className="w-5 h-5 text-violet-500" /> Popular Comparisons
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            ['chatgpt', 'claude'],
                            ['jasper', 'copy-ai'],
                            ['midjourney', 'dalle-3'],
                            ['notion-ai', 'obsidian'],
                            ['github-copilot', 'cursor'],
                            ['perplexity', 'you']
                        ].map(([a, b], i) => (
                            <div
                                key={i}
                                onClick={() => router.push(`/compare?tools=${a},${b}`)}
                                className="group cursor-pointer bg-white border border-slate-200 hover:border-violet-300 hover:shadow-md rounded-xl p-4 flex items-center justify-between transition-all duration-200"
                            >
                                <span className="font-semibold text-slate-700 capitalize text-sm">{a.replace(/-/g, ' ')}</span>
                                <div className="text-xs font-bold text-slate-300 bg-slate-50 px-2 py-1 rounded">VS</div>
                                <span className="font-semibold text-slate-700 capitalize text-sm">{b.replace(/-/g, ' ')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ComparePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-400"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
            <CompareContent />
        </Suspense>
    )
}
