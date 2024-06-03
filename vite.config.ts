import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';

import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import { createHtmlPlugin } from 'vite-plugin-html';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');
const pagesDir = resolve(srcDir, 'pages');

import server from './server';

export default defineConfig(config => {
  const env = loadEnv(config.mode, process.cwd());
  console.log('环境变量 >', env);

  return {
    base: '/',
    resolve: {
      alias: {
        '@': srcDir,
        '@pages': pagesDir,
      },
      extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    optimizeDeps: {
      force: true, // 强制进行依赖预构建
    },

    plugins: [
      react(),

      chunkSplitPlugin({
        strategy: 'single-vendor',
        customSplitting: {
          'react-vendor': [/react/, /redux/, /react-router/, /ahooks/, /axios/],
          'loadable-vendor': [/lodash/, /big\.js/, /dayjs/],
          'wanda-vendor': [/@wd/],
        },
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.tsx',
        template: 'index.html',
        inject: {
          data: {
            js: [],
            css: [],
          },
        },
      }),
    ],
    build: {
      outDir: 'dist-mis-web',
      sourcemap: false,
      reportCompressedSize: false,
      minify: 'terser',
      chunkSizeWarningLimit: 1500,
      assetsInlineLimit: 4096, // 图片转 base64 编码的阈值
      terserOptions: {
        // 去掉console和debugger
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        //external: ['react', 'react-dom'],
        //external: ['@wd/permission'],
        // vite打包是通过rollup来打包的
        output: {
          // manualChunks: (id) => {
          //   // 可以在这里打印看一下id的值，这里做个简单处理将node_modules中的包打包为vendor文件
          //   console.log(id);

          //   if (id.includes('node_modules')) {

          //     if (id.includes('@ant-design')) {
          //       return 'vendor-antd';
          //     }
          //     if (id.includes('lodash') || id.includes('axios')) {
          //       return 'vendor-tools';
          //     }
          //     if (id.includes('@wd/permission')) {
          //       return 'wd-permission';
          //     }

          //     return 'vendor';

          //   }
          // },
          globals: {},
          entryFileNames: 'static/js/[name].[hash].js',
          chunkFileNames: 'static/js/[name].[hash].js',
          assetFileNames: 'static/[ext]/[name].[hash].[ext]',
        },
      },
    },
    // antD4.+
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       javascriptEnabled: true,
    //       modifyVars: {
    //         '@primary-color': '#1e80ff',	// 设置 antd 主题色
    //       },
    //     },
    //   }
    // },
    // 本地开发和代理配置
    server: server(env),
  };
});
