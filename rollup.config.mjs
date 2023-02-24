import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

import packagejson from './package.json' assert { type: 'json' }
import tsconfig from './tsconfig.json' assert { type: 'json' }

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: packagejson.module,
        format: 'esm',
        exports: 'auto',
        sourcemap: true,
      },
      {
        file: packagejson.main,
        format: 'cjs',
        exports: 'auto',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        ...tsconfig.compilerOptions,
        jsx: 'react',
      }),
    ],
  },
]
