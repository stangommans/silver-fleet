/**
 * Storage Manager for Silver Fleet
 * Handles client-side persistence via localStorage with SSR safety.
 */

const KEYS = {
  TRANSACTIONS: "sf_transactions",
  TICKER_ALIASES: "sf_ticker_aliases",
  PRIVACY_MODE: "sf_privacy_mode",
  MIGRATED: "sf_migrated_from_server",
};

export const StorageManager = {
  /**
   * Safely reads from localStorage
   */
  getItem: <T>(key: keyof typeof KEYS, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = window.localStorage.getItem(KEYS[key]);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from storage [${key}]:`, error);
      return defaultValue;
    }
  },

  /**
   * Safely writes to localStorage
   */
  setItem: <T>(key: keyof typeof KEYS, value: T): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(KEYS[key], JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to storage [${key}]:`, error);
    }
  },

  /**
   * Clears all local storage data
   */
  clearAll: (): void => {
    if (typeof window === "undefined") return;
    Object.values(KEYS).forEach((key) => window.localStorage.removeItem(key));
  },
};
