import { Form } from 'react-router'
import type { Route } from './+types/logout'
import { logout } from '@/services/auth.server'

export async function action({ context, request }: Route.ActionArgs) {
  return await logout(context, request)
}

export default function Logout() {
  return (
    <div>
      <Form method="post" action="/logout">
        <button type="submit">Logout</button>
      </Form>
    </div>
  )
}
