'use client'

import { useEffect } from 'react'
import { initPerformanceMonitoring } from '@/lib/performance-monitoring'

export function AnalyticsProvider() {
    useEffect(() => {
        initPerformanceMonitoring()
    }, [])

    return null
}
