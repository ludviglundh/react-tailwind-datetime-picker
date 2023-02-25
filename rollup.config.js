/* eslint-disable @typescript-eslint/no-var-requires */
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const packageJson = require('./package.json')
const options = require('./tsconfig.json')

module.exports = {
  input: packageJson.source,
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      exports: 'auto',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      exports: 'auto',
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  external: ['react', 'dayjs'],
  plugins: [
    typescript({
      ...options.compilerOptions,
      jsx: 'react-jsx',
    }),
    resolve(),
    commonjs(),
  ],
}
