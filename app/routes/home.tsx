import type { Route } from './+types/home'
import { data } from 'react-router'

export function meta(_: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export const loader = async (_: Route.LoaderArgs) => {
  return data({})
}

export default function Home(_: Route.ComponentProps) {
  return (
    <main className="flex h-dvh items-center justify-center">
      <div className="grid gap-6 text-center">
        <h1 className="text-6xl font-black">HELLO WORLD</h1>
      </div>
    </main>
  )
}
