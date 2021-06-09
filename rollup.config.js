import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import scss from "rollup-plugin-scss";
import postcss from 'rollup-plugin-postcss'
import { babel } from '@rollup/plugin-babel';

const isDev = process.env.NODE_ENV !== 'production'

const filename = 'modal';
const name = 'Modal';

const config = [];

if (isDev) {  // Dev
  config.push({
    input: 'src/index.dev.ts',
    output: {
      sourcemap: true,
      name,
      format: 'iife',
      file: `dev/${filename}.dev.js`,
      plugins: [
        // terser({
        //   format: {
        //     indent_level: 2,
        //     beautify: true,
        //     comments: false,
        //   },
        //   safari10: true,
        // }),
      ]
    },
    plugins: [
      typescript({
        target: 'es3',
      }),
      resolve({
        browser: true
      }),
      scss({
        watch: 'src/scss/',
        output: `dev/${filename}.dev.css`,
        failOnError: true,
      }),
      // postcss({

      // })
      babel({
        babelHelpers: 'bundled'
      }),
    ]
  });
} else {  // Prod
  config.push({
    input: 'src/index.ts',
    external: ['@xaro/event-emitter', '@xaro/css-class-animations'],
    output: [
      {
        sourcemap: true,
        name,
        format: 'es',
        file: `dist/${filename}.es.js`,
      }
    ],
    plugins: [
      typescript({
        target: 'esnext',
      }),
      terser({
        format: {
          beautify: true,
          comments: true,
        }
      }),
      // scss({
      //   watch: 'src/scss/',
      //   output: `dist/${filename}.css`,
      //   failOnError: true,
      // }),
    ]
  }, {
    input: 'src/index.ts',
    output: [
      {
        sourcemap: true,
        name,
        format: 'iife',
        file: `dist/${filename}.js`,
      }, {
        sourcemap: true,
        name,
        format: 'umd',
        file: `dist/${filename}.umd.js`,
      }
    ],
    plugins: [
      typescript({
        target: 'esnext',
      }),
      terser({
        format: {
          beautify: true,
          comments: true,
        }
      }),
      resolve({
        browser: true,
      }),
      // scss({
      //   watch: 'src/scss/',
      //   output: `dist/${filename}.css`,
      //   failOnError: true,
      // }),
      babel({
        babelHelpers: 'bundled'
      }),
    ]
  }, {
    input: 'src/scss/index.core.scss',
    output: {
      file: `dist/${filename}.core.css`,
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true,
        // modules: true,
      })
    ]
  // }, {
  //   input: 'src/scss/index.default.scss',
  //   output: {
  //     file: `dist/${filename}.default.css`,
  //     format: 'es'
  //   },
  //   plugins: [
  //     postcss({
  //       extract: true,
  //       // modules: true,
  //     })
  //   ]
  });
}

export default config;