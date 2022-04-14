import { Module } from '@nestjs/common';
import { databaseProviders } from './database.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [...databaseProviders, ConfigModule],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
