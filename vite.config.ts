import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type PluginOption } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { getLoadContext } from './load-context'

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: './workers/app.ts',
        }
      : undefined,
  },
  ssr: {
    target: 'webworker',
    noExternal: true,
    resolve: {
      conditions: ['workerd', 'browser'],
    },
    optimizeDeps: {
      include: [
        'react',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-dom',
        'react-dom/server',
        'react-router',
        'remix-auth-oauth2',
      ],
    },
  },
  plugins: [
    tailwindcss(),
    cloudflareDevProxy({
      getLoadContext({ context }) {
        // @ts-expect-error - context types are unaware of the proxied values
        return getLoadContext(context.cloudflare)
      },
    }),
    reactRouter(),
    tsconfigPaths(),
  ] as PluginOption[],
}))
