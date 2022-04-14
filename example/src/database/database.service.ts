import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '@common/enums/config.keys';
import { ConnectionOptions } from 'tls';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: false,
        type: 'postgres' as const,
        host: config.get(Configuration.DB_HOST),
        port: parseInt(config.get(Configuration.DB_PORT)),
        database: config.get(Configuration.DB_DATABASE),
        username: config.get(Configuration.DB_USERNAME),
        password: config.get(Configuration.DB_PASSWORD),
        entities: [
          `${__dirname}/../**/*.entity{.ts,.js}`,
          `${__dirname}/../database/entities/*{.ts,.js}`,
        ],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        subscribers: [__dirname + '/subscribers/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
