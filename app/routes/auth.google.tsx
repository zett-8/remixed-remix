import type { Route } from './+types/auth.google'
import { getAuthenticator } from '@/services/auth.server'

export function action({ request, context }: Route.ActionArgs) {
  const authenticator = getAuthenticator(context)
  return authenticator.authenticate('google', request)
}
