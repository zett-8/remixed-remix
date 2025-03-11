import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/sample', 'routes/sample.tsx'),
  // Auth required routes (verified on Hono server)
  route('/dashboard', 'routes/dashboard.tsx'),
] satisfies RouteConfig
