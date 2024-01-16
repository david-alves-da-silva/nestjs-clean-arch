import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module'
import { EnvConfiggitService } from './users/infrastructure/env-configgit/env-configgit.service'
import { UsersModule } from './users/infrastructure/users.module'

@Module({
  imports: [EnvConfigModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, EnvConfiggitService],
})
export class AppModule {}
