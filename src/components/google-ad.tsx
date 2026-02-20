'use client';

import { useEffect, useRef } from 'react';

interface GoogleAdProps {
    slot: string; // The ad slot ID from AdSense
    style?: React.CSSProperties;
    format?: 'auto' | 'fluid' | 'rectangle';
    layoutKey?: string; // For specialized ad units (e.g., in-feed)
    className?: string; // For custom styling container
}

export function GoogleAd({ slot, style, format = 'auto', layoutKey, className }: GoogleAdProps) {
    const adRef = useRef<HTMLModElement>(null);
    const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-0000000000000000';

    useEffect(() => {
        // Only attempt to push the ad if the element is empty to prevent duplication on re-renders
        if (adRef.current && adRef.current.innerHTML === '') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error('AdSense error:', err);
            }
        }
    }, []);



    return (
        <div className={className}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', ...style }}
                data-ad-client={adSenseId}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
                data-ad-layout-key={layoutKey}
                ref={adRef}
            />
        </div>
    );
}

// Add type definition for global window object
declare global {
    interface Window {
        adsbygoogle: any[];
    }
}
