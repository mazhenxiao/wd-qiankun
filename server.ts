import dayjs from 'dayjs';
const server = (env: Record<string, string>) => {
  return {
    port: 3000,
    host: true,
    open: true,
    proxy: {
      '/xxgk-api': {
        target: env.VITE_API_URL, // QA IP
        changeOrigin: true,
        //  rewrite: (p) => p.replace(/^\/dev-api/, ""),
        rewrite(apiPath: string) {
          const actualPath = apiPath.replace(/^\/xxgk-api/, '');
          console.log(
            `${dayjs().format('hh:mm:ss')} ${apiPath} 请求代理 > ${
              env.VITE_API_URL + actualPath
            }\x1B[0m`
          );
          return actualPath;
        },
      },

      // TODO:权限接入第三方NB服务
      '^/api/account': {
        target: env.VITE_API_URL_QX_SERVER, // QA IP
        changeOrigin: true,
        //  rewrite: (p) => p.replace(/^\/dev-api/, ""),
        rewrite(apiPath: string) {
          //const actualPath = apiPath.replace(/^\/api/, '');
          const actualPath = env.VITE_API_URL_QX_SERVER + apiPath;
          console.log(
            `${dayjs().format(
              'hh:mm:ss'
            )} ${apiPath} 权限系统请求代理 > ${actualPath}\x1B[0m`
          );
          return actualPath;
        },
      },
      '^/api': {
        target: env.VITE_API_URL, // QA IP
        changeOrigin: true,
        //  rewrite: (p) => p.replace(/^\/dev-api/, ""),
        rewrite(apiPath: string) {
          const actualPath = apiPath.replace(/^\/api/, '');
          console.log(
            `${dayjs().format('hh:mm:ss')} ${apiPath} 请求代理 > ${
              env.VITE_API_URL + actualPath
            }\x1B[0m`
          );
          return actualPath;
        },
      },
      // 测试
      '^/test-api': {
        target: 'http://172.20.218.35:8081', // QA IP
        changeOrigin: true,
        //  rewrite: (p) => p.replace(/^\/dev-api/, ""),
        rewrite(apiPath: string) {
          const actualPath = apiPath.replace(/^\/test-api/, '');
          console.log(
            `${dayjs().format(
              'hh:mm:ss'
            )} ${apiPath} 请求代理 > http://172.20.218.35:8081${actualPath}\x1B[0m`
          );
          return actualPath;
        },
      },
    },
  };
};
export default server;
