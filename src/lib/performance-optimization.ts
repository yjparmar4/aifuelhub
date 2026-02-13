/**
 * Performance Optimization Utilities
 * 
 * Helper functions to improve application performance including:
 * - Debouncing and Throttling for event handlers
 * - Image optimization helpers
 * - Lazy loading utilities
 */

/**
 * Debounce function to limit the rate at which a function can fire.
 * Useful for search inputs, window resize events, etc.
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout | null = null;

    return function (this: any, ...args: Parameters<T>) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    } as T;
}

/**
 * Throttle function to ensure a function is called at most once in a specified time period.
 * Useful for scroll events, continuous interactions.
 */
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
    let inThrottle: boolean;

    return function (this: any, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    } as T;
}

/**
 * Generate a low-quality placeholder for images (blur effect)
 * This is a helper if you are manually handling image loading
 */
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

export const toBase64 = (str: string) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str)

/**
 * Check if the device is low-end to disable heavy animations
 */
export function isLowEndDevice(): boolean {
    if (typeof navigator === 'undefined') return false;

    // Check for hardware concurrency (fewer cores = likely slower)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true;

    // Check for sensitive connection (save data mode)
    // @ts-ignore
    if (navigator.connection && (navigator.connection.saveData === true || navigator.connection.effectiveType === '2g' || navigator.connection.effectiveType === '3g')) {
        return true;
    }

    return false;
}
