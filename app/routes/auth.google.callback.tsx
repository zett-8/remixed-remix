import { redirect } from 'react-router'
import type { Route } from './+types/auth.google.callback'
import { getAuthenticator } from '@/services/auth.server'

export function loader({ request, context }: Route.LoaderArgs) {
  const authenticator = getAuthenticator(context)

  const user = authenticator.authenticate('google', request)

  console.log('callback loader user ', user)

  if (!user) {
    return redirect('/login')
  }

  return redirect('/protected-route')
}
