import { setItemWithExpiration, getItemWithExpiration } from '@/lib/utils/localStorage';

export const fetchWithCache = async <T>(
    key: string,
    fetchFunction: () => Promise<T>,
): Promise<T> => {
    // Check for cached data
    const cachedData = getItemWithExpiration<T>(key);

    if (cachedData) {
        return cachedData;
    }

    // Fetch fresh data if no cached data
    const freshData = await fetchFunction();

    // Cache the fetched data with expiration
    setItemWithExpiration(key, freshData);

    return freshData;
};
