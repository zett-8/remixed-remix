import { useRouteLoaderData } from 'react-router'
import type { User } from '~/database/schema/user'

export default function ProtectedRoute() {
  const data = useRouteLoaderData<{ user: User }>('routes/auth.layout')
  const user = data?.user

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Protected Route</h1>

      <div>
        <h2>Login User Information</h2>
        <ul>
          <li>ID: {user.userID}</li>
          <li>User: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>createdAt: {user.createdAt}</li>
        </ul>
      </div>
    </div>
  )
}
