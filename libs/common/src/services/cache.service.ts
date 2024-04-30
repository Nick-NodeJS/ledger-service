import { Cache, StoreConfig } from 'cache-manager';

import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  public async getOrLoad<T>(
    key: string,
    load: () => Promise<T>,
    options?: StoreConfig,
  ): Promise<T> {
    const cached = await this.cache.get<T>(key);
    if (cached != null) {
      return cached;
    }

    const loaded = await load();
    if (loaded !== undefined) {
      await this.setValue(key, loaded, options);
    }

    return loaded;
  }

  public get<T>(key: string): Promise<T> {
    return this.cache.get<T>(key);
  }

  public async set<T>(key: string, value: T, options?: StoreConfig): Promise<void> {
    return this.setValue(key, value, options);
  }

  private async setValue<T>(key: string, value: T, options?: StoreConfig): Promise<void> {
    if (options?.ttl) {
      return this.cache.set(key, value, options.ttl);
    }
    return this.cache.set(key, value);
  }
}
