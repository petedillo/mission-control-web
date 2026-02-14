import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || 'http://localhost:3000';
  const cfClientId = env.VITE_CF_CLIENT_ID;
  const cfClientSecret = env.VITE_CF_CLIENT_SECRET;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3001,
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: true,
          headers: {
            ...(cfClientId && cfClientSecret
              ? {
                  'CF-Access-Client-Id': cfClientId,
                  'CF-Access-Client-Secret': cfClientSecret,
                }
              : {}),
          },
        },
        '/health': {
          target: apiUrl,
          changeOrigin: true,
          secure: true,
          headers: {
            ...(cfClientId && cfClientSecret
              ? {
                  'CF-Access-Client-Id': cfClientId,
                  'CF-Access-Client-Secret': cfClientSecret,
                }
              : {}),
          },
        },
        '/metrics': {
          target: apiUrl,
          changeOrigin: true,
          secure: true,
          headers: {
            ...(cfClientId && cfClientSecret
              ? {
                  'CF-Access-Client-Id': cfClientId,
                  'CF-Access-Client-Secret': cfClientSecret,
                }
              : {}),
          },
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});
