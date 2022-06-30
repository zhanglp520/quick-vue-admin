import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  console.log(command)
  console.log(mode)
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const { VITE_APP_TITLE, VITE_PORT, VITE_APP_BASE_URL } = env
  return {
    plugins: [
      vue(),
      DefineOptions(),
      createHtmlPlugin({
        inject: {
          data: {
            title: VITE_APP_TITLE,
          },
        },
      }),
    ],
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/globalVariable.scss";',
        },
      },
    },
    server: {
      https: false, // 运行服务是否以https方式
      host: true,
      port: VITE_PORT,
      proxy: {
        [VITE_APP_BASE_URL]: {
          target: 'http://localhost:3002/', // 代理的目标地址
          changeOrigin: false, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
          secure: false, // 是否https接口
          ws: false, // 是否代理websockets
          rewrite: (path) => path.replace(/^\/basic-api/, ''), // 路径重写
        },
      },
    },
  }
}
