import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '../prisma'

export const auth = betterAuth({
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
      mapProfileToUser: (profile: any) => {
        return {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      }
    }, 
  },
  emailAndPassword: { 
    enabled: true, 
  }, 
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
})