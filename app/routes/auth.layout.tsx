import type { Route } from './+types/auth.layout'
import { authRequired } from '@/services/auth.server'

export const loader = async ({ context, request }: Route.LoaderArgs) => {
  const user = await authRequired(context, request)
  return { user }
}
