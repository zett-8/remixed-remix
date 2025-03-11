import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type PluginOption } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import adapter from '@hono/vite-dev-server/cloudflare'
import serverAdapter from 'hono-react-router-adapter/vite'
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
      include: ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'react-dom', 'react-dom/server', 'react-router'],
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
    serverAdapter({ adapter, getLoadContext, entry: './app/server/index.ts' }), 
    tsconfigPaths(),
  ] as PluginOption[],
}))
