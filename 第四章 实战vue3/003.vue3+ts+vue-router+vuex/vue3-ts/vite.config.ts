import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";
import externalGlobals from "rollup-plugin-external-globals";

// console.log(import.meta.env)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ["vue", 'element-plus', 'echarts'],
      plugins: [
        externalGlobals({
          vue: "Vue",
          "element-plus": "ElementPlus",
          "echarts": "echarts",
        }),
      ],
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    // RUNNING_ENV: JSON.stringify(process.env.RUNNING_ENV)
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ]
    }
  }
})
