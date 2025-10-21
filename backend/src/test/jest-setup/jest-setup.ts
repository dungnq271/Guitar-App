import { DataSourceOptions } from 'typeorm';
import { RedisOptions } from 'ioredis';

import { testPostgresDBConfig, testRedisConfig } from '../../data-source';
import { setupPostgresContainer } from '../../utils/docker/postgres';
import { setupRedisContainer } from '../../utils/docker/redis';

const postgresConnectionConfig: DataSourceOptions = { ...testPostgresDBConfig };
const redisConnectionConfig: RedisOptions = { ...testRedisConfig };

export default async () => {
  if ('username' in postgresConnectionConfig) {
    await Promise.all([
      setupPostgresContainer(
        postgresConnectionConfig.username,
        postgresConnectionConfig.password as string,
        postgresConnectionConfig.port.toString()
      ),
      setupRedisContainer(redisConnectionConfig.port.toString())
    ]);
  }
};
