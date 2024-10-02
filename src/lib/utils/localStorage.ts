interface CachedData<T> {
    value: T;
    timestamp: number;
}

const EXPIRATION_TIME_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds

//? Set The Data - Local Storage
export const setItemWithExpiration = <T>(key: string, value: T): void => {
    if (typeof window !== 'undefined') {
        const data: CachedData<T> = {
            value,
            timestamp: Date.now(),
        };
        localStorage.setItem(key, JSON.stringify(data));
    }
};

//? Get The Data - Local Storage
export const getItemWithExpiration = <T>(key: string): T | null => {
    if (typeof window === 'undefined') {
        return null;
    }
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { value, timestamp } = JSON.parse(item) as CachedData<T>;
    if (Date.now() - timestamp > EXPIRATION_TIME_MS) {
        localStorage.removeItem(key); // Remove expired item
        return null;
    }
    
    return value;
};
