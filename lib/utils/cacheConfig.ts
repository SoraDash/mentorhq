import REDIS from './redisCache';

const CACHE_CONFIG = {
  students: {
    key: 'students',
    // Should be 3 hours
    TTL: 60 * 60 * 3, // 3 hours
    enabled: true
  },
  billing: {
    key: 'billing',
    TTL: 60 * 60, // 1 hour
    enabled: true
  },
  events: {
    key: 'events',
    TTL: 60 * 60, // 1 hour
    enabled: true
  },
};

type ServiceType = keyof typeof CACHE_CONFIG;

const getCacheKey = (serviceType: ServiceType, uniqueValue: string) => {
  const configKey = CACHE_CONFIG[serviceType]?.key;
  return `${configKey}:${uniqueValue}`;
};

const shouldUseCache = (key: ServiceType): boolean => {
  return CACHE_CONFIG[key]?.enabled ?? false;
};

const set = async (serviceType: ServiceType, uniqueValue: string, value: any) => {
  const key = getCacheKey(serviceType, uniqueValue);
  if (shouldUseCache(serviceType)) {
    const ttl = CACHE_CONFIG[serviceType].TTL;
    await REDIS.set(key, value, ttl);
    console.info(`📝 Data stored in cache for key: ${key}, with TTL: ${ttl} seconds`);
  }
};

const get = async (serviceType: ServiceType, uniqueValue: string) => {
  const key = getCacheKey(serviceType, uniqueValue);
  if (shouldUseCache(serviceType)) {
    const cachedData = await REDIS.get(key);
    if (cachedData) {
      console.info(`✅ Cache HIT for key: ${key}`);
      return cachedData;
    } else {
      console.info(`❌ Cache MISS for key: ${key}`);
    }
  }
  return null;
};

const remove = async (serviceType: ServiceType, uniqueValue: string) => {
  const key = getCacheKey(serviceType, uniqueValue);
  if (shouldUseCache(serviceType)) {
    await REDIS.del(key);
    console.info(`🗑️ Data deleted from cache for key: ${key}`);
  }
};

const flush = async () => {
  await REDIS.flushAll();
  console.info('🧹 Cleared all cache');
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
