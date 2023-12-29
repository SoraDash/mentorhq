import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

let connectionRetries = 0;

const MAX_RETRIES = 3;

redis.on('connect', () => {});

redis.on('error', (error) => {
  console.error('❌ Redis connection error:', error);
});

redis.on('reconnecting', () => {
  connectionRetries += 1;

  if (connectionRetries > MAX_RETRIES) {
    console.error('❌ Max retries reached, closing Redis.');
    redis.quit();
  }
});

const set = async (key: string, value: any, ttl: number = 0) => {
  const serializedValue = JSON.stringify(value);

  if (ttl > 0) {
    // Set key with expiration
    await redis.set(key, serializedValue, 'EX', ttl);
  } else {
    // Set key without expiration
    await redis.set(key, serializedValue);
  }
};

const get = async (key: string) => {
  const value = await redis.get(key);

  return value ? JSON.parse(value) : null;
};

const del = async (key: string) => {
  await redis.del(key);
};

const flushAll = async () => {
  await redis.flushall();
};

const REDIS = {
  set,
  get,
  del,
  flushAll,
};

export default REDIS;
