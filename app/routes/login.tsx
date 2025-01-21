import { Form } from 'react-router'

export default function Login() {
  return (
    <div>
      <Form method="post" action="/auth/google">
        <button type="submit">Login with Google</button>
      </Form>
    </div>
  )
}
