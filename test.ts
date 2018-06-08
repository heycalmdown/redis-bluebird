import * as redis from './';

async function test() {
  const redisClient = redis.createClient();
  await redisClient.getAsync();
  await redisClient.zcardAsync();
}

if (!module.parent) {
  test();
}
