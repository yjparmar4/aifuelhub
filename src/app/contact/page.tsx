import { PageHeader } from '@/components/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MessageSquare } from 'lucide-react'
import { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

import { JsonLd } from '@/components/json-ld'
import { generateContactPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
    title: 'Contact Us | AI Fuel Hub',
    description: 'Get in touch with AI Fuel Hub. We welcome your feedback, suggestions, and inquiries about AI tools and partnerships.',
    alternates: {
        canonical: `${SITE_URL}/contact`,
    },
}

export default function ContactPage() {
    return (
        <div className="min-h-screen pb-20">
            <JsonLd data={generateContactPageSchema()} />
            <PageHeader
                title="Contact Us"
                description="Have questions or suggestions? We'd love to hear from you."
                breadcrumbs={[
                    { name: 'Home', href: '/' },
                    { name: 'Contact', href: '/contact' }
                ]}
            />
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                        <p className="text-slate-600 mb-8">
                            Whether you have a suggestion for a new tool, found a bug, or just want to say hi, fill out the form and we'll get back to you as soon as possible.
                        </p>

                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <Mail className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-lg">General Inquiries</div>
                                        <div className="text-slate-600">hello@aifuelhub.com</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-6 h-6 text-violet-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-lg">Support</div>
                                        <div className="text-slate-600">support@aifuelhub.com</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input type="email" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <Textarea placeholder="How can we help?" className="min-h-[150px]" />
                            </div>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
