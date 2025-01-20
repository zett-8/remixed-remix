import { authRequired } from '../services/auth.server'
import type { Route } from './+types/protected-route'

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const user = await authRequired(context, request)
  return { user }
}

export default function ProtectedRoute() {
  return <div>ProtectedRoute</div>
}
