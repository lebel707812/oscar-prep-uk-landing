import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    splitVendorChunkPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configuração de testes
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
      ],
    },
  },
  build: {
    // Otimizações de performance
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor libraries em chunks específicos
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          'icons-vendor': ['lucide-react'],
          'motion-vendor': ['framer-motion'],
          'supabase-vendor': ['@supabase/supabase-js'],
        },
      },
    },
    // Aumentar limite de chunk size warning
    chunkSizeWarningLimit: 1000,
    // Otimizar assets
    assetsInlineLimit: 4096,
  },
  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      'framer-motion',
      '@supabase/supabase-js'
    ],
  },
});

