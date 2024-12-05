import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "@/server/db";
// import z from "zod";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

// const credentialsSchema = z.object({
//   email: z.string().email(),
//   password: z.string(),
// });

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  pages: {
    signIn: "/auth/signin",
    newUser: "/",
    error: "/auth/signin"

    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   credentials: { email: {}, password: {} },
    //   async authorize({ email, password }) {
    //     const parsedCredentials = credentialsSchema.safeParse({
    //       email,
    //       password,
    //     });
    //     if (!parsedCredentials.success) return null;
    //     const { email: parsedEmail, password: parsedPassword } =
    //       parsedCredentials.data;

    //     const user = await getUserByEmail(parsedEmail);

    //     if (!user) return null; // no user
    //     if (!user.password) return null; // signed in with other provider

    //     const passwordsMatch = await compare(parsedPassword, user.password);
    //     if (!passwordsMatch) return null;

    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const { password: destructuredPassword, ...safeUser } = user;
    //     return safeUser;
    //   },
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     * @see https://next-auth.js.org/providers/google
     */
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    // Used for CredentialsProvider
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id;
    //   }

    //   return token;
    // },

    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        // token.id used for CredentialsProvider
        // id: token.id as string || user.id
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
