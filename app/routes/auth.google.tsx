import type { Route } from './+types/auth.google'
import { getAuthenticator } from '@/services/auth.server'

export async function action({ request, context }: Route.ActionArgs) {
  const authenticator = getAuthenticator(context)
  return await authenticator.authenticate('google', request)
}
