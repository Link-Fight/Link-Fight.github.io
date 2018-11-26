import myExample from './rollup-plugin-my-example'
export default {
  input: 'src/main.js',
  plugins: [myExample()],
  output: [
    {
      file: 'dist/bundle-cjs.js',
      banner: '// @authur：kelin',
      format: 'cjs'
    },
    {
      file: 'dist/bundle-iife.js',
      banner: '// @authur：kelin',
      format: 'iife'
    },
    {
      file: 'dist/bundle-umd.js',
      banner: '// @authur：kelin',
      format: 'umd'
    }
  ]
}