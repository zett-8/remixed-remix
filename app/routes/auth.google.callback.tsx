import { redirect } from 'react-router'
import type { Route } from './+types/auth.google.callback'
import { getAuthenticator, getAuthSessionHandlers } from '@/services/auth.server'

export async function loader({ request, context }: Route.LoaderArgs) {
  const authenticator = getAuthenticator(request, context)
  const { setSessionUser } = await getAuthSessionHandlers(context, request)

  const user = await authenticator.authenticate('google', request)

  if (!user) {
    return redirect('/login')
  }

  const headers = await setSessionUser(user)

  return redirect('/protected-route', { headers })
}
