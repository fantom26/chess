export class StorageService {
  private storage: Storage | null;

  constructor(storageType: "localStorage" | "sessionStorage" = "localStorage") {
    this.storage = typeof window !== "undefined" ? window[storageType] : null;
  }

  private withStorage(action: (storage: Storage) => any): any {
    if (!this.storage) {
      throw new Error("LocalStorage is not available.");
    }
    return action(this.storage);
  }

  getItem(key: string): any {
    return this.withStorage((storage) => {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : null;
    });
  }

  setItem(key: string, value: any): void {
    this.withStorage((storage) => {
      try {
        storage.setItem(key, JSON.stringify(value));
      } catch (e) {
        throw new Error("Error storing data in localStorage.");
      }
    });
  }

  removeItem(key: string): void {
    this.withStorage((storage) => {
      try {
        storage.removeItem(key);
      } catch (e) {
        throw new Error("Error removing data in localStorage.");
      }
    });
  }

  clear(): void {
    this.withStorage((storage) => {
      try {
        storage.clear();
      } catch (e) {
        throw new Error("Error clearing all data in localStorage.");
      }
    });
  }
}

export const localStorageService = new StorageService();
