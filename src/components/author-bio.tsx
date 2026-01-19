'use client'

import { Author } from '@/lib/authors'
import { Twitter, Linkedin, Github, Globe, Award, Briefcase } from 'lucide-react'
import Image from 'next/image'

interface AuthorBioProps {
    author: Author
    showFull?: boolean
}

export function AuthorBio({ author, showFull = false }: AuthorBioProps) {
    return (
        <div className="my-12 p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-950/30 rounded-2xl border-2 border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-6">
                {/* Author Image */}
                <div className="shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                </div>

                {/* Author Info */}
                <div className="flex-1">
                    <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {author.name}
                        </h3>

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {author.expertise.slice(0, 3).map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        {author.bio}
                    </p>

                    {/* Credentials */}
                    {author.credentials && author.credentials.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-3">
                            {author.credentials.map((credential, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                    <Award className="w-4 h-4 text-amber-500" />
                                    <span>{credential}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Experience */}
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                        <Briefcase className="w-4 h-4 text-purple-500" />
                        <span>{author.yearsOfExperience}+ years of experience</span>
                    </div>

                    {/* Social Links */}
                    {author.socialLinks && (
                        <div className="flex items-center gap-3">
                            {author.socialLinks.twitter && (
                                <a
                                    href={author.socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-4 h-4 text-blue-500" />
                                </a>
                            )}
                            {author.socialLinks.linkedin && (
                                <a
                                    href={author.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-4 h-4 text-blue-600" />
                                </a>
                            )}
                            {author.socialLinks.github && (
                                <a
                                    href={author.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-colors"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                </a>
                            )}
                            {author.socialLinks.website && (
                                <a
                                    href={author.socialLinks.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                                    aria-label="Website"
                                >
                                    <Globe className="w-4 h-4 text-purple-600" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Schema.org Person markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name: author.name,
                        description: author.bio,
                        jobTitle: author.expertise[0],
                        ...(author.credentials && {
                            alumniOf: author.credentials.filter(c => c.includes('PhD') || c.includes('MS')),
                        }),
                        ...(author.socialLinks && {
                            sameAs: Object.values(author.socialLinks).filter(Boolean),
                        }),
                    }),
                }}
            />
        </div>
    )
}

/**
 * Compact author byline for article headers
 */
export function AuthorByline({ author }: { author: Author }) {
    return (
        <div className="flex items-center gap-3" itemScope itemType="https://schema.org/Person">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                {author.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100" itemProp="name">
                    {author.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400" itemProp="jobTitle">
                    {author.expertise[0]}
                </div>
            </div>
        </div>
    )
}
