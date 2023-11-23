import * as Redis from 'redis';

export class RedisClientSingleton {
  private static instance: RedisClientSingleton;
  private redisClient: Redis.RedisClientType;

  constructor() {
    this.redisClient = Redis.createClient();
  }

  public static getInstance(): RedisClientSingleton {
    if (!RedisClientSingleton.instance) {
      RedisClientSingleton.instance = new RedisClientSingleton();
      this.instance.redisClient.connect();
    }

    return RedisClientSingleton.instance;
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw error;
    }
  }

  public async set<T extends string | Buffer | number>(
    key: string,
    value: T,
  ): Promise<void> {
    try {
      const parsedValue = JSON.stringify(value);
      await this.redisClient.set(key, parsedValue);
    } catch (error) {
      throw error;
    }
  }
}
