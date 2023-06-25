import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";

const config = [
  {
    input: 'build/index.js',
    output: {
      file: 'dist/redis-internal-cache.js',
      format: 'cjs',
      sourcemap: true,
    },
    external: ['dayjs', 'crypto-js/sha256', 'crypto-js/enc-base64'],
    plugins: [typescript()]
  }, {
    input: 'build/types.d.ts',
    output: {
      file: 'dist/redis-internal-cache.d.ts',
      format: 'es'
    },
    plugins: [dts.default()]
  }
];

export default config;
