![Convertio Image](https://github.com/zett-8/remixed-remix/assets/33055097/096c0cfc-e680-4c48-9d79-a2aa53e77ebb)

# 💿 Remixed Remix

Remixed Remix is your web project's stellar launchpad. A production-ready template designed for seamless deployment on Cloudflare Pages.

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Setups

- Cloudflare Pages (D1, KV)
- User Authentication (remix-auth + remix-auth-google)
- Tailwind
- Drizzle
- Zod
- ESLint with flat config
- Vite
- Typescript

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Development

Run the Vite dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Deployment

> [!WARNING]  
> Cloudflare does _not_ use `wrangler.toml` to configure deployment bindings.
> You **MUST** [configure deployment bindings manually in the Cloudflare dashboard][bindings].

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

[bindings]: https://developers.cloudflare.com/pages/functions/bindings/
