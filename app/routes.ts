import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/auth/google', 'routes/auth.google.tsx'),
  route('/auth/google/callback', 'routes/auth.google.callback.tsx'),
  route('/login', 'routes/login.tsx'),
  route('/logout', 'routes/logout.tsx'),

  layout('routes/auth.layout.tsx', [route('/protected-route', 'routes/protected-route.tsx')]),
] satisfies RouteConfig
