export class StorageService {
  private storage: Storage;

  constructor(storageType: "localStorage" | "sessionStorage" = "localStorage") {
    this.storage = window[storageType];
  }

  private checkStorageAvailability(): void {
    if (!this.isStorageAvailable()) {
      throw new Error("LocalStorage is not available.");
    }
  }

  private isStorageAvailable(): boolean {
    try {
      const testKey = "__test__";
      this.storage.setItem(testKey, testKey);
      this.storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  getItem(key: string): any {
    this.checkStorageAvailability();
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    this.checkStorageAvailability();
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      throw new Error("Error storing data in localStorage.");
    }
  }

  removeItem(key: string): void {
    this.checkStorageAvailability();
    this.storage.removeItem(key);
  }

  clear(): void {
    this.checkStorageAvailability();
    this.storage.clear();
  }
}

export const localStorageService = new StorageService();
