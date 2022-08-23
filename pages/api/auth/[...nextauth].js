import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export default NextAuth({
  providers: [
    DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        authorization: { params : { scope: 'identify guilds guilds.members.read'} }
    })
  ],
  secret: "QF9F2bAohPQd1oXv4NJykOaMrnGewxkeC5EFRSyWoAc=",
  jwt: process.env.SECRET_KEY,
  callbacks: {
    async jwt({ token, account }) {
        if (account) {
          
          token.accessToken = account.access_token
        }
        return token
      },

      async session({ session, token, user }) {
        session.accessToken = token.accessToken
        session.userId = token.sub
        return session
      }
      }
  }
)




