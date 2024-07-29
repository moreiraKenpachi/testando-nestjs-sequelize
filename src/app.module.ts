import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './ormconfig';

@Module({
  imports: [UsersModule, SequelizeModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
