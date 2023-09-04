import REDIS from './redisCache';

const CACHE_CONFIG = {
  students: {
    key: 'students',
    TTL: 60 * 60 * 24 * 7, // 1 week
    enabled: true
  },
  billing: {
    key: 'billing',
    TTL: 60 * 60 * 24 * 7, // 1 week
    enabled: true
  }
}

const getCacheKey = (serviceType: keyof typeof CACHE_CONFIG, uniqueValue: string) => {
  const configKey = CACHE_CONFIG[serviceType]?.key;
  return `${configKey}:${uniqueValue}`;
};

const shouldUseCache = (key: keyof typeof CACHE_CONFIG): boolean => {
  return CACHE_CONFIG[key]?.enabled ?? false;
};

const set = async (serviceType: keyof typeof CACHE_CONFIG, uniqueValue: string, value: any) => {
  const key = getCacheKey(serviceType, uniqueValue);
  if (shouldUseCache(serviceType)) {
    await REDIS.set(key, value);
    console.debug(`🤖 Data stored in cache for key: ${key}`);
  }
};

const get = async <T>(serviceType: keyof typeof CACHE_CONFIG, uniqueValue: string): Promise<T | null> => {
  const key = getCacheKey(serviceType, uniqueValue);
  if (shouldUseCache(serviceType)) {
    try {
      const cachedData = await REDIS.get(key);
      if (cachedData) {
        console.debug(`🎉 Cache HIT for key: ${key}`);
        return cachedData as T;
      }
      console.debug(`❌ Cache MISS for key: ${key}`);
    } catch (error) {
      console.error(`🔥 Error retrieving from cache for key ${key}:`, error);
    }
  }
  return null;
};

const remove = async (key: keyof typeof CACHE_CONFIG) => {
  if (shouldUseCache(key)) {
    await REDIS.del(key);
    console.debug(`Data deleted from cache for key: ${key}`);
  }
};

const flush = async () => {
  await REDIS.flushAll();
  console.log('Cleared all cache');
};

const CacheConfig = {
  set,
  get,
  remove,
  flush,
  getCacheKey,
  config: CACHE_CONFIG
};

export default CacheConfig;