// app/api/auth/[...nextauth]/route.ts (or /pages/api/auth/[...nextauth].ts for old Next.js)
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user }) {
      // ✅ Optional: You could POST to your backend here too
      return true
    },
    async session({ session, token }) {
      // Attach Google ID (sub) to session
      session.user.id = token.sub
      return session
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user.id
      }
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
