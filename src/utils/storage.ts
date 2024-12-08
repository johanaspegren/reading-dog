import { TextData, User, ReadingResult } from '../types';

const DB_NAME = 'reading-assistant';
const DB_VERSION = 2;
const STORES = {
  TEXTS: 'texts',
  USERS: 'users',
  RESULTS: 'reading-results'
};

export class StorageManager {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(STORES.TEXTS)) {
          db.createObjectStore(STORES.TEXTS, { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains(STORES.USERS)) {
          db.createObjectStore(STORES.USERS, { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains(STORES.RESULTS)) {
          db.createObjectStore(STORES.RESULTS, { keyPath: 'id' });
        }
      };
    });
  }

  private async getStore(storeName: string, mode: IDBTransactionMode = 'readonly') {
    if (!this.db) await this.init();
    const transaction = this.db!.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // Text methods
  async saveText(text: TextData): Promise<void> {
    const store = await this.getStore(STORES.TEXTS, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(text);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAllTexts(): Promise<TextData[]> {
    const store = await this.getStore(STORES.TEXTS);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async deleteText(id: number): Promise<void> {
    const store = await this.getStore(STORES.TEXTS, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  // User methods
  async saveUser(user: User): Promise<void> {
    const store = await this.getStore(STORES.USERS, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(user);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAllUsers(): Promise<User[]> {
    const store = await this.getStore(STORES.USERS);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async deleteUser(id: number): Promise<void> {
    const store = await this.getStore(STORES.USERS, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  // Reading results methods
  async saveReadingResult(result: ReadingResult): Promise<void> {
    const store = await this.getStore(STORES.RESULTS, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(result);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getUserResults(userId: number): Promise<ReadingResult[]> {
    const store = await this.getStore(STORES.RESULTS);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const results = request.result as ReadingResult[];
        resolve(results.filter(result => result.userId === userId));
      };
    });
  }
}

export const storageManager = new StorageManager();