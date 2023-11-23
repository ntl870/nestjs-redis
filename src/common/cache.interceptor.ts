import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisClientSingleton } from './redis';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private redisClient: RedisClientSingleton;

  constructor() {
    this.redisClient = RedisClientSingleton.getInstance();
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpAdapter = context.switchToHttp();
    const request: Request = httpAdapter.getRequest();

    const cacheKey = this.createCacheKey(request);

    const cachedResponse = await this.redisClient.get(cacheKey);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle().pipe(
      tap(async (data) => {
        await this.redisClient.set(cacheKey, JSON.stringify(data));
      }),
    );
  }

  private createCacheKey(request: Request): string {
    return `${request.method}_${request.url}`;
  }
}
