![Convertio Image](https://github.com/zett-8/remixed-remix/assets/33055097/096c0cfc-e680-4c48-9d79-a2aa53e77ebb)

# 💿 Remixed Remix

Remixed Remix is your web app's stellar launchpad improved from the original Remix [template](https://github.com/remix-run/react-router-templates/tree/main/cloudflare-d1).  
A production-ready template designed for seamless deployment on Cloudflare Pages.  
📖 See the [Remix docs](https://remix.run/docs) and the [React Router docs](https://reactrouter.com/) for details on supported features.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Setups

- Cloudflare Pages (D1)
- User Authentication (remix-auth + remix-auth-google)
- Tailwind
- Drizzle
- Zod
- ESLint with flat config
- Vite
- Typescript

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Generate types:

```bash
pnpm run typegen
```

Run an initial database migration:

```bash
pnpm run db:migrate
```

Start the development server with HMR:

```bash
pnpm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
pnpm run build
```

## Deployment

Deployment is done using the Wrangler CLI.

To deploy directly to production:

```sh
npx wrangler deploy
```

To deploy a preview URL:

```sh
npx wrangler versions upload
```

You can then promote a version to production after verification or roll it out progressively.

```sh
npx wrangler versions deploy
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
