import { verifyPassword } from '@lib/auth'
import dbConnect from '@lib/mongo/dbConfig'
import User from '@models/usersModel'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth = {
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await dbConnect()
        const user = await User.findOne({ email: credentials.email })
        if (!user) {
          throw new Error('No user found')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )
        if (!isValid) {
          throw new Error('could not log you in')
        }

        return { email: user.email }
      },
    }),
  ],
}
