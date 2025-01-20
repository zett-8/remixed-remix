import { createRequestHandler } from 'react-router'
import { getLoadContext } from '~/load-context'

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  // eslint-disable-next-line
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE
)

export default {
  fetch(request, env, ctx) {
    const loadContext = getLoadContext({ env, ctx })
    return requestHandler(request, loadContext)
  },
} satisfies ExportedHandler<CloudflareEnvironment>
