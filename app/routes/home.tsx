// import { database } from '~/database/context'
// import * as schema from '~/database/schema'

import type { Route } from './+types/home'
// import { Welcome } from '@/welcome/welcome'

export function meta(_: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export async function action(_: Route.ActionArgs) {
  // const formData = await request.formData()
  // let name = formData.get('name')
  // let email = formData.get('email')
  // if (typeof name !== 'string' || typeof email !== 'string') {
  //   return { guestBookError: 'Name and email are required' }
  // }
  // name = name.trim()
  // email = email.trim()
  // if (!name || !email) {
  //   return { guestBookError: 'Name and email are required' }
  // }
  // const db = database()
  // try {
  //   await db.insert(schema.guestBook).values({ name, email })
  // } catch (error) {
  //   console.error(error)
  //   return { guestBookError: 'Error adding to guest book' }
  // }
}

export async function loader(_: Route.LoaderArgs) {
  // const db = database()

  // const guestBook = await db.query.users.findMany({
  //   columns: {
  //     id: true,
  //     name: true,
  //   },
  // })

  // return {
  //   guestBook,
  //   message: context.env.VALUE_FROM_CLOUDFLARE,
  // }
  return {}
}

export default function Home(_: Route.ComponentProps) {
  return (
    // <Welcome
    //   guestBook={loaderData.guestBook}
    //   guestBookError={actionData?.guestBookError}
    //   message={loaderData.message}
    // />
    <div>Hello World</div>
  )
}
