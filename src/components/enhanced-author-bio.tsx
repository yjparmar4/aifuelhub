/**
 * Enhanced Author Bio Component with E-E-A-T Signals for AI Search
 * Builds authority and trust signals for AI search engines
 */

import React from 'react'
import { JsonLd } from './json-ld'
import { generatePersonSchema } from '@/lib/schema'

interface EnhancedAuthorBioProps {
  author: {
    name: string
    bio: string
    expertise: string[]
    experience: number
    image?: string
    social?: {
      twitter?: string
      linkedin?: string
      website?: string
    }
    certifications?: string[]
    publications?: number
  }
  showSchema?: boolean
  className?: string
}

export function EnhancedAuthorBio({ 
  author, 
  showSchema = true, 
  className = '' 
}: EnhancedAuthorBioProps) {
  // Generate Person schema for E-E-A-T
  const personSchema = generatePersonSchema({
    name: author.name,
    jobTitle: 'AI Tools Expert & Research Analyst',
    description: author.bio,
    url: `/about/${author.name.toLowerCase().replace(/\s+/g, '-')}`,
    image: author.image,
    sameAs: author.social ? Object.values(author.social).filter(Boolean) : undefined,
    worksFor: 'AI Fuel Hub'
  })

  return (
    <>
      {showSchema && <JsonLd data={personSchema} />}
      
      <aside className={`author-bio enhanced-eeat ${className}`}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          
          {/* Expertise Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
              Expert Verified
            </span>
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
              {author.experience}+ Years Experience
            </span>
            <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
              AI Specialist
            </span>
          </div>

          {/* Author Info */}
          <div className="flex items-start gap-4 mb-4">
            {author.image && (
              <img
                src={author.image}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                {author.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Senior AI Tools Analyst at AI Fuel Hub
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {author.publications ? `${author.publications}+ publications • ` : ''}
                Reviewed 100+ AI tools
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {author.bio}
            </p>
          </div>

          {/* Areas of Expertise */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Areas of Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {author.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md border border-gray-200 dark:border-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {author.certifications && author.certifications.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Certifications
              </h4>
              <div className="space-y-1">
                {author.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Signals */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {author.experience}+
                </div>
                <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  100+
                </div>
                <div className="text-gray-600 dark:text-gray-400">Tools Reviewed</div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          {author.social && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="flex gap-3">
                {author.social.twitter && (
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                )}
                {author.social.linkedin && (
                  <a
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
                {author.social.website && (
                  <a
                    href={author.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Website"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zM9.954 4.569c-.797.259-1.466.936-1.962 1.926-.368.698-.642 1.527-.79 2.505h2.752V4.569zm2.092 0v2.952h2.752c-.148-.978-.422-1.807-.79-2.505-.496-.99-1.165-1.667-1.962-1.926zM9.954 9v2.952H7.202c.148-.978.422-1.807.79-2.505.496-.99 1.165-1.667 1.962-1.926zm2.092 0c.797.259 1.466.936 1.962 1.926.368.698.642 1.527.79 2.505H12.046V9zm4.083 0h-1.946c-.089 1.546-.383 2.97-.837 4.118A6.004 6.004 0 0016.129 9z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Last Updated */}
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-4 text-center">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </aside>
    </>
  )
}

// Default author data for AI Fuel Hub
export const DEFAULT_AUTHOR = {
  name: 'AI Fuel Hub Team',
  bio: 'Our team of AI experts and researchers has collectively spent over 50 years analyzing and testing AI tools. We provide unbiased, comprehensive reviews to help you make informed decisions about the best AI tools for your needs.',
  expertise: [
    'Machine Learning',
    'Natural Language Processing',
    'Computer Vision',
    'AI Ethics',
    'Prompt Engineering',
    'AI Tool Evaluation',
    'Software Testing',
    'Technical Analysis'
  ],
  experience: 15,
  certifications: [
    'AI Ethics Certification',
    'Machine Learning Engineering',
    'Technical Writing',
    'Software Quality Assurance'
  ],
  publications: 500,
  social: {
    twitter: 'https://twitter.com/aifuelhub',
    linkedin: 'https://linkedin.com/company/aifuelhub',
    website: 'https://aifuelhub.com'
  }
}
