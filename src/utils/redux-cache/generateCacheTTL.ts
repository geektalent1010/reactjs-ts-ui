import { DEFAULT_DURATION_MS } from './constants';

/**
 * Generates a unix timestamp in milliseconds
 *
 * @param {number} [duration=DEFAULT_DURATION_MS]
 * @returns {number}
 */
export const generateCacheTTL = (duration: number = DEFAULT_DURATION_MS): number => {
    return Date.now() + duration;
};

export default generateCacheTTL;
