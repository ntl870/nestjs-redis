import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectableRedis } from './common/injectableRedis';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, InjectableRedis],
})
export class AppModule {}
