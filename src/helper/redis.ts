import { createClient } from 'redis';

class Redis {
  client: any
  constructor () {
    this.client = createClient({
      url: process.env.REDIS_URL
    })
    this.client.connect().then()
  }

  async set (key: any, object: any, TTL = 21600) {
    await this.client.set(key, object, {
      EX: TTL
    })
  }

  async get (key: any) {
    return await this.client.get(key)
  }
}

export default Redis;