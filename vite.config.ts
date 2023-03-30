import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve,join } from 'path'
import { writeFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  base: `${process.env.NODE_ENV === 'production' ? 'https://quick.ainiteam.com' : ''}/app-demo`,
  plugins: [
    vue(),
    (function () {
      let basePath = ''
      return {
        name: "vite:micro-app",
        apply: 'build',
        configResolved(config) {
          basePath = `${config.base}${config.build.assetsDir}/`
        },
        writeBundle (options, bundle) {
          for (const chunkName in bundle) {
            if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
              const chunk = bundle[chunkName]
              if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
                  return all.replace($3, new URL($3, basePath))
                })
                const fullPath = join(options.dir, chunk.fileName)
                writeFileSync(fullPath, chunk.code)
              }
            }
          }
        },
      }
    })() as any,],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    ],
  },
  server:{
    port:3101
  },
})
