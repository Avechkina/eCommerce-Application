/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@routes': path.resolve(__dirname, 'src/routes'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/tests/setup.ts',
    coverage: {
      exclude: [
        'coverage/**',
        'dist/**',
        '**\/[.]**',
        'packages/*\/test?(s)/**',
        '**\/*.d.ts',
        '**\/virtual:*',
        '**\/__x00__*',
        '**\/\x00*',
        'cypress/**',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**\/*{.,-}{test,spec}?(-d).?(c|m)[jt]s?(x)',
        '**\/__tests__/**',
        '**\/{eslint,karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**\/vitest.{workspace,projects}.[jt]s?(on)',
        '**\/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
        'src/utils/**',
        'src/types/**',
        'src/services/**',
      ],
    },
  },
});
