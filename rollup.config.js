import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/OverlayNavbar.js',
  output: [
    {
      file: 'dist/OverlayNavbar.js',
      format: 'cjs',
      exports: 'default',
    },
    {
      file: 'dist/OverlayNavbar.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      babelHelpers: 'bundled',  // Make sure Babel helpers are bundled
    }),
    commonjs(),
    terser(),
  ],
  external: ['react', 'react-dom'],
};
