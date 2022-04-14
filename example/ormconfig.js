require('dotenv/config');

const type = process.env.DB_TYPE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = +process.env.DB_PORT;
const database = process.env.DB_DATABASE;

module.exports = {
  type,
  username,
  password,
  host,
  port,
  database,
  entities: ['src/**/**/*.entity{.ts,.js}', 'src/database/entities/*{.ts,.js}'],
  factories: ['src/database/factories/*{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeds/*{.ts,.js}'],
  subscribers: ['src/database/subscribers/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/database/entities',
    subscribersDir: 'src/database/subscribers',
  },
  synchronize: false,
};
