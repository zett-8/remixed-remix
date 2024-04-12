import { Authenticator } from 'remix-auth'
import { GoogleStrategy } from 'remix-auth-google'
import { type AppLoadContext, json } from '@remix-run/cloudflare'
import { eq } from 'drizzle-orm/sql/expressions/conditions'
import { users, type User } from '~/db/schema/user'

export const getAuthenticator = (context: AppLoadContext): Authenticator => {
  const SESSION_SECRET = context.env.SESSION_SECRET
  const GOOGLE_CLIENT_ID = context.env.GOOGLE_CLIENT_ID
  const GOOGLE_CLIENT_SECRET = context.env.GOOGLE_CLIENT_SECRET
  const CLIENT_URL = context.env.CLIENT_URL

  if (!(SESSION_SECRET && GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && CLIENT_URL)) {
    throw new Error('SESSION_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CLIENT_URL are not defined')
  }

  const googleStrategy = new GoogleStrategy<User>(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${CLIENT_URL}/api/auth/google/callback`,
    },
    async ({ profile }) => {
      const [user] = await context.db.select().from(users).where(eq(users.userID, profile.emails[0].value)).limit(1)

      if (user) {
        return user
      }

      const [newUser] = await context.db
        .insert(users)
        .values({
          userID: profile.id,
          email: profile.emails[0].value || '',
          password: '',
          name: profile.displayName,
          image: profile.photos[0].value || '',
          provider: 'google',
        })
        .returning()

      if (!newUser) {
        throw new Error('Failed to create a new user')
      }

      return newUser
    }
  )

  const authenticator = new Authenticator<User>(context.sessionStorage)
  authenticator.use(googleStrategy)

  return authenticator
}

export const apiProtection = async (context: AppLoadContext, request: Request) => {
  const authenticator = getAuthenticator(context)
  const isAuthenticated = await authenticator.isAuthenticated(request)
  if (!isAuthenticated) throw json(null, { status: 401 })
}
