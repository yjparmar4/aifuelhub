'use client'

import { useState } from 'react'
import { Category } from '@/types'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle2, Plus, X, Rocket, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function ToolSubmissionForm({ categories }: { categories: Category[] }) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longDescription: '',
    websiteUrl: '',
    pricingType: 'Free' as 'Free' | 'Freemium' | 'Paid',
    startingPrice: '',
    categoryName: '',
    features: [] as string[],
    submittedBy: '',
    submitterEmail: '',
  })
  const [newFeature, setNewFeature] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleFeatureAdd = () => {
    if (newFeature.trim() && formData.features.length < 10) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature('')
    }
  }

  const handleFeatureRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToTerms) {
      toast.error('Please agree to the terms before submitting')
      return
    }

    if (formData.features.length < 1) {
      toast.error('Please add at least one feature')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/submit-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          features: formData.features,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed')
      }

      setSubmitted(true)
      toast.success('Tool submitted successfully!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto max-w-xl px-4 py-24">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Submitted Successfully!</h1>
            <p className="text-slate-600 mb-8">
              Thank you for submitting your tool. Our team will review it within 24-48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({
                    name: '',
                    description: '',
                    longDescription: '',
                    websiteUrl: '',
                    pricingType: 'Free',
                    startingPrice: '',
                    categoryName: '',
                    features: [],
                    submittedBy: '',
                    submitterEmail: '',
                  })
                  setAgreedToTerms(false)
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Submit Another Tool
              </Button>
              <Link href="/">
                <Button variant="outline" className="border-slate-200">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-200">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Submit Your AI Tool</h1>
              <p className="text-sm text-slate-500">Get discovered by thousands of users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Basic Info Section */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-900 pb-2 border-b border-slate-100">
              Basic Information
            </h2>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Tool Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="e.g., ChatGPT, Midjourney"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Short Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Briefly describe what your tool does (2-3 sentences)"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
                maxLength={300}
                className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
              />
              <p className="text-xs text-slate-400 mt-1 text-right">
                {formData.description.length}/300
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Website URL <span className="text-red-500">*</span>
              </label>
              <Input
                type="url"
                placeholder="https://your-tool.com"
                value={formData.websiteUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                required
                className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Category & Pricing Section */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-900 pb-2 border-b border-slate-100">
              Category & Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.categoryName}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, categoryName: value }))}
                  required
                >
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Pricing <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.pricingType}
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, pricingType: value }))}
                  required
                >
                  <SelectTrigger className="border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Freemium">Freemium</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.pricingType !== 'Free' && (
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Starting Price
                </label>
                <Input
                  type="text"
                  placeholder="e.g., $10/month"
                  value={formData.startingPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, startingPrice: e.target.value }))}
                  className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-900 pb-2 border-b border-slate-100">
              Key Features <span className="text-red-500">*</span>
            </h2>

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a feature..."
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleFeatureAdd()
                  }
                }}
                className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleFeatureAdd}
                className="border-slate-200 hover:bg-purple-50 hover:border-purple-200"
                disabled={formData.features.length >= 10}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, idx) => (
                  <Badge
                    key={idx}
                    className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-0 gap-1 py-1.5 px-3"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleFeatureRemove(idx)}
                      className="ml-1 hover:text-purple-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <p className="text-xs text-slate-400">
              Add 1-10 features. Press Enter or click + to add.
            </p>
          </div>

          {/* Detailed Description */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-900 pb-2 border-b border-slate-100">
              Detailed Description <span className="text-slate-400 font-normal">(Optional)</span>
            </h2>

            <Textarea
              placeholder="Provide a comprehensive overview of your tool..."
              value={formData.longDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
              rows={6}
              maxLength={5000}
              className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          {/* Contact Section */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-900 pb-2 border-b border-slate-100">
              Contact Information <span className="text-slate-400 font-normal">(Optional)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Your Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.submittedBy}
                  onChange={(e) => setFormData(prev => ({ ...prev, submittedBy: e.target.value }))}
                  className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.submitterEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, submitterEmail: e.target.value }))}
                  className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Terms & Submit */}
          <div className="bg-slate-50 rounded-xl p-6 space-y-5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-slate-600">
                I confirm that this tool is legitimate and functional. I have the authority to submit it and agree to the terms of service.
              </span>
            </label>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              disabled={loading || !agreedToTerms}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4 mr-2" />
                  Submit Tool for Review
                </>
              )}
            </Button>

            <p className="text-xs text-slate-400 text-center">
              Tools are reviewed within 24-48 hours. We reserve the right to reject submissions that don't meet our standards.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
