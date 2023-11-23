import { Injectable } from '@nestjs/common';
import { InjectableRedis } from './common/injectableRedis';

@Injectable()
export class AppService {
  constructor(private readonly redisClient: InjectableRedis) {}

  getHello(): string {
    return 'abc';
  }
}
