import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { EnvConfiggitService } from './add/shared/infrastructure/env-configgit/env-configgit.service';

@Module({
  imports: [EnvConfigModule],
  controllers: [AppController],
  providers: [AppService, EnvConfiggitService],
})
export class AppModule {}
