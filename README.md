# Redis Internal Cache

> :warning: **This package is currently in development**: It is not recommended for production use

---

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Handy declaritive API that wraps redis to create an internal fallback cache.

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `redis-internal-cache` dependency to your project

```bash
yarn add redis-internal-cache # or npm install redis-internal-cache
```

2. If you haven't already, install `redis`.

```bash
yarn add redis # or npm install redis
```

3. Create Redis client and setup Redis Internal Cache

```javascript
// handler.js
import { createClient } from 'redis';
import RedisInternalCache from 'redis-internal-cache'

// Create Redis Client
const redisClient = createClient()
redisClient.on('error', err => console.log('Redis: ', err))

// Setup Redis Internal Cache
const InternalCache = RedisInternalCache(redisClient)
```

If you're not using Redis for any other purpose, then it is good practice to abstract the setup and keep things tidy.

```javascript
// redis-cache-setup.js
import { createClient } from 'redis';
import RedisInternalCache from 'redis-internal-cache'

const redisClient = createClient()
redisClient.on('error', err => console.log('Redis Error', err))

export const InternalCache = RedisInternalCache(redisClient)
```

```javascript
// handler.js
import { InternalCache } from '/path/to/redis-cache-setup.js'

// ...
```

4. Also rememeber to configure your Redis client accordingly. For example setting the URL

```javascript
const redisUrl = process.env.REDIS_URL
const redisClient = createClient({ url: redisUrl })
```

## Usage



## Documentation

For all configuration, further setup and usage information, please do the following

Move to the `docs` directory:

```bash
cd docs
```

Install dependencies and start the project in development mode:

```bash
yarn && yarn dev
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Alex Shortt <hello@alex-shortt.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@ajshortt/nuxt-datocms/latest.svg
[npm-version-href]: https://npmjs.com/package/@ajshortt/nuxt-datocms
[npm-downloads-src]: https://img.shields.io/npm/dt/@ajshortt/nuxt-datocms.svg
[npm-downloads-href]: https://npmjs.com/package/@ajshortt/nuxt-datocms
[license-src]: https://img.shields.io/npm/l/@ajshortt/nuxt-datocms.svg
[license-href]: https://github.com/ajshortt/nuxt-datocms/blob/main/LICENSE
