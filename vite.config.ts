import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify('AIzaSyD5fmPwM3tCeO6hHHViR-5Rz5_qGVyHe8o'),
        'process.env.API_KEY': JSON.stringify('AIzaSyD5fmPwM3tCeO6hHHViR-5Rz5_qGVyHe8o')
      },
      resolve: {
        alias: {
          '@': '.',
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              charts: ['recharts']
            }
          }
        }
      },
      server: {
        port: 3000,
        host: true
      }
    };
});
