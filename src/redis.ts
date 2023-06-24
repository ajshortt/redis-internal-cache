import { RedisClientType, createClient } from 'redis';

// Todo - Fix this typing
export type RedisClient = RedisClientType<any, any, any>

export const initRedisClient = (url: string | null = null): RedisClient => {
  const client = url ? createClient({ url }) : createClient()
  client.on('error', err => console.log('Redis Client Error', err))
  return client
}
