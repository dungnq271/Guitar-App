import { removePostgresContainer } from '../../utils/docker/postgres';
import { removeRedisContainer } from '../../utils/docker/redis';

export default async () => {
  await Promise.all([removePostgresContainer(), removeRedisContainer()]);
};
