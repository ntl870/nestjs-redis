import { Injectable } from '@nestjs/common';
import * as Redis from 'redis';

@Injectable()
export class InjectableRedis {
  private redisClient: Redis.RedisClientType;

  constructor() {
    this.redisClient = Redis.createClient();
    this.redisClient.connect();
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw error;
    }
  }

  public async set<T>(key: string, value: T): Promise<void> {
    try {
      const parsedValue = JSON.stringify(value);
      await this.redisClient.set(key, parsedValue);
    } catch (error) {
      throw error;
    }
  }
}
