import { DataItem } from '.';

export interface PaginationOptions {
  limit?: number;
  skip?: number;
}

export interface RefFieldMeta {
  totalCount: number;
  returnedCount: number;
  hasMore: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  hasNext: boolean;
  currentPage: number;
  pageSize: number;
  nextSkip: number | null;
}

// Stub CRUD service — replace with your own API/backend calls as needed
export class BaseCrudService {
  static async create<T extends DataItem>(
    _collectionId: string,
    itemData: Partial<T>
  ): Promise<T> {
    return { ...itemData, _id: crypto.randomUUID() } as T;
  }

  static async getAll<T extends DataItem>(
    _collectionId: string,
    _includeRefs?: unknown,
    pagination?: PaginationOptions
  ): Promise<PaginatedResult<T>> {
    return {
      items: [],
      totalCount: 0,
      hasNext: false,
      currentPage: 0,
      pageSize: pagination?.limit ?? 50,
      nextSkip: null,
    };
  }

  static async getById<T extends DataItem>(
    _collectionId: string,
    _itemId: string
  ): Promise<T | null> {
    return null;
  }

  static async update<T extends DataItem>(
    _collectionId: string,
    itemData: T
  ): Promise<T> {
    return itemData;
  }

  static async delete<T extends DataItem>(
    _collectionId: string,
    _itemId: string
  ): Promise<T> {
    return {} as T;
  }

  static async addReferences(
    _collectionId: string,
    _itemId: string,
    _references: Record<string, string[]>
  ): Promise<void> {}

  static async removeReferences(
    _collectionId: string,
    _itemId: string,
    _references: Record<string, string[]>
  ): Promise<void> {}
}
