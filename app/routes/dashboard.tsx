import { getContext } from 'hono/context-storage'
import { data, useLoaderData } from 'react-router'
import type { Route } from './+types/dashboard'

export async function loader(_: Route.LoaderArgs) {
  const userId = getContext<HonoENV>().var.userId
  return data({ userId })
}

export default function ProtectedRoute() {
  const { userId } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1 className="my-4 text-2xl font-bold">Protected Route</h1>

      <div>
        <h2>Login User Information</h2>
        <ul>
          <li>ID: {userId}</li>
        </ul>
      </div>
    </div>
  )
}
