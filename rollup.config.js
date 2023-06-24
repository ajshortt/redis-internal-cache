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
    external: ['redis', 'dayjs'],
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
